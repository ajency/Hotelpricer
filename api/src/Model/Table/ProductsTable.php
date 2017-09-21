<?php
namespace App\Model\Table;

use Cake\Core\Exception\Exception;
use Cake\Datasource\ConnectionManager;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cake\ORM\TableRegistry;
use Cake\I18n\Time;
use Cake\Network\Exception\NotAcceptableException;

use PHPExcel;
use PHPExcel_IOFactory;
use PHPExcel_Style_Fill;
use PHPExcel_Style_Color;
use PHPExcel_Cell_DataValidation;

/**
 * Products Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Marketplaces
 * @property \Cake\ORM\Association\BelongsTo $Listings
 * @property \Cake\ORM\Association\BelongsTo $Rules
 * @property \Cake\ORM\Association\BelongsTo $Users
 * @property \Cake\ORM\Association\HasMany $AttributesValue
 * @property \Cake\ORM\Association\HasMany $ProductSellerData
 * @property \Cake\ORM\Association\HasMany $ProductsToBeTracked
 *
 * @method \App\Model\Entity\Product get($primaryKey, $options = [])
 * @method \App\Model\Entity\Product newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Product[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Product|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Product patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Product[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Product findOrCreate($search, callable $callback = null, $options = [])
 */
class ProductsTable extends Table
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

        $this->setTable('products');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->hasMany('ProductsToBeTracked', [
            'foreignKey' => 'product_id'
        ]);


        $this->belongsTo('PricingRules', [
            'foreignKey' => 'rule_id',
            'joinType' => 'INNER'
        ]);

        $this->belongsTo('ProductStatuses', [
            'foreignKey' => 'status',
            'joinType' => 'INNER'
        ]);

        $this->belongsTo('Users', [
            'foreignKey' => 'user_id',
            'joinType' => 'INNER'
        ]);

        $this->belongsTo('Marketplaces', [
            'foreignKey' => 'marketplace_id',
            'joinType' => 'INNER'
        ]);

        $this->hasMany('ProductSellerData', [
            'foreignKey' => 'group_id'
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
            ->allowEmpty('sku_code');

        $validator
            ->allowEmpty('seller_id');

        /*$validator
            ->integer('min')
            ->requirePresence('minn', 'create')
            ->notEmpty('min');

        $validator
            ->integer('max')
            ->requirePresence('max', 'create')
            ->notEmpty('max');*/

        $validator
            ->allowEmpty('product_family');

        $validator
            ->integer('status')
            ->requirePresence('status', 'create')
            ->notEmpty('status');

        /*$validator
            ->dateTime('created_at')
            ->requirePresence('created_at', 'create')
            ->notEmpty('created_at');

        $validator
            ->dateTime('last_updated')
            ->requirePresence('last_updated', 'create')
            ->notEmpty('last_updated');*/

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
        $rules->add($rules->existsIn(['rule_id'], 'PricingRules'));
        $rules->add($rules->existsIn(['user_id'], 'Users'));

        return $rules;
    }





    public function getSingleProduct($id){
      $prod = $this->find()->contain(['PricingRules','Marketplaces',

          'ProductsToBeTracked' => [
          'queryBuilder' => function ($q) {
              return $q->contain([
                  'Marketplaces',
                  'ProductSellerData' => [
                  'queryBuilder' => function ($q) {
                      /*return $q->contain(['Sellers'])->distinct(['ProductSellerData.seller_id'])->order(['ProductSellerData.updated_on'=>'DESC']);*/

                      return $q->contain(['Sellers'])->order(['ProductSellerData.updated_on'=>'DESC']);

                  }
                  ]

                  ])->where(['ProductsToBeTracked.active'=>true]);
          }
          ]

          ])->where(['Products.id'=>$id])->toArray();
          return $prod[0];
    }




    public function getAllProducts($queryData,$user_id, $only_counts = false){

        $query = $this->find()->contain(['PricingRules','Marketplaces',

            'ProductsToBeTracked' => [
            'queryBuilder' => function ($q) {
                return $q->contain([
                    'Marketplaces',
                    'ProductSellerData' => [
                    'queryBuilder' => function ($q) {
                        /*return $q->contain(['Sellers'])->distinct(['ProductSellerData.seller_id'])->order(['ProductSellerData.updated_on'=>'DESC']);*/

                        return $q->/*where(['ProductSellerData.active'=>true])->*/contain(['Sellers'])->order(['ProductSellerData.updated_on'=>'DESC']);

                    }
                    ]

                    ])->where(['ProductsToBeTracked.active'=>true]);
            }
            ]

            ])->where(['Products.user_id'=>$user_id]);


            $failed_ids = $this->getFirstCrawlFailedIds($query);
            if(count($failed_ids) > 0){
                $query->where(["Products.id NOT IN" => $failed_ids]);
            }


        //Marketplace filter
        if(array_key_exists('marketplace_id', $queryData)){
            if(!empty($queryData['marketplace_id'])){
                $query->where(["Products.marketplace_id" => $queryData['marketplace_id']]);
            }
        }


        //Search
        if(array_key_exists('search', $queryData)){
            if(array_key_exists('field', $queryData['search']) && array_key_exists('value', $queryData['search'])){
                if(!empty($queryData['search']['field']) && !empty($queryData['search']['value'])){
                    if($queryData['search']['field'] == 'listing_id'){
                        $query->where(["Products.listing_id" => $queryData['search']['value']]);
                    }else if($queryData['search']['field'] == 'sku_code'){
                        $query->where(["Products.sku_code" => $queryData['search']['value']]);
                    }else if($queryData['search']['field'] == 'product_title'){
                        $query->where(["Products.product_title LIKE" => "%".$queryData['search']['value']."%"]);
                    }
                }
            }
        }


        //Filters
        if(array_key_exists('filters', $queryData)){

            //Status
            if(array_key_exists('status', $queryData['filters'])){
                $query->where(["Products.status" => $queryData['filters']['status']]);
            }

            //Rule
            if(array_key_exists('rules', $queryData['filters'])){
                $query->where(["Products.rule_id" => $queryData['filters']['rules']]);
            }

            //Generic Filtering

            if(array_key_exists('seller_count', $queryData['filters']) ||
                array_key_exists('price', $queryData['filters']) ||
                array_key_exists('pricing_outcome', $queryData['filters'])
            ) {
                $product_ids = $this->filterProductIds($query,$queryData['filters']);
                if(count($product_ids)>0){
                    $query->where(["Products.id IN" => $product_ids]);
                } else {
                    $query->where(["Products.id" => 'impossible']);
                }
            }
        }

        if(array_key_exists('sort', $queryData)){
          if(array_key_exists('direction', $queryData)){
            $direction = $queryData['direction'];
          }else{
            $direction = 'asc';
          }

          if($queryData['sort'] == 'mop'){
            $query->order(['Products.mop' => $direction]);
          }
          if($queryData['sort'] == 'mrp'){
            $query->order(['Products.mrp' => $direction]);
          }
        }

        if($only_counts) {
            return count($product_ids);
        } else {
            return $query;
        }


    }








public function getProduct($id){

    $product = $this->get($id, [
            'contain' => ['PricingRules','Marketplaces',

            'ProductsToBeTracked' => [
            'queryBuilder' => function ($q) {
                return $q->contain([

                    'ProductSellerData' => [
                    'queryBuilder' => function ($q) {
                        /*return $q->contain(['Sellers'])->distinct(['Sellers.seller_id'])->order(['ProductSellerData.updated_on'=>'DESC']);*/
                        return $q->contain(['Sellers'])->order(['ProductSellerData.updated_on'=>'DESC']);
                    }
                    ]

                    ])->where(['ProductsToBeTracked.active'=>true]);
            }
            ]

            ]
        ]);
        return $product;
}


    public function filterProductIds($query,$filters) {

        $ids = [];
        $is_exclude_pending = false;
        $is_seller_range_filter = isset($filters['seller_count']['max']) || isset($filters['seller_count']['min']) ? true : false;
        $is_price_range_filter = $filters['price']['min'] && $filters['price']['max'] ? true : false;
        $sellers2 = array();

        foreach($query->toArray() as $product){

            if($is_seller_range_filter) {
                $sellers = array();

            }

            foreach($product->products_to_be_tracked as $trproduct) {

                if($is_exclude_pending) {
                    if ($trproduct->listing_id == $product->listing_id && !in_array($trproduct->crawl_status, ['Pending'])) {
                        $ids['non_pending'][] = $product->id;
                    }
                }

                $filtered_seller_data = $this->filterProductSellerData($trproduct->product_seller_data);

                if($is_seller_range_filter) {
                    $seller_count = count($filtered_seller_data);
                    $sellers[] = $seller_count;
                }

                if ($filters['pricing_outcome'] && $filters['pricing_outcome'] == 'i_am_only_seller') {
                    if (count($product->products_to_be_tracked) == 1) {
                        if (count($filtered_seller_data) == 1) {
                            $ids['i_am_only_seller'][] = $product->id;
                        }
                    }
                }

                if ($filters['pricing_outcome'] && ($filters['pricing_outcome'] == 'im_cheapest' || $filters['pricing_outcome'] == 'seller_is_cheapest' )) {
                    $prices = array();
                }


                foreach ($filtered_seller_data as $seller) {


                    if($is_price_range_filter) {
                        if($seller->seller->seller_id == $product->seller_id){
                            if($seller->price >= $filters['price']['min'] && $seller->price <= $filters['price']['max']){
                                $ids['my_price'][] = $product->id;
                            }
                        }
                    }

                    if ($filters['pricing_outcome'] && ($filters['pricing_outcome'] == 'im_cheapest' || $filters['pricing_outcome'] == 'seller_is_cheapest' )) {
                        $prices[$seller->seller->seller_id] = $seller->price;
                    }

                    if ($filters['pricing_outcome'] && $filters['pricing_outcome'] == 'i_have_buy_box') {
                        if ($seller->seller->seller_id == $product->seller_id) {
                            if ($seller->buy_box) {
                                $ids['i_have_buy_box'][] = $product->id;
                            }
                        }
                    }

                    if($filters['pricing_outcome'] && $filters['pricing_outcome'] == 'is_violation'){

                        if(isset($product->mop) && $product->mop > 0) {

                            if($seller->price < $product->mop) {
                                $ids['is_violation'][] = $product->id;
                            }

                        }

                        if(isset($product->mrp) && $product->mrp > 0) {

                            if($seller->price > $product->mrp) {
                                $ids['is_violation'][] = $product->id;
                            }

                        }
                    }

                }


            }

            if($is_seller_range_filter){
                $total_sellers = array_sum($sellers);
                $sellers2['all'][$product->id] = $total_sellers;

                if($total_sellers >= $filters['seller_count']['min'] && $total_sellers <= $filters['seller_count']['max']) {
                    $ids['seller_count'][] = $product->id;
                    $sellers2['filtered'][$product->id] = $total_sellers;
                }
            }


            if ($filters['pricing_outcome'] && ($filters['pricing_outcome'] == 'im_cheapest' || $filters['pricing_outcome'] == 'seller_is_cheapest')) {

                $array_prices = array_filter(array_values($prices), function ($a) {
                    return ($a !== 0);
                });
                $cheapest = min(array_values($array_prices));

                if(array_key_exists($product->seller_id, $prices)) {
                    $myprice = $prices[$product->seller_id];
                }else{
                    $myprice = 0;
                }

                if($myprice > 0 && $filters['pricing_outcome'] == 'im_cheapest' && $myprice == $cheapest)
                {
                    $ids['im_cheapest'][] = $product->id;
                }

                if($myprice > 0 && $filters['pricing_outcome'] == 'seller_is_cheapest' && $myprice > $cheapest)
                {
                    $ids['seller_is_cheapest'][] = $product->id;
                }
            }
        }

        $final_ids = array_shift($ids);
        foreach($ids as $filter){
            $final_ids = array_intersect($final_ids, $filter);
        }

        return $final_ids;
    }



    function array_intersect_recursive() {

        foreach(func_get_args() as $arg) {
            $args[] = array_map('serialize', $arg);
        }
        $result = call_user_func_array('array_intersect', $args);
        return array_map('unserialize', $result);
    }

    public  function load_products_infile($csv) {
        try {
            $sql1 = "LOAD DATA LOCAL INFILE '{$csv}' INTO TABLE products FIELDS TERMINATED BY ',' LINES TERMINATED BY '";
            $sql2 = "' (marketplace_id, seller_id, listing_id, sku_code, product_title, product_image, min, max, rule_id, product_family, status , user_id, mop, mrp, cost_price, shipping )";
            $sql = $sql1.'\n'.$sql2;
            $connection = ConnectionManager::get('default');
            $connection->execute($sql);
            return 1;
/*            exec("MYSQL_PWD=root mysql -u root -e \"USE pricer;$sql;\"; ");*/
        } catch (Exception $e) {
            var_dump($e->getMessage());
        }
    }



    public  function load_products_to_be_tracked_infile($csv) {
        try {
            $sql1 = "LOAD DATA LOCAL INFILE '{$csv}' INTO TABLE products_to_be_tracked FIELDS TERMINATED BY ',' LINES TERMINATED BY '";
            $sql2 = "' (product_id, marketplace_id, listing_id, listing_url, upload_id, active )";
            $sql = $sql1.'\n'.$sql2;
            $connection = ConnectionManager::get('default');
            $connection->execute($sql);
            return 1;
            /*            exec("MYSQL_PWD=root mysql -u root -e \"USE pricer;$sql;\"; ");*/
        } catch (Exception $e) {
            var_dump($e->getMessage());
        }
    }


    public function check_if_product_exists($user_id,$seller_id,$marketplace_id,$listing_id) {
        $products = TableRegistry::get('Products');
        return $products->exists(['listing_id' => $listing_id, 'marketplace_id' => $marketplace_id, 'seller_id' => $seller_id, 'user_id' => $user_id]);
    }

    function multi_array_search($array, $search)
    {

        // Create the result array
        $result = array();

        // Iterate over each array element
        foreach ($array as $key => $value)
        {

            // Iterate over each search condition
            foreach ($search as $k => $v)
            {

                // If the array element does not meet the search condition then continue to the next element
                if (!isset($value[$k]) || $value[$k] != $v)
                {
                    continue 2;
                }

            }

            // Add the array element's key to the result array
            $result[] = $key;

        }

        // Return the result array
        return $result;

    }

    public function importProducts($file, $user_id, $upload_id, $importType='import', $marketplace_id = 'custom',  $seller_id = 0) {

        $log = [];
        $import_crawl_limit = 50;
        $start_time = time();
        $log[] = "file : $file | user_id : $user_id | upload_id : $upload_id | import_type : $importType | marketplace_id : $marketplace_id | seller_id : $seller_id";
        $log[] = "Excel to Array Started";
        $start = time();
        $sheetdata = $this->excelToArray($file, true, $marketplace_id ,false);
        $log[] = "Excel to Array Ended in ".(time() - $start)." seconds \n";
        $marketplace = $marketplace_id;         //Will probably reset marketplace_id in the loop so better to use another var
        $csv_products_filename = 'products-'.time().'.csv';
        $csv_products_to_be_tracked_filename = 'ptbc-'.time().'.csv';

        $path_products_csv = TMP.'uploads/product-sheets/csv/'.$csv_products_filename;
        $fh = fopen($path_products_csv, 'w') or die("can't open file");

        $log[] = "Write Products CSV Started";
        $start = time();
        $written_to_products_csv_count = 0;
        $written_to_products_to_be_tracked_csv_count = 0;

        $query = $this->query()->find('all', [
            'conditions' => ['user_id' => $user_id, 'status' => 1]
        ]);
        $count = $query->count();
        $credits_used = 0;
        $skipped = 0;
        foreach($sheetdata as $key => $product) {
                $min = $max = $mrp = $mop = $cost_price = $shipping = $rule_id = null;
                if($marketplace == 'custom') {
                    $marketplace_id = $this->getMarketplaceIdByName($product['marketplace']);
                    $listing_id = $product['listing_id'];
                    $sku_code = isset($product['sku_code']) ? $product['sku_code'] : null;
                    $seller_id = $product['marketplace_seller_id'];
                    $min = ($product['min_price'] != null) ? $product['min_price'] : null;
                    $max = ($product['max_price'] != null) ? $product['max_price'] : null;
                    $mrp = ($product['mrp'] != null) ? $product['mrp'] : null;
                    $mop = ($product['mop'] != null) ? $product['mop'] : null;
                    $shipping = ($product['shipping'] != null) ? $product['shipping'] : null;
                    $rule_id = $this->getMarketplaceDefaultRuleId($marketplace_id);

                } else if ($marketplace == 1) {
                    $listing_id = $product[0];
                    $sku_code = null;
                    $rule_id = $this->getMarketplaceDefaultRuleId($marketplace);
                } else if ($marketplace == 2) {
                    $listing_id = $product[0];
                    $sku_code = null;
                    $rule_id = $this->getMarketplaceDefaultRuleId($marketplace);
                } else if ($marketplace == 3) {
                    $listing_id = $product[0];
                    $sku_code = null;
                    $rule_id = $this->getMarketplaceDefaultRuleId($marketplace);
                } else if ($marketplace == 4) {
                    $listing_id = $product[0];
                    $sku_code = null;
                    $rule_id = $this->getMarketplaceDefaultRuleId($marketplace);
                }

                //If product does not exists for the user and seller_id, write it to CSV
                $check = $this->check_if_product_exists($user_id,$seller_id,$marketplace_id,$listing_id); //can we index and see performance - TODO
                if(!$check) {
                    $count++;
                    if($count <= $import_crawl_limit) {
                        $status = 1;
                        $credits_used++;
                    } else {
                        $status = 0;
                    }

                    $written_to_products_csv_count++;
                    fwrite($fh, implode(',',[
                            'marketplace_id'  => $marketplace_id,
                            'seller_id'  => $seller_id,
                            'listing_id'  => $listing_id,
                            'sku_code'  => $sku_code,
                            'product_title'  => NULL,
                            'product_image'  => NULL,
                            'min'  => $min,
                            'max'  => $max,
                            'rule_id'  => $rule_id,
                            'product_family'  => NULL,
                            'status'  => $status,
                            'user_id'  => $user_id,
                            'mop'  => $mop,
                            'mrp'  => $mrp,
                            'cost_price'  => $cost_price,
                            'shipping'  => $shipping,
                        ])."\n");
                } else {
                    $skipped++;
                }

                //We need to fetch the products later to get the product_id, will also get existing
                //Will need to take care of existing products_to_be_tracked since this

                $uploaded_products_to_fetch[] = [
                    'listing_id' => $listing_id,
                    'marketplace_id' => $marketplace_id,
                    'seller_id' => $seller_id,
                    'user_id' => $user_id,
                ];


                //If custom then check competing listings, we assume that competing listings can be added fresh
                if($marketplace == 'custom') {
                    if(!empty($product['competing_listing_ids'])) {
                        foreach($product['competing_listing_ids'] as $competing_listing_id) {
                            $competing_listing_ids[] = [
                                'competing_listing_id' => $competing_listing_id,
                                'listing_id' => $listing_id,
                                'marketplace_id' => $marketplace_id,
                                'user_id' => $user_id,
                                'seller_id' => $seller_id,
                            ];

                        }
                    }
                }

            }
            fclose($fh);
            $log[] = "Write Products CSV Ended in ".(time() - $start)." seconds \n";

            $log[] = "load_data_infile for Products Started";
            $start = time();
            $this->load_products_infile($path_products_csv);
            $log[] = "load_data_infile for Products Ended in ".(time() - $start)." seconds : ".$path_products_csv;

            /*
            * Need to get product id somehow here - How?
            *
            * Save one csv ie products and then query by sellers_id,marketplace_id,user_id,listing_id
            * We can maintain listing_ids and the assign that sh** and import the csv
            *
            */
            $log[] = "Fetch uploaded products Started";
            $start = time();
            $get_uploaded_products = [];
            if(!empty($uploaded_products_to_fetch)) {
                $get_uploaded_products_sql = 'select id as product_id, status, listing_id, marketplace_id, seller_id, user_id from products where ';
                $uploaded_products_to_fetch_last_key = key( array_slice( $uploaded_products_to_fetch, -1, 1, TRUE ) );
                foreach($uploaded_products_to_fetch as $key => $uploaded_product) {

                    $uploaded_product_last_key = key( array_slice( $uploaded_product, -1, 1, TRUE ) );
                    $get_uploaded_products_sql .= '(';
                    foreach($uploaded_product as $k => $v) {
                        $get_uploaded_products_sql .= $k.' = "'.$v.'"';
                        if($k != $uploaded_product_last_key) {
                            $get_uploaded_products_sql .= ' AND ';
                        }
                    }
                    $get_uploaded_products_sql .= ')';
                    if($key != $uploaded_products_to_fetch_last_key) {
                        $get_uploaded_products_sql .= 'OR';
                    }
                }
#            print "\n\n\n\n".$get_uploaded_products_sql."\n\n\n\n";

                $connection = ConnectionManager::get('default');
                $get_uploaded_products = $connection->execute($get_uploaded_products_sql)->fetchAll('assoc');
#            print_r($get_uploaded_products);
                $log[] = "uploaded_products_to_fetch ".count($uploaded_products_to_fetch);
                $log[] = "get_uploaded_products ".count($get_uploaded_products);
                $log[] = "written_to_products_csv_count ".$written_to_products_csv_count;
            }

            $log[] = "Fetch uploaded products Ended in ".(time() - $start)." seconds";

            $get_competing_listings = [];
            if(!empty($competing_listing_ids)) {
                foreach ($get_uploaded_products as $product) {
                    $product_array = $product;
                    unset($product['product_id']);
                    unset($product['status']);
                    $get_uploaded_products_cl_checker[implode('|',$product)] = $product_array;
                }
                foreach($competing_listing_ids as $competing_listing_id) {
                    $get_competing_listing = [];
                    $get_competing_listing['listing_id'] = $competing_listing_id['competing_listing_id'];
                    $get_competing_listing['marketplace_id'] = $competing_listing_id['marketplace_id'];
                    $search_array = implode('|',array(
                        "listing_id" => $competing_listing_id['listing_id'],
                        "marketplace_id" =>  $competing_listing_id['marketplace_id'],
                        "seller_id" =>  $competing_listing_id['seller_id'],
                        "user_id" =>  $competing_listing_id['user_id']
                    ));
                    $product_id_array = $get_uploaded_products_cl_checker[$search_array];
                    $get_competing_listing['product_id'] = $product_id_array['product_id'];
                    $get_competing_listing['status'] = $product_id_array['status'];
                    $get_competing_listings[] = $get_competing_listing;
                }
            }

            $products_to_be_tracked = array_merge($get_uploaded_products,$get_competing_listings);
            $log[] = "Fetch uploaded products + products_to_be_tracked array value assignment Ended in ".(time() - $start)." seconds";


            $path_products_to_be_tracked_csv = TMP.'uploads/product-sheets/csv/'.$csv_products_to_be_tracked_filename;
            $fh = fopen($path_products_to_be_tracked_csv, 'w') or die("can't open file");

            $log[] = "products_to_be_tracked ".count($products_to_be_tracked);

            $log[] = "Write products_to_be_tracked csv Started";
            $start = time();
            foreach($products_to_be_tracked as $product_to_be_tracked) {
                //We check if the product exists, just for safe measures
                $toBeTrackedTable = TableRegistry::get('ProductsToBeTracked');
                $trackexists = $toBeTrackedTable->exists([
                    'product_id' => $product_to_be_tracked['product_id'],
                    'marketplace_id' => $product_to_be_tracked['marketplace_id'],
                    'listing_id' => $product_to_be_tracked['listing_id']
                ]);
                if($trackexists){
                    continue; //Get out of this loop..
                }

                fwrite($fh, implode(',',[
                        'product_id' => $product_to_be_tracked['product_id'],
                        'marketplace_id' => $product_to_be_tracked['marketplace_id'],
                        'listing_id' => $product_to_be_tracked['listing_id'],
                        'listing_url' => $this->generateListingUrl($product_to_be_tracked['listing_id'],$product_to_be_tracked['marketplace_id']),
                        'upload_id' => $upload_id,
                        'active' => $product_to_be_tracked['status'],
                    ])."\n");
                $written_to_products_to_be_tracked_csv_count++;

            }
            fclose($fh);
            $log[] = "written_to_products_to_be_tracked_csv_count ".$written_to_products_to_be_tracked_csv_count;
            $log[] = "Write products_to_be_tracked csv Ended in ".(time() - $start)." seconds";

            $log[] = "load_data_infile for Products To be tracked Started";
            $start = time();
            $this->load_products_to_be_tracked_infile($path_products_to_be_tracked_csv);
            $log[] = "load_data_infile for Products To be tracked Ended in ".(time() - $start)." seconds : ".$path_products_to_be_tracked_csv;


            if($importType == 'import') {
                $uploads = TableRegistry::get('Uploads');
                $savedProducts = array_column($get_uploaded_products,'product_id');
                $log[] = "Finished everything in ".(time() - $start_time)." seconds";
                print_r($log);

                if($credits_used > 0) {
                    $upload_status = 'Crawling';
                } else {
                    $upload_status = 'Processed';
                    $savedProducts = [];
                }

                $details = [];
                $details['product_ids'] = $savedProducts;
                $details['import_log'] = $log;
                $details['count_sheet_data'] = count($sheetdata);
                $details['credits_used'] = $credits_used;
                $details['skipped'] = $skipped;
                $uploads->updateUploadProduct_Ids($upload_id, $details, $upload_status, $credits_used);
            }

            unlink($path_products_csv);
            unlink($path_products_to_be_tracked_csv);
            return $savedProducts;
    }
    /*

    public function importProducts($file,$filename,$user_id,$importType='import',$upload_id){
            $uploads = TableRegistry::get('Uploads');

            $sheetdata = $this->excelToArray($file);
            $products = $this->generateProductsData($sheetdata,$user_id);
            // debug($products);

            try {
                $savedProducts = $this->saveProductsData($products,$user_id);

                //return false;
                //unlink($file);
                //return $savedProducts;
            } catch(\Exception $e) {
                return false;
            }

            if($importType=='import' && count($savedProducts)>0){
              $uploads->updateUploadProduct_Ids($upload_id,$savedProducts);
              $toBeTracked = TableRegistry::get('ProductsToBeTracked');
              $toBeTracked->updateUploadId($upload_id,$savedProducts);
            }

            return $savedProducts;
    }


    public function importFlipkartProducts($file,$filename,$user_id,$sellerId,$upload_id){
        $uploads = TableRegistry::get('Uploads');

        $sheetdata = $this->excelToArray($file,1,2);

        $products = $this->generateFlipkartProductsData($sheetdata,$user_id,$sellerId);

        $result = false;
        $savedProducts = [];

        try {
            $savedProducts = $this->saveFlipkartProductsData($products,$user_id);

            //return false;
            //unlink($file);
            //return $savedProducts;
        } catch(\Exception $e) {
            return false;
        }

        if(count($savedProducts)>0){
            $uploads->updateUploadProduct_Ids($upload_id,$savedProducts);
            $toBeTracked = TableRegistry::get('ProductsToBeTracked');
            $toBeTracked->updateUploadId($upload_id,$savedProducts);
        }

        return $savedProducts;

        //return true;
    }



    public function importAmazonProducts($file,$filename,$user_id,$sellerId,$upload_id) {
        $uploads = TableRegistry::get('Uploads');

        $sheetdata = $this->excelToArray($file,true,1);
        $products = $this->generateAmazonProductsData($sheetdata,$user_id,$sellerId);

        $result = false;
        $savedProducts = [];

        try {
            $savedProducts = $this->saveAmazonProductsData($products,$user_id);

            //return false;
            //unlink($file);
            //return $savedProducts;
        } catch(\Exception $e) {
            return false;
        }

        if(count($savedProducts)>0){
            $uploads->updateUploadProduct_Ids($upload_id,$savedProducts);
            $toBeTracked = TableRegistry::get('ProductsToBeTracked');
            $toBeTracked->updateUploadId($upload_id,$savedProducts);
        }

        return $savedProducts;

        //return true;
    }*/


    public function validateImportSheet($sheetdata){

            //$sheetdata = $this->excelToArray($file);
            $allowed_marketplace = array('Amazon','Flipkart','Snapdeal','Paytm');
            $errors = array();
            foreach($sheetdata as $row=>$product){
                $row_error = array();

                if(empty($product['marketplace'])){
                    $row_error[] = 'Marketplace is missing';
                }


                if(!empty($product['marketplace'])){
                    if(!in_array($product['marketplace'], $allowed_marketplace)){
                        $row_error[] = 'Invalid Marketplace '.$product['marketplace'];
                    }
                }


                if(empty($product['marketplace_seller_id'])){
                    $row_error[] = 'Marketplace seller id missing';
                }

                // if(empty($product['min_price'])){
                //     $row_error[] = 'Min price missing';
                // }
                //
                // if(empty($product['max_price'])){
                //     $row_error[] = 'Max price missing';
                // }

                if(!empty($product['min_price'])){
                    if(!is_numeric($product['min_price'])){
                        $row_error[] = 'Invalid min price';
                    }
                }

                if(!empty($product['max_price'])){
                    if(!is_numeric($product['max_price'])){
                        $row_error[] = 'Invalid max price';
                    }
                }

                if(!empty($product['min_price']) && !empty($product['max_price'])){
                    if(is_numeric($product['min_price']) && is_numeric($product['max_price'])){
                        if($product['min_price'] > $product['max_price']){
                            $row_error[] = 'Min price is greater than Max price';
                        }
                    }
                }

                // if(empty($product['mrp'])){
                //     $row_error[] = 'MRP is missing';
                // }
                //
                // if(empty($product['mop'])){
                //     $row_error[] = 'MOP is missing';
                // }

                if(!empty($product['mrp'])){
                    if(!is_numeric($product['mrp'])){
                        $row_error[] = 'Invalid MRP';
                    }
                }

                if(!empty($product['mop'])){
                    if(!is_numeric($product['mop'])){
                        $row_error[] = 'Invalid MOP';
                    }
                }

                if(!empty($product['mrp']) && !empty($product['mop'])){
                    if(is_numeric($product['mrp']) && is_numeric($product['mop'])){
                        if($product['mrp'] < $product['mop']){
                            $row_error[] = 'MOP is greater than MRP!';
                        }
                    }
                }

                if(!empty($product['cost_price'])){
                    if(!is_numeric($product['cost_price'])){
                        $row_error[] = 'Invalid Cost Price!';
                    }
                }

                if(!empty($product['shipping'])){
                    if(!is_numeric($product['shipping'])){
                        $row_error[] = 'Invalid Shipping!';
                    }
                }

                if(count($row_error)>0){
                    $errors[] = array(
                    'row'=>$row+1,
                    'error'=>implode(', ', $row_error)
                    );
                }


            }
            return $errors;
    }


    public function generateProductsData($data,$user_id){
        $products = array();
        foreach($data as $product){
            $marketplace_id = $this->getMarketplaceIdByName($product['marketplace']);
            $pdata = array(
                'marketplace_id'=>$marketplace_id,
                'seller_id'=>$product['marketplace_seller_id'],
                'listing_id'=>$product['listing_id'],
                'sku_code'=>$product['sku_code'],
                'min'=>$product['min_price'],
                'max'=>$product['max_price'],
                'mrp'=>$product['mrp'],
                'mop'=>$product['mop'],
                'cost_price'=>($product['cost_price'] != null) ? $product['cost_price'] : null,
                'shipping'=>($product['shipping'] != null) ? $product['shipping'] : null,
                'listings'=>$product['competing_listing_ids'],
                'rule_id'=>$this->getMarketplaceDefaultRuleId($marketplace_id),
                'product_family'=>null,
                'status'=>1,
                'user_id'=>$user_id,
                'created_at'=>Time::now()
                );
            array_unshift($pdata['listings'], $product['listing_id']);

            $products[] = $pdata;
        }
        return $products;
    }

    public function generateFlipkartProductsData($data,$user_id,$sellerId){
        $products = array();
        foreach($data as $product){
            $marketplace_id = $this->getMarketplaceIdByName('Flipkart');
            $pdata = array(
                'marketplace_id'=>$marketplace_id,
                'seller_id'=>$sellerId,
                'listing_id'=>$product['Flipkart Serial Number'],
                'listing_url'=>$product['Flipkart Product Link'],
                'rule_id'=>$this->getMarketplaceDefaultRuleId($marketplace_id),
                'product_family'=>null,
                'status'=>1,
                'user_id'=>$user_id,
                'created_at'=>Time::now()
                );

            $products[] = $pdata;
        }
        return $products;
    }

    public function generateAmazonProductsData($data,$user_id,$sellerId) {
        $products = array();
        foreach($data as $product){
            $marketplace_id = $this->getMarketplaceIdByName('Amazon');
            $pdata = array(
                'marketplace_id'=>$marketplace_id,
                'seller_id'=>$sellerId,
                'listing_id'=>$product['asin1'],
#                'listing_url'=>$product['Flipkart Product Link'],
                'rule_id'=>$this->getMarketplaceDefaultRuleId($marketplace_id),
                'product_family'=>null,
                'status'=>1,
                'user_id'=>$user_id,
                'created_at'=>Time::now()
            );

            $products[] = $pdata;
        }
        return $products;
    }



    public function getMarketplaceIdByName($marketplace_name){
        $marketplacesTable = TableRegistry::get('Marketplaces');
        $marketplace = $marketplacesTable->find()->where(['title'=>$marketplace_name])->first();
        return $marketplace->id;
    }


    public function getMarketplaceDefaultRuleId($marketplace_id){
        $rulesTable = TableRegistry::get('PricingRules');
        $rule = $rulesTable->find()->where(['channel_id'=>$marketplace_id])->first();
        return $rule->id;
    }




    public function saveProductsData($products,$user_id){
        $i_product_ids = array();
        foreach($products as $prdata){

          //$prdata['dirty'] = null;

            $exists = $this->exists(['user_id'=>$user_id, 'seller_id' => $prdata['seller_id'], 'marketplace_id' => $prdata['marketplace_id'], 'listing_id' => $prdata['listing_id']]);
            if($exists){
                continue;
            }

            $listing_ids = $prdata['listings'];
            unset($prdata['listings']);
            $prodEntity = $this->newEntity();
            $prod = $this->patchEntity($prodEntity,$prdata);
            //$prod->dirty = NULL;
            $sprod = $this->save($prod);

            $i_product_ids[] = $sprod->id;

            foreach($listing_ids as $key=>$value){
                $value = trim($value);

                $toBeTrackedTable = TableRegistry::get('ProductsToBeTracked');

                $trackexists = $toBeTrackedTable->exists(['product_id' => $sprod->id, 'marketplace_id' => $prdata['marketplace_id'], 'listing_id' => $value]);
                if($trackexists){
                    continue;
                }

                $tracked = array(
                    'product_id'=>$sprod->id,
                    'marketplace_id'=>$prdata['marketplace_id'],
                    'listing_id'=>$value,
                    'listing_url'=>$this->generateListingUrl($value,$prdata['marketplace_id']),
                    'created_at'=>Time::now(),
                    'is_competition' => false
                    );
                $toBeTrackedTable->saveTrackableProduct($tracked);
            }

        }
        return $i_product_ids;
    }


    public function saveFlipkartProductsData($products,$user_id){
        $i_product_ids = array();
        foreach($products as $prdata){

            $exists = $this->exists(['user_id'=>$user_id,  'marketplace_id' => $prdata['marketplace_id'], 'seller_id' => $prdata['seller_id'], 'listing_id' => $prdata['listing_id']]); //
            if($exists){
                continue;
            }

            $listing_url = $prdata['listing_url'];
            unset($prdata['listing_url']);
            $prodEntity = $this->newEntity();
            $prod = $this->patchEntity($prodEntity,$prdata);
            //$prod->dirty = NULL;
            $sprod = $this->save($prod);

            $i_product_ids[] = $sprod->id;

            $toBeTrackedTable = TableRegistry::get('ProductsToBeTracked');

            $trackexists = $toBeTrackedTable->exists(['product_id' => $sprod->id, 'marketplace_id' => $prdata['marketplace_id'], 'listing_id' => $prdata['listing_id']]);
            if($trackexists){
                continue;
            }

            $tracked = array(
                'product_id'=>$sprod->id,
                'marketplace_id'=>$prdata['marketplace_id'],
                'listing_id'=>$prdata['listing_id'],
                'listing_url' => $this->generateListingUrl($prdata['listing_id'],$prdata['marketplace_id']),
                'created_at'=>Time::now(),
                'is_competition' => false
                );

            $toBeTrackedTable->saveTrackableProduct($tracked);


        }
         return $i_product_ids;
    }

    public function saveAmazonProductsData($products,$user_id){
        $i_product_ids = array();

        foreach($products as $prdata){

          //$prdata['dirty'] = null;

            $exists = $this->exists(['user_id'=>$user_id,  'marketplace_id' => $prdata['marketplace_id'], 'seller_id' => $prdata['seller_id'], 'listing_id' => $prdata['listing_id']]); //
            if($exists){
                continue;
            }

            $prodEntity = $this->newEntity();
            $prod = $this->patchEntity($prodEntity,$prdata);
            //$prod->dirty = NULL;
            $sprod = $this->save($prod);

            $i_product_ids[] = $sprod->id;

            $toBeTrackedTable = TableRegistry::get('ProductsToBeTracked');

            $trackexists = $toBeTrackedTable->exists(['product_id' => $sprod->id, 'marketplace_id' => $prdata['marketplace_id'], 'listing_id' => $prdata['listing_id']]);
            if($trackexists){
                continue;
            }

            $tracked = array(
                'product_id'=>$sprod->id,
                'marketplace_id'=>$prdata['marketplace_id'],
                'listing_id'=>$prdata['listing_id'],
                'listing_url' => $this->generateListingUrl($prdata['listing_id'],$prdata['marketplace_id']),
                'created_at'=>Time::now(),
                'is_competition' => false
            );

            $toBeTrackedTable->saveTrackableProduct($tracked);


        }
        return $i_product_ids;
    }


    public function generateListingUrl($listing_id,$marketplace_id){
        if($marketplace_id == 1){
            $url = 'http://www.amazon.in/dp/'.$listing_id;
        }else if($marketplace_id == 2){
            $url = 'https://www.flipkart.com/item/'.$listing_id;
        }else if($marketplace_id == 3){
            $url = 'https://www.snapdeal.com/search?keyword='.$listing_id;
        }else if($marketplace_id == 4){
            $url = 'https://paytm.com/shop/search?q='.$listing_id;
        }
        return $url;
    }


    // public function getTypeOfSheetUploaded($filePath){
    //   //Create excel reader after determining the file type
    //     $inputFileName = $filePath;
    //     /**  Identify the type of $inputFileName  **/
    //     $inputFileType = PHPExcel_IOFactory::identify($inputFileName);
    //     /**  Create a new Reader of the type that has been identified  **/
    //     $objReader = PHPExcel_IOFactory::createReader($inputFileType);
    //     /** Set read type to read cell data onl **/
    //     $objReader->setReadDataOnly(true);
    //     /**  Load $inputFileName to a PHPExcel Object  **/
    //     $objPHPExcel = $objReader->load($inputFileName);
    //     //Get worksheet and built array with first row as header
    //     $objWorksheet = $objPHPExcel->getActiveSheet();

    //     $sheets = [];
    //     foreach ($objPHPExcel->getAllSheets() as $sheet) {
    //       debug($sheet);
    //         $sheets[] = $sheet->getTitle();
    //     }
    //     dd($sheets);
    //     exit;
    //     $highestRow = $objWorksheet->getHighestRow();
    //     $highestColumn = $objWorksheet->getHighestColumn();
    //     $headingsArray = $objWorksheet->rangeToArray('A1:'.$highestColumn.'1',null, true, true, true);dd($headingsArray);
    //     $headingsArray = $headingsArray[1];

    //     return  true;

    // }

    public function excelToArray($filePath, $header=true, $marketplace = 'custom', $validate_only = true)
    {
        //Create excel reader after determining the file type
        $inputFileName = $filePath;
        /**  Identify the type of $inputFileName  **/
        $inputFileType = PHPExcel_IOFactory::identify($inputFileName);

        if($inputFileType == 'HTML') {
            $inputFileType = 'CSV';
            $fh = fopen($filePath,'r');
            $delimiters = ["\t", ";", "|", ","];
            $data_1 = null; $data_2 = null;
            $delimiter = $delimiters[0];
            foreach($delimiters as $d) {
                $data_1 = fgetcsv($fh, 4096, $d);
                if(sizeof($data_1) > sizeof($data_2)) {
                    $delimiter = sizeof($data_1) > sizeof($data_2) ? $d : $delimiter;
                    $data_2 = $data_1;
                }
                rewind($fh);
            }
        }

        /**  Create a new Reader of the type that has been identified  **/
        $objReader = PHPExcel_IOFactory::createReader($inputFileType);

        if($inputFileType == 'CSV') {
            $objReader->setDelimiter($delimiter);
        }
        /** Set read type to read cell data onl **/
        $objReader->setReadDataOnly(true);
        /**  Load $inputFileName to a PHPExcel Object  **/
        $objPHPExcel = $objReader->load($inputFileName);
        //Get worksheet and built array with first row as header
        if ($marketplace == 2) {
            $sheetCount = $objPHPExcel->getSheetCount();

            $rowStart = 3;
            if ($sheetCount == 5) {
                $objPHPExcel->setActiveSheetIndex(2);
                $rowStart = 5;
            }
        } else {
            $rowStart = 2;
        }

        $objWorksheet = $objPHPExcel->getActiveSheet();



        //Validation
        $errors = array();

        if($validate_only) {
            if($marketplace == 2) {

                $namedDataArray = $objWorksheet->rangeToArray('A1:'.$objWorksheet->getHighestColumn().'1');
                if($namedDataArray[0][0] != 'Flipkart Serial Number'){
                    $errors[] =  'First column `Flipkart Serial Number` is missing';
                    if(!empty($errors)) {
                        return [
                            'success' => false,
                            'errors' => $errors,
                        ];
                    }
                }
                if($objWorksheet->getHighestRow() < $rowStart) {
                    $errors[] =  'Sheet is empty';
                    if(!empty($errors)) {
                        return [
                            'success' => false,
                            'errors' => $errors,
                        ];
                    }
                }
            } else if($marketplace == 1) {

                $namedDataArray = $objWorksheet->rangeToArray('A1:'.$objWorksheet->getHighestColumn().'1');
                if($namedDataArray[0][16] != 'asin1'){
                    $errors[] =  'ASIN Missing for sheet at Col 17';
                    if(!empty($errors)) {
                        return [
                            'success' => false,
                            'errors' => $errors,
                        ];
                    }
                }
                if($objWorksheet->getHighestRow() < $rowStart) {
                    $errors[] =  'Sheet is empty';
                    if(!empty($errors)) {
                        return [
                            'success' => false,
                            'errors' => $errors,
                        ];
                    }
                }
            }

        }
        //excel with first row header, use header as key
        if ($header) {

            if($marketplace == 'custom')
            {
                $listing_ids_count = 0;
                $highestRow = $objWorksheet->getHighestRow();
                $highestColumn = $objWorksheet->getHighestColumn();
                $headingsArray = $objWorksheet->rangeToArray('A1:' . $highestColumn . '1', null, true, true, true);
                $headingsArray = $headingsArray[1];
                $r = -1;
                $namedDataArray = array();
                for ($row = $rowStart; $row <= $highestRow; ++$row) {
                    $dataRow = $objWorksheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, null, true, true, true);
                    if ((isset($dataRow[$row]['A'])) && ($dataRow[$row]['A'] > '')) {
                        ++$r;
                        $listing_ids_count++;
                        foreach ($headingsArray as $columnKey => $columnHeading) {
                            //if (strpos($dataRow[$row][$columnKey], ',') !== false) {
                            if ($columnHeading == 'competing_listing_ids') {
                                $listing_ids = explode(',', $dataRow[$row][$columnKey]);
                                $listing_ids = array_map('trim', $listing_ids);
                                $listing_ids = array_filter($listing_ids);
                                $namedDataArray[$r][$columnHeading] = $listing_ids;
                                $listing_ids_count = $listing_ids_count + count($listing_ids);
                            } else {
                                $namedDataArray[$r][$columnHeading] = $dataRow[$row][$columnKey];
                            }
                        }
                    }
                }
                //Validation
                if($validate_only) {
                    $errors = $this->validateImportSheet($namedDataArray);
                    if(!empty($errors)) {
                        return [
                            'success' => false,
                            'errors' => $errors,
                        ];
                    }
                }
            } else {

                    if($marketplace == 1 && $validate_only == false) {
                        $namedDataArray = $objWorksheet->rangeToArray('Q'.$rowStart.':Q'.$objWorksheet->getHighestRow());
                    } else if($marketplace == 2 && $validate_only == false) {
                        $namedDataArray = $objWorksheet->rangeToArray('A'.$rowStart.':A'.$objWorksheet->getHighestRow());
                    }
            }
        }

        if($validate_only) {
            if(empty($errors)) {
                return [
                    'row_count' => $objWorksheet->getHighestRow() - ($rowStart - 1),
                    'listing_ids_count' => isset($listing_ids_count) ? $listing_ids_count : $objWorksheet->getHighestRow() - ($rowStart - 1),
                    'success' => true,
                    'errors' => $errors,
                ];
            }
            return [
                'success' => false,
                'errors' => $errors,
            ];
        }
        return $namedDataArray;
    }

