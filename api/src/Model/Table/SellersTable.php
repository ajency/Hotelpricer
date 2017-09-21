<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cake\ORM\TableRegistry;

/**
 * Sellers Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Sellers
 * @property \Cake\ORM\Association\BelongsTo $Channels
 * @property \Cake\ORM\Association\HasMany $ProductSellerData
 * @property \Cake\ORM\Association\HasMany $Sellers
 *
 * @method \App\Model\Entity\Seller get($primaryKey, $options = [])
 * @method \App\Model\Entity\Seller newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Seller[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Seller|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Seller patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Seller[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Seller findOrCreate($search, callable $callback = null, $options = [])
 */
class SellersTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('sellers');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->hasMany('ProductSellerData', [
            'foreignKey' => 'seller_id'
        ]);
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        $validator
            ->integer('id')
            ->allowEmpty('id', 'create');

        $validator
            ->requirePresence('seller_name', 'create')
            ->notEmpty('seller_name');

        $validator
            ->allowEmpty('seller_url');

        return $validator;
    }

    /**
     * Returns a rules checker object that will be used for validating
     * application integrity.
     *
     * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
     * @return \Cake\ORM\RulesChecker
     */
    public function buildRules(RulesChecker $rules)
    {


        return $rules;
    }






    public function getCompetitorsData($queryData,$user_id){
      $productsTable = TableRegistry::get('Products');
      $seller_ids = $productsTable->getCompetitorsIds($queryData,$user_id);

      $query = $this->find()->where(['id IN'=>$seller_ids])->contain([

        'ProductSellerData' => [
          'queryBuilder' => function ($q) {
            //return $q->distinct(['ProductSellerData.product_id']);
            return $q;
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


      return $query;
    }






    public function filterSellerIds($query,$key,$filters,$user_id){
      $ids = array();
      $productsTable = TableRegistry::get('Products');
      foreach($query->toArray() as $seller){
        $trackable = $productsTable->getTrackableCompetitorProducts($seller['id'],$user_id);
        $listings = array();
        foreach($trackable as $product){
          $track_data = $product['products_to_be_tracked'];

          foreach($track_data as $trk_data){
            foreach($trk_data['product_seller_data'] as $sel_data){
              if($sel_data['seller_id']==$seller['id']){
                $listings[$sel_data['product_id']] = $sel_data;
              }
            }
          }
        }

        if($key == 'listings'){

          if(array_key_exists('min',$filters['listings']) && array_key_exists('max',$filters['listings'])){
            if((count($listings) >= $filters['listings']['min']) && (count($listings) <= $filters['listings']['max'])){
              $ids[] = $seller['id'];
            }
          }else{
            if(array_key_exists('min',$filters['listings'])){
              if(count($listings) >= $filters['listings']['min']){
                $ids[] = $seller['id'];
              }
            }elseif(array_key_exists('max',$filters['listings'])){
              if(count($listings) <= $filters['listings']['max']){
                $ids[] = $seller['id'];
              }
            }
          }

        }

      }

      return $ids;

    }





    public function getSellerId($marketplace_id,$marketplace_seller_id){
      $seller = $this->find()->where(['channel_id'=>$marketplace_id, 'seller_id'=>$marketplace_seller_id])->first();
      if($seller !== null){
        return $seller->id;
      }else{
        return 0;
      }

    }


    public function deleteData($sellerIds){
         $this->deleteAll(['id IN' => $sellerIds]);
    }



    public function saveUpdateSeller($seller,$channel_id){

      $preSeller = $this->find()->where(['channel_id'=>$channel_id, 'seller_id'=>$seller['seller_id']])->toArray();
      if(count($preSeller) > 0){
        $previousSeller = $preSeller[0];
        if(($previousSeller->rating != $seller['rating']) || ($previousSeller->rating_count != $seller['rating_count'])){
          $this->query()->update()->set([
            'rating' => $seller['rating'],
            'rating_count' => $seller['rating_count']
          ])
          ->where(['id' => $previousSeller->id])
          ->execute();
        }
        return $previousSeller->id;
      }else{
        $seldata = array(
          'seller_id' => $seller['seller_id'],
          'channel_id' => $channel_id,
          'seller_name' => $seller['seller_name'],
          'seller_url' => $seller['seller_url'],
          'rating' => $seller['rating'],
          'rating_count' => $seller['rating_count']
        );
        $sellerEntity = $this->newEntity();
        $sell = $this->patchEntity($sellerEntity,$seldata);
        $newSeller = $this->save($sell);
        return $newSeller->id;
      }

    }





    public function getBuyBoxOwnershipCount($seller_id,$product_id){
      $productSellerTable = TableRegistry::get('ProductSellerData');
      $bb_ownerships = $productSellerTable->find()->where(['seller_id'=>$seller_id, 'product_id'=>$product_id, 'own_buy_box'=>true])->toArray();
      $bb_ownerships_count = count($bb_ownerships);
      return $bb_ownerships_count;
    }


    public function getStockoutCount($seller_id,$product_id){
      $productSellerTable = TableRegistry::get('ProductSellerData');
      $stockouts = $productSellerTable->find()->where(['seller_id'=>$seller_id, 'product_id'=>$product_id])->order(['id'=>'ASC'])->toArray();
      $count_continue = true;
      $stockouts_count = 0;
      foreach($stockouts as $stock){
        if($stock['in_stock'] == false){
          if($count_continue){
            $stockouts_count++;
            $count_continue = false;
          }
        }
        if($stock['in_stock'] == true){
          $count_continue = true;
        }
      }
      return $stockouts_count;
    }


    public function sellerMarketPlaceData($sellerId,$seller){
      $sellerMarketPlace['Amazon'] = ['AT95IG9ONZD7S','A14UQ4H17XUX90','A35OT1HDS62R0U'];
      $sellerMarketPlace['Flipkart'] = ['d591418b408940a0','c82e1fb314f34969'];
     
      if(!empty($sellerMarketPlace)){
        foreach ($sellerMarketPlace as $marketPlace => $sellerIds) {
          if(!empty($sellerIds) && in_array($sellerId, $sellerIds)){
            $seller = $marketPlace;
          }
        }
      }

      return $seller;
    }


    public function getCounts($seller_id,$product_id, $field){
        $productSellerTable = TableRegistry::get('ProductSellerData');
        $count_data = $productSellerTable->find()->where(['seller_id'=>$seller_id, 'product_id'=>$product_id, $field=>true])->toArray();
        return count($count_data);
    }


}
