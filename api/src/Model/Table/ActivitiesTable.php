<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cake\ORM\TableRegistry;

/**
 * Activities Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Users
 * @property \Cake\ORM\Association\BelongsTo $Products
 *
 * @method \App\Model\Entity\Activity get($primaryKey, $options = [])
 * @method \App\Model\Entity\Activity newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Activity[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Activity|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Activity patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Activity[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Activity findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class ActivitiesTable extends Table
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

        $this->setTable('activities');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->belongsTo('Users', [
            'foreignKey' => 'user_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('Products', [
            'foreignKey' => 'product_id',
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
            ->requirePresence('action', 'create')
            ->notEmpty('action');

        $validator
            ->requirePresence('content', 'create')
            ->notEmpty('content');

        $validator
            ->allowEmpty('details');

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
        $rules->add($rules->existsIn(['user_id'], 'Users'));
        $rules->add($rules->existsIn(['product_id'], 'Products'));

        return $rules;
    }




    public function getActivities($product_id, $queryData, $user_id){
      $query = $this->find()->where(['user_id'=>$user_id,'product_id'=>$product_id, 'action !='=>'product_updated']);

      if(isset($queryData['activity_action']) && $queryData['activity_action']!="" && $queryData['activity_action']!="all"){
          $query->where(['action'=>$queryData['activity_action']]);
      }
      $query->order(['created'=>'DESC']);
      return $query;
    }

    public function getActivitActions($product_id, $queryData, $user_id){
      $uniqueActions = $this->find()->select(['action','content'])->distinct(['action'])->where(['user_id'=>$user_id,'product_id'=>$product_id])->toArray();
      $actions = ['all'=>'All'];

      foreach ($uniqueActions as $key => $uniqueAction) {
          $actions[$uniqueAction['action']] = ucwords(str_replace("_", " ", $uniqueAction['action']));;
      }
      return $actions;
    }



    public function saveActivities($activities){
      $entities = $this->newEntities($activities);
      $this->saveMany($entities);
    }


    public function generateActivityData($action,$activity_data,$is_tracker,$additional_data){

      $activity_data['is_tracker'] = $is_tracker;

      if($is_tracker){
        $seller = 'You';
      }else{
        $sellerTable = TableRegistry::get('Sellers');
        $sellerData = $sellerTable->get($additional_data['seller_id']);
        $seller = $sellerData->seller_name;
      }

      switch ($action) {
          case 'product_updated':
              $activity_data['action'] = 'product_updated';
              $activity_data['content'] = 'Data updated for listing id - '.$additional_data['listing_id'];
              $activity_data['details'] = serialize(array(
                array('label'=>'Listing ID','value'=>$additional_data['listing_id'])
              ));
              break;
          case 'seller_stockout':
              $activity_data['action'] = 'seller_stockout';
              $activity_data['content'] = $seller.' stocked out';
              $activity_data['details'] = serialize(array(
                array('label'=>'Listing ID','value'=>$additional_data['listing_id']),
                array('label'=>'Seller','value'=>$seller)
              ));
              break;
          case 'new_seller':
              $activity_data['action'] = 'new_seller';
              if($is_tracker){
                $activity_data['content'] = 'You started selling the product.';
              }else{
                $activity_data['content'] = 'New seller entered - '.$seller;
              }
              $activity_data['details'] = serialize(array(
                array('label'=>'Listing ID','value'=>$additional_data['listing_id']),
                array('label'=>'Seller','value'=>$seller)
              ));
              break;
          case 'seller_price_changed':
              $activity_data['action'] = 'seller_price_changed';
              $activity_data['content'] = 'Price changed for '.$seller;
              $activity_data['details'] = serialize(array(
                array('label'=>'Listing ID','value'=>$additional_data['listing_id']),
                array('label'=>'Seller','value'=>$seller),
                array('label'=>'Previous Price','value'=>$additional_data['old_price']),
                array('label'=>'Current Price','value'=>$additional_data['new_price'])
              ));
              break;
          case 'own_buy_box':
              $activity_data['action'] = 'own_buy_box';
              $activity_data['content'] = $seller.' own buybox';
              $activity_data['details'] = serialize(array(
                array('label'=>'Listing ID','value'=>$additional_data['listing_id']),
                array('label'=>'Seller','value'=>$seller)
              ));
              break;
          case 'lost_buy_box':
              $activity_data['action'] = 'lost_buy_box';
              $activity_data['content'] = $seller.' lost buybox';
              $activity_data['details'] = serialize(array(
                array('label'=>'Listing ID','value'=>$additional_data['listing_id']),
                array('label'=>'Seller','value'=>$seller)
              ));
              break;

          case 'own_lowest_price':
              $activity_data['action'] = 'own_lowest_price';
              $activity_data['content'] = $seller.' won lowest price';
              $activity_data['details'] = serialize(array(
                array('label'=>'Listing ID','value'=>$additional_data['listing_id']),
                array('label'=>'Seller','value'=>$seller),
                array('label'=>'Previous Price','value'=>$additional_data['old_price']),
                array('label'=>'Current Price','value'=>$additional_data['new_price'])
              ));
              break;

          case 'lost_lowest_price':
              $activity_data['action'] = 'lost_lowest_price';
              $activity_data['content'] = $seller.' lost lowest price';
              $activity_data['details'] = serialize(array(
                array('label'=>'Listing ID','value'=>$additional_data['listing_id']),
                array('label'=>'Seller','value'=>$seller),
                array('label'=>'Previous Price','value'=>$additional_data['old_price']),
                array('label'=>'Current Price','value'=>$additional_data['new_price'])
              ));
              break;

          case 'crawl_success':
              $activity_data['action'] = 'crawl_success';
              $activity_data['content'] = 'Crawl Success for listing id - '.$additional_data['listing_id'];
              $activity_data['details'] = serialize(array(
                  array('label'=>'Listing ID','value'=>$additional_data['listing_id'])
              ));
              break;

          case 'crawl_failed':
              $activity_data['action'] = 'crawl_failed';
              $activity_data['content'] = 'Crawl Failed for listing id - '.$additional_data['listing_id'];
              $activity_data['details'] = serialize(array(
                  array('label'=>'Listing ID','value'=>$additional_data['listing_id'])
              ));
              break;
            }
        return $activity_data;
    }



}
