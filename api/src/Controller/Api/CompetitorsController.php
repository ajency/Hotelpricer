<?php
namespace App\Controller\Api;
use App\Controller\Api\AppController;
use Cake\ORM\TableRegistry;
use Cake\I18n\Time;
use Cake\Network\Exception\NotAcceptableException;
use Cake\Network\Exception\BadRequestException;

use Cake\Filesystem\Folder;
use Cake\Filesystem\File;

class CompetitorsController extends AppController
{

    public function fetchAll(){

        $queryData = $this->request->query;
        $user = $this->Auth->identify();

        if ($this->request->is(['patch', 'post', 'put'])) {
            throw new BadRequestException('Bad request method!');
        }

        $productsTable = TableRegistry::get('Products');

        $productSellerTable = TableRegistry::get('ProductSellerData');

        $sellersTable = TableRegistry::get('Sellers');
        // $competitiors = $this->paginate($sellersTable->getCompetitorsData($queryData,$user['id']));
        //
        //
        // $data = array();
        // foreach($competitiors as $competitor){
        //   $competitor_data =$productsTable->getCompetitorData($competitor,$user['id']);
        //     $data[] = $competitor_data;
        // }




        $compids = $productsTable->getCompetitorsIds($queryData,$user['id']);
        $user_id = $user['id'];
        $query = $sellersTable->find()->where(['Sellers.id IN' => $compids])->contain([
          'ProductSellerData' => [
          'queryBuilder' => function ($q) use ($user_id) {
              return $q->order(['ProductSellerData.updated_on'=>'DESC'])->contain([
                'Products' => [
                'queryBuilder' => function ($q) use ($user_id) {
                    return $q->where(['Products.user_id' => $user_id]);
                  }
                ]
              ]);
            }
          ]
        ]);

        //Marketplace filter
        if(array_key_exists('marketplace_id', $queryData)){
            if(!empty($queryData['marketplace_id'])){
                $query->where(["Sellers.channel_id" => $queryData['marketplace_id']]);
            }
        }

        //Search
        if(array_key_exists('search', $queryData)){
            if(array_key_exists('field', $queryData['search']) && array_key_exists('value', $queryData['search'])){
                if(!empty($queryData['search']['field']) && !empty($queryData['search']['value'])){
                    if($queryData['search']['field'] == 'seller_id'){
                        $query->where(["Sellers.seller_id" => $queryData['search']['value']]);
                    }else if($queryData['search']['field'] == 'seller_name'){
                        $query->where(["Sellers.seller_name LIKE" => "%".$queryData['search']['value']."%"]);
                    }
                }
            }
        }


        //Filters
        if(array_key_exists('filters', $queryData)){

            //Rating
            if(array_key_exists('ratings', $queryData['filters'])){
              if(array_key_exists('min', $queryData['filters']['ratings'])){
                $query->where(["Sellers.rating >=" => $queryData['filters']['ratings']['min']]);
              }
              if(array_key_exists('max', $queryData['filters']['ratings'])){
                $query->where(["Sellers.rating <=" => $queryData['filters']['ratings']['max']]);
              }
            }

            //Reviews
            if(array_key_exists('reviews', $queryData['filters'])){
              if(array_key_exists('min', $queryData['filters']['reviews'])){
                $query->where(["Sellers.rating_count >=" => $queryData['filters']['reviews']['min']]);
              }
              if(array_key_exists('max', $queryData['filters']['reviews'])){
                $query->where(["Sellers.rating_count <=" => $queryData['filters']['reviews']['max']]);
              }
            }

            //Listings
            if(array_key_exists('listings', $queryData['filters'])){
              if(array_key_exists('min', $queryData['filters']['listings']) || array_key_exists('max', $queryData['filters']['listings'])){
                $seller_ids = $this->filterSellerIds($query,'listings',$queryData['filters'],$user_id);
                if(count($seller_ids)>0){
                    $query->where(["Sellers.id IN" => $seller_ids]);
                }else{
                    $query->where(["Sellers.id" => 'impossible']);
                }
              }
            }

        }


        $competitiors = $this->paginate($query);



        $filtered_seller_data = array();
        $proseldata = array();
        foreach($competitiors as $dt){
          $lastsellerData = end($dt->product_seller_data);
          foreach($dt->product_seller_data as $key=>$sel_data){
              if(!array_key_exists($sel_data->seller_id, $filtered_seller_data)){
                  $filtered_seller_data[$sel_data->seller_id] = array();

                  $proseldata[$sel_data->seller_id]['id'] = $dt->id;
                  $proseldata[$sel_data->seller_id]['seller_id'] = $dt->seller_id;
                  $proseldata[$sel_data->seller_id]['channel_id'] = $dt->channel_id;
                  $proseldata[$sel_data->seller_id]['seller_name'] = $dt->seller_name;
                  $proseldata[$sel_data->seller_id]['seller_url'] = $dt->seller_url;
                  $proseldata[$sel_data->seller_id]['rating'] = $dt->rating;
                  $proseldata[$sel_data->seller_id]['rating_count'] = $dt->rating_count;


                  $proseldata[$sel_data->seller_id]['competes_on'] = 0;
                  $proseldata[$sel_data->seller_id]['buy_box'] = 0;
                  $proseldata[$sel_data->seller_id]['fbm_listings'] = 0;
                  $proseldata[$sel_data->seller_id]['mop_violation'] = 0;
                  $proseldata[$sel_data->seller_id]['mrp_violation'] = 0;
                  $proseldata[$sel_data->seller_id]['tracked_since'] = Time::parse($lastsellerData['updated_on'])->nice();
                  $proseldata[$sel_data->seller_id]['cheaper_than_me'] = 0;
                  $proseldata[$sel_data->seller_id]['im_cheaper'] = 0;
                  $proseldata[$sel_data->seller_id]['cheapest_on'] = 0;

                  $prosequery = $productSellerTable->find()->where(['ProductSellerData.product_id' => $sel_data->product_id])->contain(['Products'])
                  ->where(['Products.seller_id = ProductSellerData.seller_marketplace_id'])->order(['ProductSellerData.updated_on'=>'DESC']);
                  $mydata = $prosequery->first();

                  $allpodata = $productSellerTable->find()->where(['ProductSellerData.product_id' => $sel_data->product_id])->order(['ProductSellerData.updated_on'=>'DESC'])->toArray();
                  $prices = $this->filterProductSellerPrices($allpodata);

                }

              if(!array_key_exists($sel_data->product_id, $filtered_seller_data[$sel_data->seller_id])){

                  $filtered_seller_data[$sel_data->seller_id][$sel_data->product_id] = $sel_data;
                  $proseldata[$sel_data->seller_id]['competes_on']++;
                  if($sel_data["buy_box"]){
                    $proseldata[$sel_data->seller_id]['buy_box']++;
                  }
                  if($sel_data["fullfilled_by_marketplace"]){
                    $proseldata[$sel_data->seller_id]['fbm_listings']++;
                  }

                  if($sel_data['price'] < $sel_data->product['mop']){
                    $proseldata[$sel_data->seller_id]['mop_violation']++;
                  }

                  if($sel_data['price'] > $sel_data->product['mrp']){
                    $proseldata[$sel_data->seller_id]['mrp_violation']++;
                  }

                  if($mydata !== null){
                    if($sel_data['price'] > $mydata->price){
                      $proseldata[$sel_data->seller_id]['cheaper_than_me']++;
                    }else{
                      $proseldata[$sel_data->seller_id]['im_cheaper']++;
                    }
                  }else{
                    $proseldata[$sel_data->seller_id]['cheaper_than_me']++;
                  }

                  if(min($prices) == $sel_data['price']){
                    $proseldata[$sel_data->seller_id]['cheapest_on']++;
                  }

              }
          }
        }


        $data = array();
        foreach($proseldata as $key=>$dt){
          $data[] = $dt;
        }


        $paginationData = $this->request->params['paging']['Sellers'];

        $this->set('success', true);
        $this->set('result_count', $paginationData['count']);
        $this->set('results_per_page', $paginationData['perPage']);
        $this->set('page', $paginationData['page']);
        $this->set('data', $data);
        $this->set('query_data', $queryData);
        $this->set('_serialize', ['success','result_count','results_per_page','page','data','query_data','product_id']);
    }