public function generateProductData($product,$includesellers = true){
        $product_data = array();


            $market_min = $this->getMarketMinPrice($product->products_to_be_tracked);
            $market_max = $this->getMarketMaxPrice($product->products_to_be_tracked);
            $buy_box_price = $this->getBuyBoxPrice($product->products_to_be_tracked,$product->id);
            $tracked_seller_count = $this->getTrackedSellerCount($product->products_to_be_tracked);
            $tracked_products_count = count($product->products_to_be_tracked);
            $in_stock = $this->checkIfInStock($product);



            if($includesellers){
              $seller_data = $this->getSellersData($product->products_to_be_tracked,$product->mop,$product->mrp,$product->seller_id);
            }

            $my_data = $this->getMyData($product->products_to_be_tracked,$product->seller_id);

            $my_price = $my_data['my_price'];

            $is_buy_box = $my_data['buy_box'];

            $sold_by_me = $my_data['sold_by_me'];

            if($my_price != "N/A"){
              $is_min = ($my_price <= $market_min) ? 'yes' : 'no';
            }else{
              $is_min = 'no';
            }


            $product_data['tracking_group_id'] = $product->id;

            $product_data['channel_details'] = array(
                'channel_id'=>$product->marketplace_id,
                'channel_name'=>$product->marketplace->title,
                'listing_id'=>$product->listing_id
                );

            $product_data['product_details'] = array(
                'id'=>$product->id,
                'created_on'=>Time::parse($product->created_at)->nice(),
                'product_name'=>$product->product_title,
                'product_image_url'=>$product->product_image,
                'product_url'=>(count($product->products_to_be_tracked)>0) ? $product->products_to_be_tracked[0]->listing_url : '',
                'sku_code' => $product->sku_code,
                'sales_rank' => null,
                'mop' => $product->mop,
                'mrp' => $product->mrp,
                'cp' => $product->cost_price,
                'shipping' => $product->shipping,
                'in_stock' => $in_stock,
                'sold_by_me' => (!$in_stock) ? true : $sold_by_me
                );

            $product_data['repricing'] = array(
                "rule_id" => $product->rule_id,
                "rule_name" => $product->pricing_rule->title,
                "my_min" => $product->min,
                "my_max" => $product->max,
                "my_price" => $my_price,
                "market_min" => $market_min,
                "market_max" => $market_max,
                "buy_box_price" => $buy_box_price,
                "is_min" => $is_min,
                "is_buy_box" => $is_buy_box,
                'last_tracked_on'=>(count($product->products_to_be_tracked)>0) ? Time::parse($product->products_to_be_tracked[0]->last_updated)->nice() : '',
                "tracked_listings" => $this->getTrackedListingIds($product),
                "tracked_sellers_count" => $tracked_seller_count,
                "tracked_products_count" => $tracked_products_count,
                //"violated" => (($my_price < $product->mop) || ($my_price > $product->mrp)) ? true : false
                );

                if($my_price != "N/A"){
                  $product_data['repricing']['violated'] = (($my_price < $product->mop) || ($my_price > $product->mrp)) ? true : false;
                }else{
                  $product_data['repricing']['violated'] = false;
                }

                if($product_data['repricing']['violated']){
                  $product_data['repricing']['violation_type'] = ($my_price < $product->mop) ? 'MOP Violation' : 'MRP Violation';
                }

            if($includesellers){
              $product_data['sellers'] = $seller_data;
            }

            return $product_data;
    }




    public function filterProductSellerData($seller_data){
        $sellers = array();
        foreach($seller_data as $sel_data){
            if(!array_key_exists($sel_data->seller_id, $sellers)){
                $sellers[$sel_data->seller_id] = $sel_data;
            }
        }
        return array_filter($sellers);
    }


    public function checkIfInStock($product){
      $inStock = true;
      foreach($product->products_to_be_tracked as $trackable){
        if($trackable->listing_id == $product->listing_id){
          if(!$trackable->is_stock){
            $inStock = false;
          }
        }
      }
      return $inStock;
    }


    public function getTrackedSellerCount($trackableProducts){
        $sellers = array();
        foreach($trackableProducts as $product){

            $filtered_seller_data = $this->filterProductSellerData($product->product_seller_data);

            //$seller_count = count($product->product_seller_data);
            $seller_count = count($filtered_seller_data);
            $sellers[] = $seller_count;
        }
        return array_sum($sellers);
    }



    public function getTrackedListingIds($product){
        $listing_id = $product->listing_id;
        $listing_ids = array();
        foreach($product->products_to_be_tracked as $track_product){
            if(trim($track_product->listing_id) !== trim($listing_id)){
                $listing_ids[] = $track_product->listing_id;
            }
        }
        return implode(', ', $listing_ids);
    }



    public function getMarketMinPrice($trackableProducts){
        $prices_data = $this->pricesData($trackableProducts);
        if(count($prices_data)>0){
            return min($prices_data);
        }else{
            return 0;
        }
    }

    public function getMarketMaxPrice($trackableProducts){
        $prices_data = $this->pricesData($trackableProducts);
        if(count($prices_data)>0){
            return max($prices_data);
        }else{
            return 0;
        }
    }

    public function getBuyBoxPrice($trackableProducts,$product_id){
         foreach($trackableProducts as $product){
            if($product->product_id !== $product_id){
                continue;
            }

            $filtered_seller_data = $this->filterProductSellerData($product->product_seller_data);
            foreach($filtered_seller_data as $seller){
                if($seller->buy_box){
                    return $seller->price;
                }
            }
         }
         return null;
    }


    public function pricesData($trackableProducts){
        $prices = array();

        foreach($trackableProducts as $product){

            $filtered_seller_data = $this->filterProductSellerData($product->product_seller_data);

            //foreach($product->product_seller_data as $seller){
            foreach($filtered_seller_data as $seller){
                $prices[] = $seller->price;
            }
        }
        return array_unique($prices);
    }




    public function getSellersData($trackableProducts,$min,$max,$seller_id){
        $sellers = array();
        $market_min = $this->getMarketMinPrice($trackableProducts);
        $productSellerTable = TableRegistry::get('ProductSellerData');
        foreach($trackableProducts as $product){

            $filtered_seller_data = $this->filterProductSellerData($product->product_seller_data);

            //foreach($product->product_seller_data as $seller){
            foreach($filtered_seller_data as $seller){

              $oldest_data = $productSellerTable->find()->where(['product_id'=>$product->id,'seller_id'=>$seller->seller->id])->order(['id'=>'asc'])->first();

                $seller_data = array(
                "is_current_seller" => ($seller->seller->seller_id == $seller_id) ? true : false,
                "seller" => $seller->seller->seller_name,
                "rating" => $seller->rating,
                "rating_count" => $seller->rating_count,
                "listing_id" => $product->listing_id,
                "product_title"=>$product->product_title,
                "listing_url"=>$product->listing_url,
                "product_image"=>$product->product_image,
                "tracked_since" => Time::parse($oldest_data->updated_on)->nice(),
                "stockouts_count" => $seller->stockouts,
                "is_stocked_out" => ($seller->active) ? false : true,
                "buy_box_ownership" => $seller->buy_box_ownership,
                "status" => 1,
                "marketplace_id" => $product->marketplace_id,
                "marketplace_title" => $product->marketplace->title,
                "seller_url" => $seller->seller->seller_url,
                "price" => $seller->price,
                "lowest" => ($seller->price <= $market_min) ? 'yes' : 'no',
                "buy_box" => ($seller->buy_box) ? 'yes' : 'no',
                "violated" => (($seller->price < $min) || ($seller->price > $max)) ? true : false,
                "updated_on" => date('d-m-Y',strtotime($seller->updated_on))
                );

                if($seller_data['violated']){
                  $seller_data['violation_type'] = ($seller->price < $min) ? 'MOP Violation' : 'MRP Violation';
                }

                $sellers[] = $seller_data;
            }
        }

        usort($sellers, function($a, $b)
        {
            return strcmp($b['buy_box'], $a['buy_box']);
        });

        return $sellers;
    }


    public function getMyData($products_to_be_tracked, $seller_id){
        $data = array(
            'my_price'=> 'N/A',
            'buy_box' => 'no',
            'sold_by_me' => false
            );

        foreach($products_to_be_tracked as $product){

            $filtered_seller_data = $this->filterProductSellerData($product->product_seller_data);

            //foreach($product->product_seller_data as $seller){
            foreach($filtered_seller_data as $seller){
                if($seller->seller->seller_id == $seller_id){
                    $data['my_price'] = $seller->price;
                    $data['sold_by_me'] = true;
                    $data['buy_box'] = ($seller->buy_box) ? 'yes' : 'no';
                    return $data;
                }
            }
        }
        return $data;
    }





    public function generateExcel($postData,$user_id){
        $objPHPExcel = new PHPExcel();
        $objPHPExcel->setActiveSheetIndex(0);
        $data = $this->generateProductsDataForExcel($postData,$user_id);
        $sheet = $objPHPExcel->getActiveSheet();
        $sheet->fromArray($data, null, 'A1');


        if($postData['file_type'] == 'xlsx'){

            //Auto Column Width
            $cellIterator = $sheet->getRowIterator()->current()->getCellIterator();
            $cellIterator->setIterateOnlyExistingCells( true );
            foreach( $cellIterator as $cell ) {
                $sheet->getColumnDimension( $cell->getColumn() )->setAutoSize( true );
            }


            /*=====STYLES AND FORMATTING=====*/
            //Make Header Bold
            $sheet->getStyle('1:1')->getFont()->setBold(true);

            //Change header font color
            $colorObj = new PHPExcel_Style_Color();
            $sheet->getStyle('1:1')
            ->getFont()->setColor($colorObj->setRGB('f2f3f4'));

            //Change header background
            $sheet->getStyle('1:1')
            ->getFill()
            ->setFillType(PHPExcel_Style_Fill::FILL_SOLID)
            ->getStartColor()
            ->setARGB('FF808080');



            if(array_key_exists('is_empty', $postData)){
                //Freeze Top Row and left-most 2 columns
                $sheet->freezePane('D2');


                for ($i = 2; $i <= 50; $i++) {
                    $objValidation2 = $sheet->getCell('B'.$i)->getDataValidation();
                    $objValidation2 -> setType(PHPExcel_Cell_DataValidation::TYPE_LIST);
                    $objValidation2 -> setErrorStyle(PHPExcel_Cell_DataValidation::STYLE_INFORMATION);
                    $objValidation2 -> setAllowBlank(true);
                    $objValidation2 -> setShowInputMessage(true);
                    $objValidation2 -> setShowErrorMessage(true);
                    $objValidation2 -> setShowDropDown(true);
                    $objValidation2 -> setErrorTitle('Invalid Marketplace');
                    $objValidation2 -> setError('Marketplace is not in list.');
                    $objValidation2 -> setPromptTitle('Select Marketplace');
                    $objValidation2 -> setPrompt('Please pick a marketplace from the drop-down list.');
                    $marketplaces = '"Amazon, Flipkart, Snapdeal, Paytm"';
                    $objValidation2 -> setFormula1($marketplaces);
                }



            }else{
                //Freeze Top Row and left-most 2 columns
                if(array_key_exists('is_competing', $postData)){
                  $sheet->freezePane('D2');
                }else{
                  $sheet->freezePane('C2');
                }

            }
            /*=====END OF STYLES AND FORMATTING=====*/
        }




        if($postData['file_type'] == 'csv'){
            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'CSV');
            $objWriter->setSheetIndex(0);
            $objWriter->setDelimiter(';');
        }else{
            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        }

        ob_start();
        $objWriter->save("php://output");
        $xlsData = ob_get_contents();
        ob_end_clean();

        //debug($xlsData);

        if($postData['file_type'] == 'csv'){
            $mime_type = 'application/csv;charset=UTF-8';
        }else{
            $mime_type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        }
        //return "data:application/vnd.ms-excel;base64,".base64_encode($xlsData);
        return "data:".$mime_type.";base64,".base64_encode($xlsData);
    }





    public function generateProductsDataForExcel($postData,$user_id){

        if(array_key_exists('is_empty', $postData)){
            $headers = array(
            'marketplace_seller_id',
            'marketplace',
            'listing_id',
            'sku_code',
            'min_price',
            'max_price',
            'mrp',
            'mop',
            'cost_price',
            'shipping',
            'competing_listing_ids'
            );

        $data = array($headers);
        }else{

        $products = $this->getAllProducts($postData,$user_id);

        if(array_key_exists('is_competing', $postData)){
          $headers = array(
              'Group ID',
              'Group Listing ID',
              'Listing ID',
              'Marketplace',
              'Product Name',
              'Product URL',
              'Seller Name',
              'Seller Rating',
              'Price',
              'Is Lowest',
              'Is Buy Box',
              'Tracked Since',
              'Is Stocked Out',
              'Buy Box Ownership',
              'Stockouts Count',
              'Violated',
              'MRP',
              'MOP',
              'My Min',
              'My Max',
              'Market Min',
              'Market Max',
              'Cost Price',
              'Shipping',
              'Competing Listing Ids',
              'Total Tracked Listing',
              'Total Seller'
              );
        }else{
          $headers = array(
              'Listing ID',
              'Marketplace',
              'Product Name',
              'Product URL',
              'My Price',
              'Is Lowest',
              'Is Buy Box',
              'MRP',
              'MOP',
              'My Min',
              'My Max',
              'Market Min',
              'Market Max',
              'Cost Price',
              'Shipping',
              'Competing Listing Ids',
              'Total Tracked Listing',
              'Total Seller'
              );
        }



        $data = array($headers);



        foreach($products as $key=>$product){
            if(count($product->products_to_be_tracked)<=0){
                continue;
            }
            $product = $this->generateProductData($product);


            if(array_key_exists('is_competing', $postData)){

                usort($product['sellers'], function($a, $b)
                {
                    return strcmp($b['is_current_seller'], $a['is_current_seller']);
                });

                foreach($product['sellers'] as $seller_data){

                  $prodData = array(
                      'group_id'=>$product['product_details']['id'],
                      'group_listing_id'=>$product['channel_details']['listing_id'],
                      'listing_id'=>$seller_data['listing_id'],
                      'marketplace'=>$seller_data['marketplace_title'],
                      'product_title'=>$seller_data['product_title'],
                      'product_url'=>$seller_data['listing_url'],

                      'seller_name'=>$seller_data['seller'],
                      'seller_rating'=>$seller_data['rating'],
                      'price'=>$seller_data['price'],
                      'is_lowest'=>$seller_data['lowest'],
                      'is_buy_box'=>$seller_data['buy_box'],
                      'tracked_since'=>$seller_data['tracked_since'],
                      'is_stocked_out'=>$seller_data['is_stocked_out'],
                      'buy_box_ownership'=>$seller_data['buy_box_ownership'],
                      'stockouts_count'=>$seller_data['stockouts_count'],
                      'violated'=>$seller_data['violated'],

                      'mrp'=>($seller_data['is_current_seller'])?$product['product_details']['mrp']:'N/A',
                      'mop'=>($seller_data['is_current_seller'])?$product['product_details']['mop']:'N/A',
                      'my_min'=>($seller_data['is_current_seller'])?$product['repricing']['my_min']:'N/A',
                      'my_max'=>($seller_data['is_current_seller'])?$product['repricing']['my_max']:'N/A',
                      'market_min'=>($seller_data['is_current_seller'])?$product['repricing']['market_min']:'N/A',
                      'market_max'=>($seller_data['is_current_seller'])?$product['repricing']['market_max']:'N/A',
                      'cost_price'=>($seller_data['is_current_seller'])?$product['product_details']['cp']:'N/A',
                      'shipping'=>($seller_data['is_current_seller'])?$product['product_details']['shipping']:'N/A',
                      'competing_listings'=>($seller_data['is_current_seller'])?$product['repricing']['tracked_listings']:'N/A',
                      'tracked_products_count'=>($seller_data['is_current_seller'])?$product['repricing']['tracked_products_count']:'N/A',
                      'tracked_sellers_count'=>($seller_data['is_current_seller'])?$product['repricing']['tracked_sellers_count']:'N/A'
                      );


                      $data[] = $prodData;
                }
            }else{
              $prodData = array(
                  'group_listing_id'=>$product['channel_details']['listing_id'],
                  'marketplace'=>$product['channel_details']['channel_name'],
                  'product_name'=>$product['product_details']['product_name'],
                  'product_url'=>$product['product_details']['product_url'],
                  'my_price'=>$product['repricing']['my_price'],
                  'is_min'=>$product['repricing']['is_min'],
                  'is_buy_box'=>$product['repricing']['is_buy_box'],
                  'mrp'=>$product['product_details']['mrp'],
                  'mop'=>$product['product_details']['mop'],
                  'my_min'=>$product['repricing']['my_min'],
                  'my_max'=>$product['repricing']['my_max'],
                  'market_min'=>$product['repricing']['market_min'],
                  'market_max'=>$product['repricing']['market_max'],
                  'cost_price'=>$product['product_details']['cp'],
                  'shipping'=>$product['product_details']['shipping'],
                  'competing_listings'=>$product['repricing']['tracked_listings'],
                  'tracked_products_count'=>$product['repricing']['tracked_products_count'],
                  'tracked_sellers_count'=>$product['repricing']['tracked_sellers_count']
                  );
              $data[] = $prodData;
            }



        }

        }


        return $data;
    }






    public function getCompetitorsIds($queryData,$user_id){
      $query = $this->find()->where(['user_id'=>$user_id])->contain([
        'ProductsToBeTracked' => [
        'queryBuilder' => function ($q) {
            return $q->contain([

                'ProductSellerData' => [
                'queryBuilder' => function ($q) {
                  return $q->contain(['Sellers']);
                }
                ]

                ])->where(['ProductsToBeTracked.active'=>true]);
        }
        ]

      ])->select(['Products.id','Products.seller_id','Products.marketplace_id']);

      //Marketplace filter
      if(array_key_exists('marketplace_id', $queryData)){
          if(!empty($queryData['marketplace_id'])){
              $query->where(["Products.marketplace_id" => $queryData['marketplace_id']]);
          }
      }


    $seller_ids = array();
    $sellersTable = TableRegistry::get('Sellers');
    foreach($query->toArray() as $product){
      $my_seller_id = $sellersTable->getSellerId($product->marketplace_id,$product->seller_id);
      foreach($product->products_to_be_tracked as $track){
        foreach($track->product_seller_data as $seller_data){
          if($seller_data->seller->id != $my_seller_id){
            $seller_ids[] = $seller_data->seller->id;
          }
        }
      }
    }

    return array_values(array_unique($seller_ids));
    }





    public function getUploadedProducts($queryData,$product_ids){
      $query = $this->find()->select(['listing_id','created_at','last_updated'])->where(['id IN'=>$product_ids]);
      return $query;
    }





    public function getTrackableCompetitorProducts($seller_id,$user_id){
      $trackable = $this->find()->contain([

          'ProductsToBeTracked' => [
          'queryBuilder' => function ($q) use ($seller_id) {
              return $q->contain([
                  'ProductSellerData' => [
                  'queryBuilder' => function ($q) use ($seller_id) {

                      return $q->where(['ProductSellerData.seller_id'=>$seller_id])->order(['ProductSellerData.updated_on'=>'DESC'])->distinct(['ProductSellerData.product_id']);
                      //return $q->order(['ProductSellerData.updated_on'=>'DESC'])->distinct(['ProductSellerData.product_id']);

                  }
                  ]

                  ])->where(['ProductsToBeTracked.active'=>true]);
          }
          ]

          ])->where(['Products.user_id'=>$user_id])->toArray();
          return $trackable;
    }





    public function getCompetitorData($seller,$user_id){
      $seller_id = $seller['id'];
        $trackable = $this->getTrackableCompetitorProducts($seller_id,$user_id);

          $sellersTable = TableRegistry::get('Sellers');
          $productSellerTable = TableRegistry::get('ProductSellerData');

          $listings = array();
          $fbm_listings = 0;
          $buy_box = 0;
          $lowest = 0;
          $mop_violation = 0;
          $mrp_violation = 0;
          $created_dates = array();
          $my_prices = array();
          $seller_prices = array();

          foreach($trackable as $product){
            $marketplace_seller_id = $product['seller_id'];
            $my_seller_id = $sellersTable->getSellerId($product['marketplace_id'],$marketplace_seller_id);
            $track_data = $product['products_to_be_tracked'];

            //Getting first record for seller to find track since
            $oldest_data = $productSellerTable->find()->where(['group_id'=>$product['id'],'seller_id'=>$seller_id])->order(['id'=>'asc'])->first();
            if($oldest_data){
              $created_dates[] = $oldest_data->updated_on;
            }


            foreach($track_data as $trk_data){

              //debug($trk_data['id']);
              //$created_dates[] = $trk_data['created_at'];
              foreach($trk_data['product_seller_data'] as $sel_data){

                if($sel_data['seller_id']==$my_seller_id){
                  $my_prices[$trk_data['product_id']] = $sel_data['price'];
                  //debug($trk_data['product_id'].' : I am');
                }


                //$seller_exists = false;
                //if(($sel_data['seller_id']==$seller_id) && ($trk_data['listing_id'] == $product['listing_id'] )){
                if($sel_data['seller_id']==$seller_id){
                  //$created_dates[] = $sel_data['updated_on'];
                  //debug($trk_data['product_id'].' : Seller :'.$seller_id);
                  $listings[$sel_data['product_id']] = $sel_data;
                  $seller_prices[$trk_data['product_id']] = $sel_data['price'];
                  //$seller_exists = true;

                  if($sel_data['fullfilled_by_marketplace']){
                    $fbm_listings++;
                  }
                  if($sel_data['buy_box']){
                    $buy_box++;
                  }
                  if($sel_data['price']<$product['mop']){
                    $mop_violation++;
                  }
                  if($sel_data['price']>$product['mrp']){
                    $mrp_violation++;
                  }
                }

              }

            }
          }


          //debug($created_dates);

          $data = array(
              'id'=>$seller['id'],
              'seller_id'=>$seller['seller_id'],
              'channel_id'=>$seller['channel_id'],
              'seller_name'=>$seller['seller_name'],
              'seller_url'=>$seller['seller_url'],
              'rating'=>$seller['rating'],
              'rating_count'=>$seller['rating_count'],
              'competes_on'=>count($listings),
              'fbm_listings'=>$fbm_listings,
              'buy_box'=>$buy_box,
              'cheapest_on'=>$lowest,
              'mop_violation'=>$mop_violation,
              'mrp_violation'=>$mrp_violation,
              'tracked_since'=>Time::parse(min($created_dates))->nice(),
              'cheaper_than_me'=>30,
              'im_cheaper'=>70
              );
          return $data;
    }

    public function updateSellerId($seller_id,$product_ids){
      $this->updateAll(
        array("seller_id" => $seller_id),
        array("id IN" => $product_ids)
      );
    }

    public function getUserMarketPlaceProductsTobeTracked($userId,$marketplaceId,$limit,$page){


        $productsData = $this->find()->contain(['Marketplaces','ProductsToBeTracked' => [
          'queryBuilder' => function ($q) {
              return $q->where(['ProductsToBeTracked.active'=>true]);
          }]

          ])->where(['user_id'=>$userId,'marketplace_id'=>$marketplaceId])->limit($limit)->page($page)->toArray();
        $productIds = [];
        foreach ($productsData as $key => $product) {
            $marketplace = strtolower($product['marketplace']['title']);
            $productsTobeTrackedId = $product['products_to_be_tracked'][0]['id'];

            $productIds[$marketplace][] = (string) $productsTobeTrackedId;
        }

        return $productIds;
    }


    public function deleteDummyProducts($userId){
#      $uploads = TableRegistry::get('Uploads');

      $productSellerDataTable = TableRegistry::get('ProductSellerData');

#      $hasUploads = $uploads->find()->where(['user_id'=>$userId])->first();


        $connection = ConnectionManager::get('default');
        $check_query = "select * from user_preferences where (meta_key = 'dummy_uploaded' OR meta_key = 'dummy_cleared') and user_id = ".$userId;
        $check_dummy = $connection->execute($check_query)->fetchAll();
        $check = count($check_dummy) == 1 && $check_dummy[0][3] == 1 ? true : false;

      if($check){

          $productsData = $this->find()->contain(['ProductsToBeTracked'])->where(['user_id'=>$userId])->toArray();
          if(!empty($productsData)){
              $productIds = [];
              $productTrackIds = [];
              //$sellerIds = [];
              foreach ($productsData as $key => $product) {
                  $productTrackIds[] = $product['products_to_be_tracked'][0]['id'];
                  $productIds[] = $product['id'];
                  //$sellerIds[] = $product['seller_id'];
              }

              $productsToBeTrackedTable = TableRegistry::get('ProductsToBeTracked');
              $productsToBeTrackedTable->deleteData($productTrackIds);
              // $sellersTable = TableRegistry::get('Sellers');
              // $sellersTable->deleteData($sellerIds);

              $productSellerDataTable->deleteAll(['product_id IN' => $productTrackIds]);

              $this->deleteAll(['id IN' => $productIds]);

              $summarytable = TableRegistry::get('summary');
              $summarytable->deleteAll(['user_id' => $userId]);

              //Add dumy cleared flag
              $userPreferenceTable = TableRegistry::get('UserPreferences');
              $userPreferenceTable->updatePreference($userId,'dummy_cleared','1');


          }

      }

  }














  public function getPendingCounts($queryData,$user_id){

      $query = $this->find()->contain([
          'ProductsToBeTracked' => [
          'queryBuilder' => function ($q) {
              return $q->where(['ProductsToBeTracked.active'=>true]);
          }
          ]

          ])->where(['Products.user_id'=>$user_id]);

          //Marketplace filter
          if(array_key_exists('marketplace_id', $queryData)){
              if(!empty($queryData['marketplace_id'])){
                  $query->where(["Products.marketplace_id" => $queryData['marketplace_id']]);
              }
          }

          $pending_ids = $this->getPendingIds($query);
          return count($pending_ids);
  }


    public function getPendingIds($query)
    {
        $ids = array();
        foreach($query->toArray() as $product) {
            foreach ($product->products_to_be_tracked as $trproduct) {
              if ($trproduct->listing_id == $product->listing_id && in_array($trproduct->crawl_status, ['Pending','Crawling'])) {
                  $ids[] = $product->id;
              }

            }
        }
        return array_unique($ids);
    }



    public function getFirstCrawlFailedCount($queryData,$user_id)
    {
      $query = $this->find()->contain([
          'ProductsToBeTracked' => [
          'queryBuilder' => function ($q) {
              return $q->where(['ProductsToBeTracked.active'=>true]);
          }
          ]

          ])->where(['Products.user_id'=>$user_id]);

          //Marketplace filter
          if(array_key_exists('marketplace_id', $queryData)){
              if(!empty($queryData['marketplace_id'])){
                  $query->where(["Products.marketplace_id" => $queryData['marketplace_id']]);
              }
          }

          $failed_ids = $this->getFirstCrawlFailedIds($query);
          $pending_ids = $this->getPendingIds($query);
          return count($failed_ids) - count($pending_ids);
    }




    public function getFirstCrawlFailedIds($query)
    {
        $ids = array();
        foreach($query->toArray() as $product) {
            foreach ($product->products_to_be_tracked as $trproduct) {

              if ($trproduct->listing_id == $product->listing_id && !$trproduct->first_crawl_succeeded) {
                  $ids[] = $product->id;
              }

            }
        }
        return array_unique($ids);
    }


    public function importProductsAllowedExtentions() {
        $allowedExtensions = [];
        $allowedExtensions['custom'] = ['xls','xlsx','xl']; //custom
        $allowedExtensions[1] = ['xls','xlsx','xl','csv','txt']; //amazon
        $allowedExtensions[2] = ['xls','xlsx','xl']; //flipkart
        return $allowedExtensions;
    }



    public function generateSummaryData($product_id){
      $product = $this->getSingleProduct($product_id);
      $productSellerTable = TableRegistry::get('ProductSellerData');

      $prices = array();
      $market_min = 0;
      $market_max = 0;
      $buy_box_price = null;
      $sellers = array();
      $my_price = null;
      $violated = false;
      $product_title = null;
      $product_image = null;
      $mrp = null;
      $sellers_count = 0;
      $in_stock_sellers_count = 0;
      $iam_stocked_out = false;

        $won_buy_box = false;
        $won_lowest_price = false;
        $lost_buy_box = false;
        $lost_lowest_price = false;

      foreach($product->products_to_be_tracked as $tracked){

        if($tracked->listing_id == $product->listing_id){
          $product_title = $tracked->product_title;
          $product_image = $tracked->product_image;
          $mrp = $tracked->mrp;
        }

          if(count($tracked->product_seller_data) > 0){
            $filtered_seller_data = $this->filterProductSellerData($tracked->product_seller_data);
          }else{
            $filtered_seller_data = array();
          }

          //$sellers[] = count($filtered_seller_data);
          $sellers_count = $sellers_count + count($filtered_seller_data);

          foreach($filtered_seller_data as $seller){

            if($seller->in_stock){
              $in_stock_sellers_count++;
              $prices[] = $seller->price;
            }



              if($product->listing_id == $tracked->listing_id){
                if($seller->buy_box){
                  $buy_box_price = $seller->price;
                }

                  //added
                  if($seller->own_buy_box){
                      $won_buy_box = true;
                  }

                  if($seller->own_lowest_price){
                      $won_lowest_price = true;
                  }

                  if($seller->lost_buy_box){
                      $lost_buy_box = true;
                  }

                  if($seller->lost_lowest_price){
                      $lost_lowest_price = true;
                  }
              }

              // if(($seller->price > $product->mrp)){
              //   $violated = true;
              // }

              if(!is_null($mrp)){
                if(($seller->price > $mrp)){
                  $violated = true;
                }
              }

              if(!is_null($product->mop)){
                if(($seller->price < $product->mop)){
                  $violated = true;
                }
              }


              if(($seller->seller->seller_id == $product->seller_id) && ($tracked->listing_id == $product->listing_id)){
                  //echo $tracked->is_competition;
                $my_price = $seller->price;

                if(!$seller->in_stock){
                  $iam_stocked_out = true;
                }

              }

          }

      }

      if(count($prices)>0){
          $market_min = min($prices);
          $market_max = max($prices);
      }


      $tracked_seller_count = array_sum($sellers);

      sort($prices);
      $rank = array_search($my_price, $prices)+1;

      if(is_null($buy_box_price) || is_null($my_price)){
        $buy_box_flag = false;
      }else{
        $buy_box_flag = ($buy_box_price == $my_price) ? true : false;
      }

      //Generate Violation
      if(!$violated){
        if(!is_null($my_price)){
          if(!is_null($mrp)){
            if($my_price > $mrp){
              $violated = true;
            }
          }
          if(!is_null($product->mop)){
            if($my_price < $product->mop){
              $violated = true;
            }
          }
        }
      }




        $data = array(
          'product_title' => $product_title,
          'product_image' => $product_image,
          'mrp' => $mrp,
          'my_price' => $my_price,
          'number_of_sellers' => $sellers_count,
          'in_stock_sellers' => $in_stock_sellers_count,
          'iam_stocked_out' => $iam_stocked_out,
          'mapped_listings' => count($product->products_to_be_tracked),
          'rank' => $rank,
          'buy_box_flag' => $buy_box_flag,
          'buy_box_price' => $buy_box_price,
          'battlefield_min_price' => $market_min,
          'battlefield_max_price' => $market_max,
          'violated' => $violated,
           'won_buy_box' => $won_buy_box,
           'won_lowest_price' => $won_lowest_price,
           'lost_buy_box' => $lost_buy_box,
           'lost_lowest_price' => $lost_lowest_price,
        );

      return $data;
    }




    public function updateSummaryData($track_id,$product_id) {
      $trackableTable = TableRegistry::get('ProductsToBeTracked');
      try {
        $track = $trackableTable->get($track_id);
        $m_prod = $this->get($product_id);
      } catch (\Exception $e) {
        return;
      }

      if($track->crawl_status == 'Failed'){
        if(is_null($m_prod->first_crawl_succeeded)) {
          $data = array(
            'last_updated' => Time::now(),
            'first_crawl_succeeded' => false
          );
        }else{
          $data = $this->generateSummaryData($product_id);
          $data['last_updated'] = Time::now();
        }

      }else{
        $data = $this->generateSummaryData($product_id);
        $data['last_updated'] = Time::now();
        $data['first_summary_generated'] = true;
        $data['first_crawl_succeeded'] = true;
      }
      if(count($data)>0){
        $query = $this->query();
        $query->update()
          ->set($data)
          ->where(['id' => $product_id])
          ->execute();
      }


      $trackableTable = TableRegistry::get('ProductsToBeTracked');
      $trkquery = $trackableTable->query();
      $trkquery->update()
        ->set(['dirty'=>false])
        ->where(['product_id' => $product_id])
        ->execute();
    }

    public function getProducts($queryData,$user_id){

      if(array_key_exists('show_failed', $queryData)){
        if($queryData['show_failed'] == 'yes'){
          $query = $this->find()->contain(['PricingRules','Marketplaces'])->where([
            'Products.user_id'=>$user_id,
            'Products.first_crawl_succeeded'=>false
          ]);

          //Search
          if(array_key_exists('search', $queryData)){
              if(array_key_exists('field', $queryData['search']) && array_key_exists('value', $queryData['search'])){
                  if(!empty($queryData['search']['field']) && !empty($queryData['search']['value'])){
                      if($queryData['search']['field'] == 'listing_id'){
                          $query->where(["Products.listing_id" => $queryData['search']['value']]);
                      }else if($queryData['search']['field'] == 'sku_code'){
                          $query->where(["Products.sku_code" => $queryData['search']['value']]);
                      }else if($queryData['search']['field'] == 'product_title'){
                          $query->where(["Products.product_title LIKE" => "%".$queryData['search']['value']."%"]);
                      }
                  }
              }
          }
          return $query;
        }
      } else if(array_key_exists('show_inactive', $queryData)){
            if($queryData['show_inactive'] == 'yes'){
                $query = $this->find()->contain(['PricingRules','Marketplaces'])->where([
                    'Products.user_id'=>$user_id,
                    'Products.status'=>0
                ]);

                //Search
                if(array_key_exists('search', $queryData)){
                    if(array_key_exists('field', $queryData['search']) && array_key_exists('value', $queryData['search'])){
                        if(!empty($queryData['search']['field']) && !empty($queryData['search']['value'])){
                            if($queryData['search']['field'] == 'listing_id'){
                                $query->where(["Products.listing_id" => $queryData['search']['value']]);
                            }else if($queryData['search']['field'] == 'sku_code'){
                                $query->where(["Products.sku_code" => $queryData['search']['value']]);
                            }else if($queryData['search']['field'] == 'product_title'){
                                $query->where(["Products.product_title LIKE" => "%".$queryData['search']['value']."%"]);
                            }
                        }
                    }
                }
                return $query;
            }
        }

        $query = $this->find()->contain(['PricingRules','Marketplaces'])->where([
          'Products.user_id'=>$user_id,
          'Products.first_crawl_succeeded !='=>false,
          'Products.first_summary_generated !='=>false
        ]);

        //Marketplace filter
        if(array_key_exists('marketplace_id', $queryData)){
            if(!empty($queryData['marketplace_id'])){
                $query->where(["Products.marketplace_id" => $queryData['marketplace_id']]);
            }
        }

        //Search
        if(array_key_exists('search', $queryData)){
            if(array_key_exists('field', $queryData['search']) && array_key_exists('value', $queryData['search'])){
                if(!empty($queryData['search']['field']) && !empty($queryData['search']['value'])){
                    if($queryData['search']['field'] == 'listing_id'){
                        $query->where(["Products.listing_id" => $queryData['search']['value']]);
                    }else if($queryData['search']['field'] == 'sku_code'){
                        $query->where(["Products.sku_code" => $queryData['search']['value']]);
                    }else if($queryData['search']['field'] == 'product_title'){
                        $query->where(["Products.product_title LIKE" => "%".$queryData['search']['value']."%"]);
                    }

                    else if($queryData['search']['field'] == 'seller_id') {

                        $query->leftJoin(['ProductSellerData' => 'product_seller_data'],
                                         ['Products.id = ProductSellerData.group_id']);
                        
                        // $query->leftJoin(['Sellers' => 'sellers'],
                        //                  ['ProductSellerData.seller_id = Sellers.id']);

                        $query->where(["ProductSellerData.seller_marketplace_id" => $queryData['search']['value'] ]);
                        $query->group('ProductSellerData.group_id');


                    }
                }
            }
        }

        //Filters
        if(array_key_exists('filters', $queryData)){

            //Seller min max filter
            if(array_key_exists('seller_count', $queryData['filters'])) {
              if(array_key_exists('min', $queryData['filters']['seller_count'])) {
                $query->where(["Products.number_of_sellers >=" => $queryData['filters']['seller_count']['min']]);
              }
              if(array_key_exists('max', $queryData['filters']['seller_count'])) {
                $query->where(["Products.number_of_sellers <=" => $queryData['filters']['seller_count']['max']]);
              }
            }

            //Price min max filter
            if(array_key_exists('price', $queryData['filters'])) {
              if(array_key_exists('min', $queryData['filters']['price'])) {
                $query->where(["Products.my_price >=" => $queryData['filters']['price']['min']]);
              }
              if(array_key_exists('max', $queryData['filters']['price'])) {
                $query->where(["Products.my_price <=" => $queryData['filters']['price']['max']]);
              }
            }

            //Pricing outcomes
            if(array_key_exists('pricing_outcome', $queryData['filters'])) {

              //I am lowest
              if($queryData['filters']['pricing_outcome'] == 'im_cheapest') {
                $query->where(["Products.my_price = Products.battlefield_min_price"]);
              }

              //Seller is lowest
              if($queryData['filters']['pricing_outcome'] == 'seller_is_cheapest') {
                $query->where(["Products.my_price != Products.battlefield_min_price"]);
              }

              //I have buy box
              if($queryData['filters']['pricing_outcome'] == 'i_have_buy_box') {
                $query->where(["Products.buy_box_flag" => true]);
              }

              //I am only seller
              if($queryData['filters']['pricing_outcome'] == 'i_am_only_seller') {
                $query->where(["Products.number_of_sellers" => 1, "Products.my_price IS NOT" => null]);
              }

              //violation filter
              if($queryData['filters']['pricing_outcome'] == 'is_violation') {
                $query->where(["Products.violated" => true]);
              }

            }

        }


        if(array_key_exists('sort', $queryData)){
          if(array_key_exists('direction', $queryData)){
            $direction = $queryData['direction'];
          }else{
            $direction = 'asc';
          }

          if($queryData['sort'] == 'listing_id'){
            $query->order(['Products.listing_id' => $direction]);
          }
          if($queryData['sort'] == 'product_title'){
            $query->order(['Products.product_title' => $direction]);
          }
          if($queryData['sort'] == 'mop'){
            $query->order(['Products.mop' => $direction]);
          }
          if($queryData['sort'] == 'mrp'){
            $query->order(['Products.mrp' => $direction]);
          }
          if($queryData['sort'] == 'created_at'){
            $query->order(['Products.created_at' => $direction]);
          }
          if($queryData['sort'] == 'last_updated'){
            $query->order(['Products.last_updated' => $direction]);
          }
        }

        return $query;

      }






      public function generateTrendSummary($product_ids){
        $data = array(
          'total_products' => count($product_ids),
          'im_only_seller' => 0,
          'i_have_buybox' => 0,
          'im_lowest' => 0,
          'im_not_lowest' => 0,
          'im_in_top_10' => 0,
          'im_selling' => 0,
          'im_not_selling' => 0,
          'average_rank' => 0,
          'won_buy_box' => 0,
          'won_lowest_price' => 0,
          'lost_buy_box' => 0,
          'lost_lowest_price' => 0,
          'competition_changed_price' => 0,
          'new_sellers_entered' => 0,
          'sellers_stocked_out' => 0,
          'sellers_stocked_again' => 0,
          'listing_with_changes' => 0
        );
        $ranks = array();
        foreach($product_ids as $key=>$value){
          $summary = $this->generateSummaryData($value, true);

          $ranks[] = $summary['rank'];

          if(($summary['my_price'] != null) && ($summary['buy_box_flag'])){
            $data['i_have_buybox']++;
          }

          if(($summary['my_price'] != null) && ($summary['number_of_sellers'] == 1) ){
            $data['im_only_seller']++;
          }

          if($summary['my_price'] != null){
            if($summary['battlefield_min_price'] == $summary['my_price']){
              $data['im_lowest']++;
            }
          }


          if(($summary['my_price'] != null) && ($summary['rank'] <= 10)){
            $data['im_in_top_10']++;
          }

          if($summary['my_price'] != null){
            $data['im_selling']++;
          }

          if($summary['won_buy_box']){
            $data['won_buy_box']++;
          }

          if($summary['lost_buy_box']){
            $data['lost_buy_box']++;
          }

          if($summary['listing_with_changes']){
            $data['listing_with_changes']++;
          }

          if($summary['won_lowest_price']){
            $data['won_lowest_price']++;
          }

          if($summary['lost_lowest_price']){
            $data['lost_lowest_price']++;
          }

          if($summary['new_sellers_entered']>0){
            $data['new_sellers_entered'] = $data['new_sellers_entered']+$summary['new_sellers_entered'];
          }

          if($summary['competition_changed_price']>0){
            $data['competition_changed_price'] = $data['competition_changed_price']+$summary['competition_changed_price'];
          }

          if($summary['sellers_stocked_out']>0){
            $data['sellers_stocked_out'] = $data['sellers_stocked_out']+$summary['sellers_stocked_out'];
          }

          if($summary['sellers_stocked_again']>0){
            $data['sellers_stocked_again'] = $data['sellers_stocked_again']+$summary['sellers_stocked_again'];
          }

        }

        $data['im_not_lowest'] = $data['im_selling'] - $data['im_lowest'];
        $data['im_not_selling'] = count($product_ids) - $data['im_selling'];
        $data['average_rank'] = round( (array_sum($ranks) / count($product_ids)), 1, PHP_ROUND_HALF_UP);

        return $data;
      }






      public function getTopMetrics($user_id,$queryData) {

        if(isset($queryData['marketplace_id'])){
          $condition = array(['user_id' => $user_id, 'marketplace_id'=>$queryData['marketplace_id'], 'first_summary_generated'=>true]);
        }else{
          $condition = array(['user_id' => $user_id, 'status'=> 1, ]);
        }
        $query = $this->find()->where($condition);
        $total_products_case = $query->newExpr()
            ->addCase(
                $query->newExpr()->add($condition),
                1,
                'integer'
            );
            $lowest_case = $query->newExpr()
                ->addCase(
                    $query->newExpr()->add(['battlefield_min_price = my_price']),
                    1,
                    'integer'
                );
                $not_lowest_case = $query->newExpr()
                    ->addCase(
                        $query->newExpr()->add(['battlefield_min_price < my_price']),
                        1,
                        'integer'
                    );
          $im_selling_case = $query->newExpr()
              ->addCase(
                  $query->newExpr()->add(['my_price IS NOT' => NULL]),
                  1,
                  'integer'
              );

            $im_only_seller_case = $query->newExpr()
                  ->addCase(
                      $query->newExpr()->add(['my_price IS NOT' => NULL, 'number_of_sellers' => 1]),
                      1,
                      'integer'
                  );

                  $buy_box_case = $query->newExpr()
                        ->addCase(
                            $query->newExpr()->add(['my_price IS NOT' => NULL, 'buy_box_flag' => true]),
                            1,
                            'integer'
                        );

                  $top_ten_case = $query->newExpr()
                      ->addCase(
                          $query->newExpr()->add(['my_price IS NOT' => NULL,'rank <=' => 10]),
                          1,
                          'integer'
                      );

                  $not_selling_case = $query->newExpr()
                          ->addCase(
                              $query->newExpr()->add(['my_price IS' => NULL]),
                              1,
                              'integer'
                          );

                  $iam_stocked_out = $query->newExpr()
                          ->addCase(
                              $query->newExpr()->add(['my_price IS NOT' => NULL , 'iam_stocked_out IS' => true]),
                              1,
                              'integer'
                          );


                  $top_five_case = $query->newExpr()
                      ->addCase(
                          $query->newExpr()->add(['my_price IS NOT' => NULL,'rank <=' => 5]),
                          1,
                          'integer'
                      );

          $won_buy_box = $query->newExpr()
              ->addCase(
                  $query->newExpr()->add(['my_price IS NOT' => NULL,'won_buy_box' => true]),
                  1,
                  'integer'
              );


          $won_lowest_price = $query->newExpr()
              ->addCase(
                  $query->newExpr()->add(['my_price IS NOT' => NULL,'won_lowest_price' => true]),
                  1,
                  'integer'
              );


          $lost_buy_box = $query->newExpr()
              ->addCase(
                  $query->newExpr()->add(['my_price IS NOT' => NULL,'lost_buy_box' => true]),
                  1,
                  'integer'
              );


          $lost_lowest_price = $query->newExpr()
              ->addCase(
                  $query->newExpr()->add(['my_price IS NOT' => NULL,'lost_lowest_price' => true]),
                  1,
                  'integer'
              );
/*
* You’re Stocked Out
You don’t have BuyBox
You are in top 5
You are not in top 5
           */

        $query->select([
            'product_count' => $query->func()->count($total_products_case),
            'im_lowest' => $query->func()->count($lowest_case),
            'im_selling' => $query->func()->count($im_selling_case),
            'im_not_lowest' => $query->func()->count($not_lowest_case),
            'im_only_seller' => $query->func()->count($im_only_seller_case),
            'im_in_top_ten' => $query->func()->count($top_ten_case),
            'im_not_selling' => $query->func()->count($not_selling_case),
            'my_avg_rank' => $query->func()->avg('rank'),
            'i_have_buybox' => $query->func()->count($buy_box_case),
            'im_stocked_out' => $query->func()->count($iam_stocked_out),
            'im_in_top_five' => $query->func()->count($top_five_case),
            'won_buy_box' => $query->func()->count($won_buy_box),
            'won_lowest_price' => $query->func()->count($won_lowest_price),
            'lost_buy_box' => $query->func()->count($lost_buy_box),
            'lost_lowest_price' => $query->func()->count($lost_lowest_price),
        ]);
        $data = $query->hydrate(false)->toArray();

        //TODO - generate the v
        $data[0]['i_dont_have_buybox'] = $data[0]['im_selling'] - $data[0]['i_have_buybox'];
        $data[0]['im_not_in_top_five'] = $data[0]['product_count'] - $data[0]['im_in_top_five'];


        //Calculating rank seperately as default does not exclude products i am not selling
        $condition['my_price IS NOT'] = NULL;
        $product_ranks = $this->find('list',[
        'keyField' => 'id',
        'valueField' => 'rank'
        ])->where($condition)->toArray();
        $ranks = array_values($product_ranks);

        if(count($ranks) <= 0){
          $avg_rank = 0;
        }else{
          $avg_rank = array_sum($ranks) / count($ranks);
        }



        //$data[0]['my_avg_rank'] = round( $data[0]['my_avg_rank'], 2, PHP_ROUND_HALF_UP);
        //$data[0]['my_avg_rank'] = intval(($data[0]['my_avg_rank']*100))/100;
        $data[0]['my_avg_rank'] = substr($avg_rank, 0, ((strpos($avg_rank, '.')+1)+2));
          return $data[0];
      }





      public function generateSingleProductResponse($product){
        if(!is_null($product->in_stock_sellers)){
          if($product->in_stock_sellers == 0){
            $in_stock = false;
          }else{
            $in_stock = true;
          }
        }else{
          $in_stock = ($product->number_of_sellers >= 1) ? true : false;
        }


        $dt = array(
          'tracking_group_id'=>$product->id,
          'marketplace_seller_id'=>$product->seller_id,

          'channel_details'=>array(
            'channel_id'=>$product->marketplace_id,
            'channel_name'=>$product->marketplace->title,
            'listing_id'=>$product->listing_id
          ),

          'product_details'=>array(
            'id'=>$product->id,
            'created_on'=>Time::parse($product->created_at)->nice(),
            'product_name'=>$product->product_title,
            'product_image_url'=>$product->product_image,
            'product_url'=>$this->generateListingUrl($product->listing_id,$product->marketplace_id),
            'sku_code'=>$product->sku_code,
            'sales_rank'=>$product->rank,
            'mop'=>$product->mop,
            'mrp'=>$product->mrp,
            'cp'=>$product->cost_price,
            'shipping'=>$product->shipping,
            //'in_stock'=>($product->number_of_sellers >= 1) ? true : false,
            'in_stock'=>$in_stock,
            'sold_by_me'=>($product->my_price != null) ? true : false
          ),

          'repricing'=>array(
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
            //'violation_type'=>($product->my_price != null && ($product->my_price > $product->mrp || $product->my_price < $product->mop)) ? ($product->my_price < $product->mop) ? 'MOP Violation' : 'MRP Violation' : '',
          ),

        );

        if($dt['repricing']['violated']){
          if($product->my_price < $product->mop){
            $dt['repricing']['violation_type'] = 'MOP Violation';
          }
          if($product->my_price > $product->mrp){
            $dt['repricing']['violation_type'] = 'MRP Violation';
          }
        }

        return $dt;
      }


    public  function get24HourMetric($user_id) {


        $days_ago = new Time('-1 days');
        $days_ago = $days_ago->format('Y-m-d H:i:s');
        $response = [];
        $connection = ConnectionManager::get('default');
        $sql = 'SELECT p.id, min(psd.updated_on), group_concat(log_type) as new_seller, sum(psd.own_buy_box) as won_buy_box, sum(psd.lost_buy_box) as lost_buy_box, sum(psd.own_lowest_price) as won_lowest_price, sum(psd.lost_lowest_price) as lost_lowest_price  FROM `products` p inner join `product_seller_data` psd on p.id = psd.group_id WHERE p.user_id = '.$user_id.' and p.status = 1 and psd.updated_on > "'.$days_ago.'" group by psd.group_id';
        $data = $connection->execute($sql)->fetchAll('assoc');
        $response['lost_buy_box'] = count(array_filter(array_column($data,'lost_buy_box')));
        $response['won_lowest_price'] = count(array_filter(array_column($data,'won_lowest_price')));
        $response['lost_lowest_price'] = count(array_filter(array_column($data,'lost_lowest_price')));
        $response['new_seller'] = count(array_filter(array_column($data,'new')));
        $response['won_buy_box'] = count(array_filter(array_column($data,'won_buy_box')));
        return $response;
    }
}
