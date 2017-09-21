<?php
namespace App\Controller\Api;
use App\Controller\Api\AppController;
use Cake\ORM\TableRegistry;
use Cake\I18n\Time;
use Cake\Network\Exception\NotAcceptableException;
use Cake\Network\Exception\BadRequestException;
use Cake\Datasource\ConnectionManager;

use Cake\Filesystem\Folder;
use Cake\Filesystem\File;

class SellersController extends AppController
{

  public $paginate = [
      'page' => 1,
      'limit' => 500,
      'maxLimit' => 500
  ];


    public function getSellerPriceTrend($product_id){

        $queryData = $this->request->query;
#        $user = $this->Auth->identify();
        $days_ago = new Time('-7 days');
        $days_ago = $days_ago->format('Y-m-d H:i:s');

        if (!is_numeric($product_id)) {
            throw new BadRequestException('Invalid product ID!');
        }

        if (!$this->request->is(['get'])) {
            throw new BadRequestException('Bad request method!');
        }

        $data = [];
        $productSellerTable = TableRegistry::get('ProductSellerData');

        if(isset($queryData['string_ids']) && $queryData['string_ids'] == true) {
            $pselquery = $productSellerTable->find()->select(['group_id', 'price', 'updated_on'])->where(['ProductSellerData.group_id IN' => $queryData['pids'], 'ProductSellerData.seller_marketplace_id IN' => $queryData['sids'], 'ProductSellerData.updated_on >' => $days_ago])->order(['ProductSellerData.updated_on'=>'ASC'])->groupBy('group_id');
        } else {
            $pselquery = $productSellerTable->find()->select(['seller_id', 'price', 'updated_on'])->where(['ProductSellerData.group_id' => $product_id, 'ProductSellerData.seller_id IN' => $queryData['sids'], 'ProductSellerData.updated_on >' => $days_ago])->order(['ProductSellerData.updated_on'=>'ASC'])->groupBy('seller_id');
        }

        foreach($pselquery->toArray() as $seller_id => $prices) {
            $seller = [];
            $seller['seller_id'] = $seller_id;
            $seller['product_id'] = $seller_id;
            $seller['price_trend'] = [];
            $seller['updated_on'] = [];
            $seller['price_trend'][] = ['Price', 'price'];
            foreach($prices as $price) {
                $seller['price_trend'][] = [date('d M h:i a',strtotime($price['updated_on'])), $price['price']];
                $seller['updated_on'][] = $price['updated_on'];
            }
            $data[$seller_id] = $seller;
        }

        $this->set('success', true);
        $this->set('result_count', count($data));
        $this->set('results_per_page', 1);
        $this->set('page', 1);
        $this->set('data', $data);
        $this->set('query_data', $queryData);
        $this->set('_serialize', ['success','result_count','results_per_page','page','data','query_data']);

    }