    public function filterProductSellerPrices($seller_data){
        $prices = array();
        $sellers = array();
        foreach($seller_data as $sel_data){
            if(!array_key_exists($sel_data->seller_id, $sellers)){
                $sellers[$sel_data->seller_id] = array();
                $prices[] = $sel_data->price;
            }
        }
        return $prices;
      }





    public function getProducts(){

        $queryData = $this->request->query;
        $user = $this->Auth->identify();

        if (!$this->request->is(['get'])) {
            throw new BadRequestException('Bad request method!');
        }

        $productSellerTable = TableRegistry::get('ProductSellerData');
        $competitiorsProducts = $this->paginate($productSellerTable->getCompetitorsProducts($queryData,$user['id']));

        $data = $productSellerTable->formatCompetitorsProducts($competitiorsProducts);

        $paginationData = $this->request->params['paging']['ProductSellerData'];

        $this->set('success', true);
        $this->set('result_count', $paginationData['count']);
        $this->set('results_per_page', $paginationData['perPage']);
        $this->set('page', $paginationData['page']);
        $this->set('data', $data);
        $this->set('query_data', $queryData);
        $this->set('_serialize', ['success','result_count','results_per_page','page','data','query_data']);
    }


    public function getCompetitorProducts(){

        $queryData = $this->request->query; 
        $user = $this->Auth->identify();

        if (!$this->request->is(['get'])) {
            throw new BadRequestException('Bad request method!');
        }

        if(!isset($queryData['seller_id'])){
          throw new NotAcceptableException('seller id is missing!');
        }

        $sellerId = $queryData['seller_id']; //'7l4owqut5bff2u4i';

        $productsTable = TableRegistry::get('Products');
        $products = $productsTable->find()->contain(['PricingRules'])->where([
          'Products.user_id'=>$user['id']]);
        $products->leftJoin(['ProductSellerData' => 'product_seller_data'],
                                         ['Products.id = ProductSellerData.group_id']);

        if(is_int($sellerId))
          $products->where(["ProductSellerData.seller_id" => $sellerId]);
        else
          $products->where(["ProductSellerData.seller_marketplace_id" => $sellerId]);

        $data = $this->paginate($products->group('ProductSellerData.group_id'))->toArray();

        $productIds = [];
        $usersProductInfo = [];
        foreach($products as $product){
          $productIds[] = $product->id;
          $usersProductInfo[$product->id]['my_price'] = $product->my_price;
          $usersProductInfo[$product->id]['mop'] = $product->mop;
          $usersProductInfo[$product->id]['mrp'] = $product->mrp;
          $usersProductInfo[$product->id]['product_name'] =$product->product_title;
          $usersProductInfo[$product->id]['product_image_url'] =$product->product_image;
          $usersProductInfo[$product->id]['product_url'] = $productsTable->generateListingUrl($product->listing_id,$product->marketplace_id);
          $usersProductInfo[$product->id]['sku_code'] =$product->sku_code;
          $usersProductInfo[$product->id]['listing_id'] =$product->listing_id;
          $usersProductInfo[$product->id]['sales_rank'] =$product->rank;

          $usersProductInfo[$product->id]['repricing']=array(
            'rule_id'=>$product->rule_id,
            'rule_name'=>$product->pricing_rule->title,
            'my_min'=>$product->min,
            'my_max'=>$product->max,
            'my_price'=>$product->my_price,
            'market_min'=>$product->battlefield_min_price,
            'market_max'=>$product->battlefield_max_price,
            'buy_box_price'=>$product->buy_box_price,
            'is_min'=>($product->battlefield_min_price == $product->my_price) ? 'yes' : 'no',
            'is_buy_box'=>($product->buy_box_flag) ? 'yes' : 'no',
            'last_tracked_on'=>Time::parse($product->last_updated)->nice(),
            'tracked_listings'=>'',
            'tracked_sellers_count'=>$product->number_of_sellers,
            'tracked_products_count'=>$product->mapped_listings,
            'violated'=>($product->violated) ? true : false,
            );
          
        }
 
        $productSellerTable = TableRegistry::get('ProductSellerData');
        $productSellers = $productSellerTable->find()->contain(['Sellers']);
        if(is_int($sellerId))
          $productSellers->where(["ProductSellerData.seller_id" => $sellerId]);
        else
          $productSellers->where(["ProductSellerData.seller_marketplace_id" => $sellerId]);

        $sellerProductInfo = [];
        $sellerInfo = [];
        $buyBoxCount = 0;
        $fbmCount = 0;
        $isLowestCount = 0;
        $isUsed = 0;
        $mopViolationCount = 0;
        $mrpViolationCount = 0;

        if(!empty($productIds)){


          $productSellers->where(['ProductSellerData.group_id IN '=>$productIds])
                          ->order(['ProductSellerData.updated_on' => 'DESC'])
                          ->limit(count($productIds))
                          ->toArray();


          
          $sellersBuyBox = $productSellerTable->find(); 
          $sellersBuyBox->select(['sum' => $sellersBuyBox->func()->sum('own_buy_box'),'group_id'])
              ->where(["seller_marketplace_id" => '7l4owqut5bff2u4i','group_id IN '=>$productIds])
              ->group(['group_id'])
              ->toArray();

        
          $sellerWonbb = [];

          foreach ($sellersBuyBox as $key => $buyBox) {
            $sellerWonbb[$buyBox->group_id] = $buyBox->sum;
          }

          foreach ($productSellers as $key => $productSeller) {
            $sellerInfo['seller_name'] = $productSeller['seller']['seller_name'];
            $sellerInfo['rating'] = $productSeller['seller']['rating'];
            $sellerInfo['rating_count'] = $productSeller['seller']['rating_count'];


            $productData = $usersProductInfo[$productSeller->group_id];

            //violations
            $violationDetails = [];
            if($productSeller->price < $productData['mop']){
              $mopViolationCount += 1;
              $violationDetails['mop'] = $productSeller->price;
            }

            if($productSeller->price > $productData['mrp']){
              $mrpViolationCount += 1;
              $violationDetails['mrp'] = $productSeller->price;
            }

            if(!empty($violationDetails)){
              $isViolated = true;
              $violationDetails = $violationDetails;
            }
            else{
              $isViolated = false;
              $violationDetails = $violationDetails;
            }

            if($productSeller->buy_box)
              $buyBoxCount += 1;

            if($productSeller->fullfilled_by_marketplace)
              $fbmCount += 1;

            if($productSeller->is_lowest)
              $isLowestCount += 1;

            if($productSeller->log_type == 'old')
              $isUsed += 1;
          

            $wonBB = (isset($sellerWonbb[$productSeller->group_id]))?$sellerWonbb[$productSeller->group_id]:0;
            $sellerProductInfo[] = [
                                    'product_name'=>$productData['product_name'],
                                    'product_image_url'=>$productData['product_image_url'],
                                    'product_url'=>$productData['product_url'],
                                    'sku_code'=>$productData['sku_code'],
                                    'listing_id'=>$productData['listing_id'],
                                    'sales_rank'=>$productData['sales_rank'],
                                    'mrp'=>$productData['mrp'],
                                    'my_price' => $productData['my_price'],
                                    'sellers_price'=>$productSeller->price, 
                                    'won_bb'=> $wonBB, 
                                    'in_stock' => $productSeller->in_stock ,
                                    'stockout' => $productSeller->stockout, 
                                    'violation' => $isViolated,
                                    'violation_details' => $violationDetails,
                                    'repricing' => $productData['repricing']];


            
          }
          //end loop
        }

        $data['competing'] = count($sellerProductInfo);
        $data['buy_box'] = $buyBoxCount;
        $data['fbm'] = $fbmCount;
        $data['lowest_on'] = $fbmCount;
        $data['used'] = $isUsed;
        $data['mop_violation'] = $mopViolationCount;
        $data['mrp_violation'] = $mrpViolationCount;

        $this->set('success', true);
        $this->set('product_seller_info', $sellerProductInfo);
        $this->set('data', $data);
        $this->set('seller_info', $sellerInfo);

        $this->set('_serialize', ['success','product_seller_info','data','seller_info']);
        
    }






