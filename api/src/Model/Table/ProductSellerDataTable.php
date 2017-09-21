<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cake\ORM\TableRegistry;
use Cake\I18n\Time;

/**
 * ProductSellerData Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Products
 * @property \Cake\ORM\Association\BelongsTo $Sellers
 *
 * @method \App\Model\Entity\ProductSellerData get($primaryKey, $options = [])
 * @method \App\Model\Entity\ProductSellerData newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\ProductSellerData[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\ProductSellerData|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\ProductSellerData patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\ProductSellerData[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\ProductSellerData findOrCreate($search, callable $callback = null, $options = [])
 */
class ProductSellerDataTable extends Table
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

        $this->setTable('product_seller_data');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('ProductsToBeTracked', [
            'foreignKey' => 'product_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('Sellers', [
            'foreignKey' => 'seller_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('Products', [
            'foreignKey' => 'group_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('Marketplaces', [
            'foreignKey' => 'marketplace_id',
            'joinType' => 'INNER'
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
            ->dateTime('updated_on')
            ->requirePresence('updated_on', 'create')
            ->notEmpty('updated_on');

        $validator
            ->boolean('fullfilled_by_marketplace')
            ->allowEmpty('fullfilled_by_marketplace');

        $validator
            ->boolean('covered_under_loyalty')
            ->allowEmpty('covered_under_loyalty');

         $validator
            ->boolean('buy_box')
            ->allowEmpty('buy_box');

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
        $rules->add($rules->existsIn(['product_id'], 'ProductsToBeTracked'));
        $rules->add($rules->existsIn(['seller_id'], 'Sellers'));

        return $rules;
    }









    public function getCompetitorsProducts($queryData,$user_id){

      $query = $this->find()->contain(['Sellers',

        'ProductsToBeTracked' => [
          'queryBuilder' => function ($q) use ($user_id) {
            return $q->contain(['Marketplaces',
              'Products' => [
                'queryBuilder' => function ($q) use ($user_id) {
                    return $q->where(['Products.user_id'=>$user_id]);
                }
              ]
            ])->where(['ProductsToBeTracked.active' => true]);
          }
        ]

    ])->distinct(['ProductSellerData.product_id'])->order(['ProductSellerData.updated_on'=>'DESC']);

    if(array_key_exists('seller_id', $queryData)){
      $query->where(['ProductSellerData.seller_id'=>$queryData['seller_id']]);
    }

    //Search
    if(array_key_exists('search', $queryData)){
        if(array_key_exists('field', $queryData['search']) && array_key_exists('value', $queryData['search'])){
            if(!empty($queryData['search']['field']) && !empty($queryData['search']['value'])){
                if($queryData['search']['field'] == 'seller_name'){
                  $query->where(["Sellers.seller_name LIKE" => "%".$queryData['search']['value']."%"]);
                }else if($queryData['search']['field'] == 'product_title'){
                  $query->where(["ProductsToBeTracked.product_title LIKE" => "%".$queryData['search']['value']."%"]);
                }else if($queryData['search']['field'] == 'listing_id'){
                  $query->where(["ProductsToBeTracked.listing_id" => $queryData['search']['value']]);
                }
            }
        }
    }

    //Filters
    if(array_key_exists('filters', $queryData)){

        //Marketplace
        if(array_key_exists('marketplace_id', $queryData['filters'])){
            $query->where(["ProductsToBeTracked.marketplace_id" => $queryData['filters']['marketplace_id']]);
        }


        //Attributes
        if(array_key_exists('attribute', $queryData['filters'])){

            if($queryData['filters']['attribute'] == 'mop_violation'){
              $query->where(["ProductSellerData.price < Products.mop"]);
            }
            if($queryData['filters']['attribute'] == 'mrp_violation'){
              $query->where(["ProductSellerData.price > Products.mrp"]);
            }

        }

    }


      return $query;
    }





    public function formatCompetitorsProducts($products){
      $data = array();
      foreach($products as $product){
        $dt = array(
          'product_title' => $product->products_to_be_tracked->product_title,
          'product_image' => $product->products_to_be_tracked->product_image,
          'product_url' => $product->products_to_be_tracked->listing_url,
          'marketplace_id' => $product->products_to_be_tracked->marketplace_id,
          'marketplace_name' => $product->products_to_be_tracked->marketplace->title,
          'listing_id' => $product->products_to_be_tracked->listing_id,
          'seller_name' => $product->seller->seller_name,
          'price' => $product->price,
          'fullfilled_by_marketplace' => $product->fullfilled_by_marketplace,
          'mop_violation' => ($product->price < $product->products_to_be_tracked->product->mop) ? true : false,
          'mrp_violation' => ($product->price > $product->products_to_be_tracked->product->mrp) ? true : false,
        );
        $data[] = $dt;
      }
      return $data;

    }





    public function updateAfterCrawlSucceeded($response){

      $sellerTable = TableRegistry::get('Sellers');
      $trackTable = TableRegistry::get('ProductsToBeTracked');
      $productsTable = TableRegistry::get('Products');
      $activitiesTable = TableRegistry::get('Activities');

      $trackProduct = $trackTable->get($response['product']['product_id']);
      $mainProduct = $productsTable->get($trackProduct->product_id);

      ##If first crawl not succeeded and sellers empty, then mark as failed
      if(!$trackProduct->is_competition){
        if((is_null($mainProduct->first_crawl_succeeded))&& (count($response['sellers']) == 0)){
          $trackTable->markFailed($response['product']['product_id']);
          return;
        }
      }


      //debug($mainProduct);

      if($response['product']['channel'] == 'amazon'){
        $channel_id = 1;
      }else if($response['product']['channel'] = 'flipkart'){
        $channel_id = 2;
      }else if($response['product']['channel'] = 'snapdeal'){
        $channel_id = 3;
      }else if($response['product']['channel'] = 'paytm'){
        $channel_id = 4;
      }

      $prices = $this->array_pluck($response['sellers'], 'price');
      $sller_ids = $this->array_pluck($response['sellers'], 'seller_id');
      $lowest_price = min($prices);

      $activity_data = array(
        'user_id' => $mainProduct->user_id,
        'product_id' => $mainProduct->id,
        'created' => Time::now(),
        'listing_id' => $response['product']['listing_id'],
        'group_id' => $response['product']['group_id']
      );


      $oldData = array();
      $newData = array();
      $activities = array();

      //Add product updated activity
      // $additional_data = array('listing_id'=>$trackProduct->listing_id);
      // $activities[] = $activitiesTable->generateActivityData('product_updated',$activity_data,true,$additional_data);

    $additional_data = array('listing_id'=>$trackProduct->listing_id);
    $activities[] = $activitiesTable->generateActivityData('crawl_success',$activity_data,true,$additional_data);

      if($mainProduct->number_of_sellers > 0){
        $previousLogs = $this->find()->select([
          'seller_id',
          'price',
          'buy_box',
          'in_stock',
          'seller_marketplace_id',
          'is_lowest'
          ])->where(['product_id' => $response['product']['product_id']])->order(['updated_on'=>'DESC'])->limit($mainProduct->number_of_sellers)->hydrate(false)->toArray();
      }else{
        $previousLogs = array();
      }


      foreach($previousLogs as $log){
        $oldData[$log['seller_id']] = $log;

        if(!in_array($log['seller_marketplace_id'], $sller_ids)){

          if($log['seller_marketplace_id'] == $mainProduct->seller_id){
            $is_tracker = true;
          }else{
            $is_tracker = false;
          }

          $outstockdata = array(
            'product_id'                => $response['product']['product_id'],
            'seller_id'                 => $log['seller_id'],
            'updated_on'                => Time::now(),
            'price'                     => null,
            'delivery'                  => null,
            'fullfilled_by_marketplace' => null,
            'covered_under_loyalty'     => null,
            'buy_box'                   => null,
            'product_condition'         => null,
            'group_id'                  => $trackProduct->product_id,
            'marketplace_id'            => $channel_id,
            'seller_marketplace_id'     => $log['seller_marketplace_id'],
            'batch_group_id'            => $response['product']['group_id'],
            'log_type'                  => null,
            'is_price_changed'          => null,
            'in_stock'                  => false,
            'own_buy_box'               => null,
            'lost_buy_box'              => null,
            'own_lowest_price'          => null,
            'lost_lowest_price'         => null,
            'is_lowest'                 => null,
            'batch_id'                  => $response['product']['batch_id']
          );
          $newData[] = $outstockdata;

          //Add stockout activity if previously in stock
          if($log['in_stock']){
            $additional_data = array('seller_id'=>$log['seller_id'],'listing_id'=>$trackProduct->listing_id);
            $activities[] = $activitiesTable->generateActivityData('seller_stockout',$activity_data,$is_tracker,$additional_data);
          }

        }

      }


      foreach($response['sellers'] as $seller){
        $seller_id = $sellerTable->saveUpdateSeller($seller,$channel_id);

        if($seller['seller_id'] == $mainProduct->seller_id){
          $is_tracker = true;
        }else{
          $is_tracker = false;
        }

        $is_price_changed = false;
        $own_buy_box = false;
        $lost_buy_box = false;
        $own_lowest_price = false;
        $lost_lowest_price = false;
        $log_type = null;
        $is_lowest = false;

        if(round($lowest_price) == round($seller['price'])){
          $is_lowest = true;
        }

        if(count($oldData)>0){
          if(!array_key_exists($seller_id, $oldData)){
            $log_type = 'New';

            //Add new seller entered activity
            $additional_data = array('seller_id'=>$seller_id,'listing_id'=>$trackProduct->listing_id);
            $activities[] = $activitiesTable->generateActivityData('new_seller',$activity_data,$is_tracker,$additional_data);
          }else{

            if(round($oldData[$seller_id]['price']) != round($seller['price']) ){

              if(!is_null($oldData[$seller_id]['price'])){
                $is_price_changed = true;
                //Add price changed activity
                $additional_data = array('seller_id'=>$seller_id,'listing_id'=>$trackProduct->listing_id,'old_price'=>$oldData[$seller_id]['price'],'new_price'=>$seller['price']);
                $activities[] = $activitiesTable->generateActivityData('seller_price_changed',$activity_data,$is_tracker,$additional_data);
              }

            }

            if((!$oldData[$seller_id]['buy_box']) && ($seller['buy_box'])){
              $own_buy_box = true;

              //Add own buy box activity
              $additional_data = array('seller_id'=>$seller_id,'listing_id'=>$trackProduct->listing_id);
              $activities[] = $activitiesTable->generateActivityData('own_buy_box',$activity_data,$is_tracker,$additional_data);
            }

            if(($oldData[$seller_id]['buy_box']) && (!$seller['buy_box'])){
              $lost_buy_box = true;

              //Add lost buy box activity
              $additional_data = array('seller_id'=>$seller_id,'listing_id'=>$trackProduct->listing_id);
              $activities[] = $activitiesTable->generateActivityData('lost_buy_box',$activity_data,$is_tracker,$additional_data);
            }

            if((!$oldData[$seller_id]['is_lowest']) && ($is_lowest)){
              $own_lowest_price = true;

              //Add own lowest price activity
              $additional_data = array('seller_id'=>$seller_id,'listing_id'=>$trackProduct->listing_id,'old_price'=>$oldData[$seller_id]['price'],'new_price'=>$seller['price']);
              $activities[] = $activitiesTable->generateActivityData('own_lowest_price',$activity_data,$is_tracker,$additional_data);
            }

            if(($oldData[$seller_id]['is_lowest']) && (!$is_lowest)){
              $lost_lowest_price = true;

              //Add lost lowest price activity
              $additional_data = array('seller_id'=>$seller_id,'listing_id'=>$trackProduct->listing_id,'old_price'=>$oldData[$seller_id]['price'],'new_price'=>$seller['price']);
              $activities[] = $activitiesTable->generateActivityData('lost_lowest_price',$activity_data,$is_tracker,$additional_data);
            }

          }
        }

        $data = array(
          'product_id'                => $response['product']['product_id'],
          'seller_id'                 => $seller_id,
          'updated_on'                => Time::now(),
          'price'                     => $seller['price'],
          'delivery'                  => $seller['delivery'],
          'fullfilled_by_marketplace' => $seller['fullfilled_by_marketplace'],
          'covered_under_loyalty'     => $seller['covered_under_loyalty'],
          'buy_box'                   => $seller['buy_box'],
          'product_condition'         => $seller['condition'],
          'group_id'                  => $trackProduct->product_id,
          'marketplace_id'            => $channel_id,
          'seller_marketplace_id'     => $seller['seller_id'],
          'batch_group_id'            => $response['product']['group_id'],
          'log_type'                  => $log_type,
          'is_price_changed'          => $is_price_changed,
          'in_stock'                  => true,
          'own_buy_box'               => $own_buy_box,
          'lost_buy_box'              => $lost_buy_box,
          'own_lowest_price'          => $own_lowest_price,
          'lost_lowest_price'         => $lost_lowest_price,
          'is_lowest'                 => $is_lowest,
          'batch_id'                  => $response['product']['batch_id']
        );

        $newData[] = $data;

        // if($data['seller_marketplace_id'] == 'A1KUDLUNG8TNUX'){
        //   debug($oldData[$seller_id]);
        //   debug($data);
        // }

      }



      //Save prdoduct seller data set
      $entities = $this->newEntities($newData);
      $this->saveMany($entities);

      //Save activities
      $activitiesTable->saveActivities($activities);

      //If not failed then update products to be tracked
      $trackTable->updateAfterCrawlSucceeded($response['product']);
    }



    public function array_pluck($array, $key) {
      return array_map(function($v) use ($key)	{
        return is_object($v) ? $v->$key : $v[$key];
      }, $array);
    }





}