    public function getSellerData($product_id){

        $queryData = $this->request->query;
        $user = $this->Auth->identify();

        if (!$this->request->is(['get'])) {
            throw new BadRequestException('Bad request method!');
        }

        if (!is_numeric($product_id)) {
            throw new BadRequestException('Invalid product ID!');
        }

        $productSellerTable = TableRegistry::get('ProductSellerData');
        $productsTable = TableRegistry::get('Products');

        //$pselquery = $productSellerTable->find()->where(['ProductSellerData.group_id' => $product_id])->order(['ProductSellerData.updated_on'=>'DESC']);
        $pselquery = $productSellerTable->find()->contain(['ProductsToBeTracked'])->where(['ProductSellerData.group_id' => $product_id, 'ProductsToBeTracked.active' => true])->order(['ProductSellerData.updated_on'=>'DESC']);

        $product_seller_ids = $this->filterProductSellerIds($pselquery->toArray(),$queryData);

        $query = $productSellerTable->find()->where([
          'ProductSellerData.id IN' => $product_seller_ids
        ])->contain(['ProductsToBeTracked','Sellers','Marketplaces','Products'])
        ->order("FIND_IN_SET(ProductSellerData.id, '".implode(',', $product_seller_ids)."')");

        $filtered_seller_data = $this->paginate($query)->toArray();
        $prices = $this->array_pluck($filtered_seller_data,'price');
        $market_min = min($prices);
        $data = array();



        foreach($filtered_seller_data as $seller_data){

          $oldest_data = $productSellerTable->find()->where(['product_id'=>$seller_data->product_id,'seller_id'=>$seller_data->seller_id])->order(['id'=>'asc'])->first();

          $seller_url = preg_replace("(^https?//)", "https://", $seller_data->seller->seller_url );

            $is_current_seller = ($seller_data->product->seller_id == $seller_data->seller_marketplace_id) ? true : false;
            if($is_current_seller) {
                $my_price = $seller_data->price;
            }

            $stockouts_count = $this->Sellers->getStockoutCount($seller_data->seller->id,$seller_data->product_id);

            $bb_ownership_count = $this->Sellers->getCounts($seller_data->seller->id,$seller_data->product_id,'buy_box');
            $own_buy_box = $this->Sellers->getCounts($seller_data->seller->id,$seller_data->product_id,'own_buy_box');
            $lost_buy_box = $this->Sellers->getCounts($seller_data->seller->id,$seller_data->product_id,'lost_buy_box');
            $own_lowest_price = $this->Sellers->getCounts($seller_data->seller->id,$seller_data->product_id,'own_lowest_price');
            $lost_lowest_price = $this->Sellers->getCounts($seller_data->seller->id,$seller_data->product_id,'lost_lowest_price');

            $sel_data = array(
            "is_current_seller" => $is_current_seller,
            "seller" => $this->Sellers->sellerMarketPlaceData($seller_data->seller->seller_id,$seller_data->seller->seller_name),
            // "seller" => $seller_data->seller->seller_name,
            "seller_id" => $seller_data->seller->id,
            "rating" => $seller_data->seller->rating,
            "rating_count" => $seller_data->seller->rating_count,
            "listing_id" => $seller_data->products_to_be_tracked->listing_id,
            "product_title"=>$seller_data->products_to_be_tracked->product_title,
            "listing_url"=>$seller_data->products_to_be_tracked->listing_url,
            "product_image"=>$seller_data->products_to_be_tracked->product_image,
            "tracked_since" => Time::parse($oldest_data->updated_on)->nice(),
            "stockouts_count" => $stockouts_count,
            "is_stocked_out" => ($seller_data->in_stock) ? false : true,
            "buy_box_ownership" => $bb_ownership_count,

            "won_buy_box" => $own_buy_box,
            "lost_buy_box" => $lost_buy_box,
            "won_lowest_price" => $own_lowest_price,
            "lost_lowest_price" => $lost_lowest_price,

            "status" => ($seller_data->active) ? 1 : 0,
            "marketplace_id" => $seller_data->marketplace_id,
            "marketplace_title" => $seller_data->marketplace->title,
            "seller_url" => $seller_url,
            "price" => $seller_data->price,
            "lowest" => ($seller_data->price <= $market_min) ? 'yes' : 'no',
            "buy_box" => ($seller_data->buy_box) ? 'yes' : 'no',
            "condition" => $seller_data->product_condition,
            "violated" => (($seller_data->price < $seller_data->product->mop) || ($seller_data->price > $seller_data->product->mrp)) ? true : false,
            "updated_on" => date('d-m-Y',strtotime($seller_data->updated_on)),
            'price_diff' => ''
            );

            if($sel_data['is_stocked_out']){
              $sel_data['lowest'] = false;
              $sel_data['price'] = null;
            }

            if($sel_data['violated']){
              $sel_data['violation_type'] = ($seller_data->price < $seller_data->product->mop) ? 'MOP Violation' : 'MRP Violation';
            }

          $data[] = $sel_data;

        }


        for($i = 0; $i < count($data); $i++) {
            //$data[$i]['price_diff'] = $prices[$i] - $my_price;
            $data[$i]['price_diff'] = (!isset($my_price)) ? 'N/A' : $prices[$i] - $my_price;
            if($data[$i]['is_stocked_out']){
              $data[$i]['price_diff'] = 'N/A';
            }
        }
        $paginationData = $this->request->params['paging']['ProductSellerData'];

        $this->set('success', true);
        $this->set('result_count', $paginationData['count']);
        $this->set('results_per_page', $paginationData['perPage']);
        $this->set('page', $paginationData['page']);
        $this->set('data', $data);
        $this->set('query_data', $queryData);
        $this->set('_serialize', ['success','result_count','results_per_page','page','data','query_data']);
    }