    public function getViolations(){

        $queryData = $this->request->query;
        $user = $this->Auth->identify();

        if (!$this->request->is(['get'])) {
            throw new BadRequestException('Bad request method!');
        }


        $sellerTable = TableRegistry::get('Sellers');
        $productSellerTable = TableRegistry::get('ProductSellerData');
        $productsTable = TableRegistry::get('Products');


        $sellerIds = $productsTable->getCompetitorsIds($queryData,$user['id']);


        $dtquery = $productSellerTable->find()->where(['ProductSellerData.id IN' => $sellerIds])->contain(['Products']);
        $dtquery->where(['Products.user_id'=>$user['id']]);
        $dtquery->order(['ProductSellerData.updated_on' => 'DESC'])->distinct(['ProductSellerData.product_id']);
        $dtquery->where(['ProductSellerData.price > Products.mrp']);
        $dtquery->orWhere(['ProductSellerData.price < Products.mop']);

        $violator_ids = array();
        $violator_data = array();
        foreach($dtquery->toArray() as $data){

          if(!array_key_exists($data->seller_id, $violator_data)){
            $violator_data[$data->seller_id] = array('mrp'=>0,'mop'=>0);
          }

          if($data->price > $data->product->mrp){
            $violator_data[$data->seller_id]['mrp']++;
          }

          if($data->price < $data->product->mop){
            $violator_data[$data->seller_id]['mop']++;
          }

          if(!in_array($data->seller_id, $violator_ids)){
            $violator_ids[] = $data->seller_id;
          }

        }


        $sellerQuery = $sellerTable->find()->where(['id IN' => $violator_ids]);

        $violatorData = $this->paginate($sellerQuery);

        foreach($violatorData as $vdata){
          $vdata['mop_violation'] = $violator_data[$vdata['id']]['mop'];
          $vdata['mrp_violation'] = $violator_data[$vdata['id']]['mrp'];
        }

        $paginationData = $this->request->params['paging']['Sellers'];

        $this->set('success', true);
        $this->set('result_count', $paginationData['count']);
        $this->set('results_per_page', $paginationData['perPage']);
        $this->set('page', $paginationData['page']);
        $this->set('data', $violatorData);
        $this->set('query_data', $queryData);
        $this->set('_serialize', ['success','result_count','results_per_page','page','data','query_data']);
    }




}
