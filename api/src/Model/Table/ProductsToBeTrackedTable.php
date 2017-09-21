<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\ORM\TableRegistry;
use Cake\Validation\Validator;
use Cake\I18n\Time;

/**
 * ProductsToBeTracked Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Products
 * @property \Cake\ORM\Association\BelongsTo $Marketplaces
 * @property \Cake\ORM\Association\BelongsTo $Listings
 * @property \Cake\ORM\Association\BelongsTo $BtCats
 *
 * @method \App\Model\Entity\ProductsToBeTracked get($primaryKey, $options = [])
 * @method \App\Model\Entity\ProductsToBeTracked newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\ProductsToBeTracked[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\ProductsToBeTracked|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\ProductsToBeTracked patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\ProductsToBeTracked[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\ProductsToBeTracked findOrCreate($search, callable $callback = null, $options = [])
 */
class ProductsToBeTrackedTable extends Table
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

        $this->setTable('products_to_be_tracked');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('Products', [
            'foreignKey' => 'product_id',
            'joinType' => 'INNER'
        ]);

        $this->belongsTo('Marketplaces', [
            'foreignKey' => 'marketplace_id',
            'joinType' => 'INNER'
        ]);

        $this->hasMany('ProductSellerData', [
            'foreignKey' => 'product_id'
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

        /*$validator
            ->dateTime('last_updated')
            ->requirePresence('last_updated', 'create')
            ->notEmpty('last_updated');

        $validator
            ->dateTime('created_at')
            ->requirePresence('created_at', 'create')
            ->notEmpty('created_at');*/

        $validator
            ->requirePresence('listing_url', 'create')
            ->notEmpty('listing_url');

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
        $rules->add($rules->existsIn(['product_id'], 'Products'));

        return $rules;
    }





    public function getAllProducts(){
        return $this->find()->contain([
            'Marketplaces',
            'ProductSellerData' => [
            'queryBuilder' => function ($q) {
                //return $q->order(['ProductSellerData.updated_on' => 'DESC'])->contain(['Sellers']);
                return $q->contain(['Sellers'])->where(['ProductSellerData.active'=>true]);
            }
            ]

            ])->where(['ProductsToBeTracked.active'=>true])->toArray();
    }




    public function getProductIds(){
        $products = $this->find()->select(['id'])->toArray();
        $ids = array();
        foreach($products as $product){
            $ids[] = $product['id'];
        }
        $product_ids = implode(',', $ids);
        return $product_ids;
    }



    public function getTrackableProducs($data, $return_listing_ids = false){

        if($return_listing_ids) {
            $query = $this->find()->select(['ProductsToBeTracked.id','Marketplaces.title', 'ProductsToBeTracked.listing_id'])->contain(['Marketplaces']);
        } else {
            $query = $this->find()->select(['ProductsToBeTracked.id','Marketplaces.title'])->contain(['Marketplaces']);
        }

        if(array_key_exists('marketplace_id', $data)){
            $query->where(["ProductsToBeTracked.marketplace_id" => $data['marketplace_id']]);
        }

        if(array_key_exists('product_id', $data)){
            $query->where(["ProductsToBeTracked.id" => $data['product_id']]);
        }

        if(array_key_exists('product_ids', $data)){
            $query->where(["ProductsToBeTracked.product_id IN" => $data['product_ids']]);
        }else{
            $query->where(['last_updated < DATE_SUB(NOW(),INTERVAL 5 MINUTE)','ProductsToBeTracked.active'=>true]);
        }

        $productsData = $query->toArray();
        $products = array();
        foreach($productsData as $product){

            $marketplace = strtolower($product->marketplace->title);

            if(!array_key_exists($marketplace, $products)){
                $products[$marketplace] = array();
            }
            if($return_listing_ids) {
               $products[$marketplace][(String)$product['id']] =  $product['listing_id'];
            } else {
                array_push($products[$marketplace],(string) $product['id']);
            }
        }

        return $products;
    }




    public function saveTrackableProduct($product){
        $trackEntity = $this->newEntity();
        $prod = $this->patchEntity($trackEntity,$product);
        return $this->save($prod);
    }



    public function getListingIds($product_id){
        $query = $this->find('list', ['valueField' => 'listing_id'])
        ->select(['id' ,'listing_id'])
        ->where(['product_id' => $product_id, 'active' => true]);
        return $query->toArray();
    }

    public function getUploadId($product_id){
        $product = $this->find()->where(["product_id"=>$product_id])->first();
        return $product->upload_id;
    }



    public function toggleActivate($active,$id=null,$product_id=null,$listing_id=null){
        if(is_null($id)){
            $query = $this->query();
            $query->update()
            ->set(['active' => $active])
            ->where(['product_id' => $product_id, 'listing_id' => $listing_id])
            ->execute();
        }else{
            $query = $this->query();
            $query->update()
            ->set(['active' => $active])
            ->where(['id' => $id])
            ->execute();
        }

    }



    public function getUploadedTrackedProducts($queryData,$product_ids){
      $query = $this->find()->select(['listing_id','created_at','last_updated','crawl_status'])->where(['product_id IN'=>$product_ids]);
      return $query;
    }



    public function updateUploadId($upload_id,$product_ids){
      $this->updateAll(
        array("upload_id" => $upload_id),
        array("product_id IN" => $product_ids)
      );
    }


    public function deleteData($productTrackIds){
         $this->deleteAll(['id IN' => $productTrackIds]);
    }




    public function getMainProductIds($ids){
      $product_ids = array();
      $trackProducts = $this->find()->select(['Products.id'])->where(['ProductsToBeTracked.id IN'=>$ids])->contain(['Products'])->toArray();
      foreach($trackProducts as $track){
        $product_ids[] = $track->Products->id;
      }
      return $product_ids;
    }

    public function bulkUpdateCrawlStatus($product_ids, $status = 'Crawling') {
        $this->updateAll(
            array("crawl_status" => $status),
            array("id IN" => $product_ids)
        );
    }



    public function markFailed($id){
        $trackProduct = $this->get($id);
        $this->query()->update()->set([
          'crawl_status' => 'Failed',
          'failed_attempt_count' => $trackProduct->failed_attempt_count+1,
          'last_updated' => Time::now()
        ])
        ->where(['id' => $id])
        ->execute();

        //Change first crawl succeeded to false for product as we do not generate summary for those
        if(!$trackProduct->is_competition) {
            $productsTable = TableRegistry::get('Products');
          $productsTable->query()->update()->set([
            'first_crawl_succeeded' => false,
            'last_updated' => Time::now()
          ])
          ->where(['id' => $trackProduct->product_id, 'first_crawl_succeeded IS' => NULL])
          ->execute();
        }
    }


    public function updateAfterCrawlSucceeded($data){
      $this->query()->update()->set([
        'crawl_status' => 'Processed',
        'dirty' => true,
        'product_title' => $data['title'],
        'product_image' => $data['image'],
        'is_stock' => $data['is_stock'],
        'mrp' => $data['mrp'],
        'first_crawl_succeeded' => true,
        'last_updated' => Time::now()
      ])
      ->where(['id' => $data['product_id']])
      ->execute();
    }



}