    public function getSellerRank($product_id){

        $queryData = $this->request->query;

        if (!$this->request->is(['get'])) {
            throw new BadRequestException('Bad request method!');
        }

        if (!is_numeric($product_id)) {
            throw new BadRequestException('Invalid product ID!');
        }

        $productSellerTable = TableRegistry::get('ProductSellerData');
        $productsTable = TableRegistry::get('Products');

        //$pselquery = $productSellerTable->find()->where(['ProductSellerData.group_id' => $product_id])->order(['ProductSellerData.updated_on'=>'DESC']);
        $pselquery = $productSellerTable->find()->contain(['ProductsToBeTracked'])->where(['ProductSellerData.group_id' => $product_id, 'ProductsToBeTracked.active' => true])->order(['ProductSellerData.updated_on'=>'DESC']);
        $product_seller_ids = $this->filterProductSellerIds($pselquery->toArray(),$queryData);

        $query = $productSellerTable->find()->select([
            'ProductSellerData.price', 'Products.seller_id', 'ProductSellerData.seller_marketplace_id'])->where([
            'ProductSellerData.id IN' => $product_seller_ids
        ])->contain(['ProductsToBeTracked','Sellers','Marketplaces','Products'])
            ->order("ProductSellerData.price");

        $seller_rank = 0;
        $filtered_seller_data = $this->paginate($query)->toArray();
        $prices = [];
        for($i = 0 ; $i < count($filtered_seller_data); $i ++) {
            $price = (string)$filtered_seller_data[$i]['price'];
            if(!array_key_exists($price,$prices)) {
                $prices[$price] = $i + 1;
            }

            if($filtered_seller_data[$i]->product->seller_id == $filtered_seller_data[$i]->seller_marketplace_id)
            {
                $seller_rank = $prices[$price];
                $i = count($filtered_seller_data);
            }
        }
        $this->set('success', true);
        $this->set('data', ['seller_rank' => $seller_rank]);
        $this->set('query_data', $queryData);
        $this->set('_serialize', ['success','result_count','results_per_page','page','data','query_data']);
    }

    public function comparePriceAsc($a, $b){
      if ($a->price == $b->price) {
          return 0;
      }
      return ($a->price < $b->price) ? -1 : 1;
    }

    public function comparePriceDesc($a, $b){
      if ($a->price == $b->price) {
          return 0;
      }
      return ($a->price > $b->price) ? -1 : 1;
    }


    public function array_pluck($array, $key) {
      return array_map(function($v) use ($key)	{
        return is_object($v) ? $v->$key : $v[$key];
      }, $array);
    }



    public function filterProductSellerIds($seller_data,$queryData){
        $sellers = array();
        $product_ids = array();
        $filtered_seller_data = array();
        foreach($seller_data as $key=>$sel_data){
            if(!array_key_exists($sel_data->product_id, $sellers)){
                $sellers[$sel_data->product_id] = array();
            }

            if(!array_key_exists($sel_data->seller_id, $sellers[$sel_data->product_id])){
                $sellers[$sel_data->product_id][$sel_data->seller_id] = $seller_data;
                $product_ids[] = $sel_data->id;
                $filtered_seller_data[] = $seller_data[$key];
            }
        }

        //Sorting
        if(isset($queryData['sort'])){
          if($queryData['sort'] == 'price'){
            if(isset($queryData['direction'])){
              if($queryData['direction'] == 'desc'){
                usort($filtered_seller_data, array($this, 'comparePriceDesc'));
              }else{
                usort($filtered_seller_data, array($this, 'comparePriceAsc'));
              }
            }else{
              usort($filtered_seller_data, array($this, 'comparePriceAsc'));
            }
          }else if($queryData['sort'] == 'buy_box'){
            usort($filtered_seller_data, function($a, $b)
            {
                return strcmp($b->buy_box, $a->buy_box);
            });
          }
        }else{
          usort($filtered_seller_data, function($a, $b)
          {
              return strcmp($b->buy_box, $a->buy_box);
          });
        }


        return $this->array_pluck($filtered_seller_data, 'id');
    }

    public function getSellerIds(){

        if (!$this->request->is('post')) {
          throw new BadRequestException('Bad request method!');
        }

        $postData = $this->request->data;
        if(empty($postData)){
          throw new NotAcceptableException('No preference data recieved!');
        }

        $marketplaceId = (isset($postData['marketplace_id'])) ? $postData['marketplace_id']:0;

        $user = $this->Auth->identify();

 
        $marketplaceSellerIds = unserialize($user['seller_id']);
        $sellersData = [];
        
        if(isset($marketplaceSellerIds[$marketplaceId])){
            $status = true;
            $message = 'Seller ids successfully sent';
            $sellerIds = $marketplaceSellerIds[$marketplaceId];

     
            $sellersData = $this->Sellers->find()->select(['seller_id','seller_name','channel_id','rating','rating_count'])->where(['seller_id IN' =>$sellerIds])->toArray();

            $savedSellerIds = [];
            foreach ($sellersData as $seller) {
               $savedSellerIds[] = $seller->seller_id;  
            }

            foreach ($sellerIds as $sellerId) {
               if(!in_array($sellerId, $savedSellerIds)){
                    $sellersData[] = ['seller_id'=>$sellerId,'seller_name'=>'Unknown','channel_id'=>'Unknown','rating'=>'Unknown','rating_count'=>'Unknown'];
                }
            }

    
        }else{
            $status = false;
            $message = 'No seller ids found for marketplace';
        }

        $this->set('status', $status);
        $this->set('message', $message);
        $this->set('sellers_data', $sellersData);
        $this->set('_serialize', ['status','message','sellers_data']);

    }

    /***
    Associate seller ids to users
    **/
    public function addSellerId(){
       if (!$this->request->is('post')) {
          throw new BadRequestException('Bad request method!');
        }

        $postData = $this->request->data;
        if(empty($postData)){
          throw new NotAcceptableException('No preference data recieved!');
        }

        $user = $this->Auth->identify();

        $marketplaceId = (isset($postData['marketplace_id'])) ? $postData['marketplace_id']:0;
        $sellerId = (isset($postData['seller_id'])) ? $postData['seller_id']:0;

        $marketplaceSellerIds = unserialize($user['seller_id']);
        $sellerIds = (isset($marketplaceSellerIds[$marketplaceId])) ? $marketplaceSellerIds[$marketplaceId] :[];

        if($sellerId == ""){
            $status = false;
            $message = "Seller id is empty";

        }elseif(!in_array($sellerId, $sellerIds)){
            $sellerIds[] = $sellerId;
            $marketplaceSellerIds[$marketplaceId] = $sellerIds;

            $marketplaceSellerIds = serialize($marketplaceSellerIds);

            $usersTable = TableRegistry::get('Users');
            $query = $usersTable->query();
            $query->update()->set(['seller_id'=> $marketplaceSellerIds])
                        ->where(['id' => $user['id']])
                        ->execute();

            $status = true;
            $message = "Seller id successfully added to user marketplace";
        }
        else{
            $status = false;
            $message = "Seller id already exist for user marketplace";
        }

        


        
        $this->set('status', $status);
        $this->set('message', $message);


        $this->set('_serialize', ['status','message']);

    }




}
