<?php
namespace App\Model\Table;

use Cake\Datasource\ConnectionManager;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cake\ORM\TableRegistry;
use Cake\I18n\Time;

/**
 * Summary Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Groups
 * @property \Cake\ORM\Association\BelongsTo $Schedulars
 * @property \Cake\ORM\Association\BelongsTo $Users
 * @property \Cake\ORM\Association\BelongsTo $Marketplaces
 *
 * @method \App\Model\Entity\Summary get($primaryKey, $options = [])
 * @method \App\Model\Entity\Summary newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Summary[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Summary|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Summary patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Summary[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Summary findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class SummaryTable extends Table
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

        $this->setTable('summary');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->belongsTo('Scheduler', [
            'foreignKey' => 'schedular_id',
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
            ->integer('total_products')
            ->allowEmpty('total_products');

        $validator
            ->integer('im_only_seller')
            ->allowEmpty('im_only_seller');

        $validator
            ->integer('i_have_buybox')
            ->allowEmpty('i_have_buybox');

        $validator
            ->integer('im_lowest')
            ->allowEmpty('im_lowest');

        $validator
            ->integer('im_not_lowest')
            ->allowEmpty('im_not_lowest');

        $validator
            ->integer('im_in_top_10')
            ->allowEmpty('im_in_top_10');

        $validator
            ->integer('im_selling')
            ->allowEmpty('im_selling');

        $validator
            ->integer('im_not_selling')
            ->allowEmpty('im_not_selling');

        $validator
            ->decimal('average_rank')
            ->allowEmpty('average_rank');

        $validator
            ->integer('won_buy_box')
            ->allowEmpty('won_buy_box');

        $validator
            ->integer('won_lowest_price')
            ->allowEmpty('won_lowest_price');

        $validator
            ->integer('lost_buy_box')
            ->allowEmpty('lost_buy_box');

        $validator
            ->integer('lost_lowest_price')
            ->allowEmpty('lost_lowest_price');

        $validator
            ->integer('competition_changed_price')
            ->allowEmpty('competition_changed_price');

        $validator
            ->integer('new_sellers_entered')
            ->allowEmpty('new_sellers_entered');

        $validator
            ->integer('sellers_stocked_out')
            ->allowEmpty('sellers_stocked_out');

        $validator
            ->integer('sellers_stocked_again')
            ->allowEmpty('sellers_stocked_again');

        $validator
            ->integer('listing_with_changes')
            ->allowEmpty('listing_with_changes');

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
        $rules->add($rules->existsIn(['schedular_id'], 'Scheduler'));
        $rules->add($rules->existsIn(['user_id'], 'Users'));
        $rules->add($rules->existsIn(['marketplace_id'], 'Marketplaces'));

        return $rules;
    }




    public function getMarketplaceTopSummaries($user_id){
      $summaries = $this->find()->where(['user_id' => $user_id])->order(['created'=>'DESC'])->toArray();
      $amazon_last_group_id = null;
      $flipkart_last_group_id = null;
      foreach($summaries as $summary){
        if($summary->marketplace_id == 1 && is_null($amazon_last_group_id)){
          $amazon_last_group_id = $summary->group_id;
        }
        if($summary->marketplace_id == 2 && is_null($flipkart_last_group_id)){
          $flipkart_last_group_id = $summary->group_id;
        }

        if(!is_null($amazon_last_group_id) && !is_null($flipkart_last_group_id)){
          break;
        }
      }

      $amazon_summaries = $this->find()->where(['user_id' => $user_id,'group_id'=>$amazon_last_group_id, 'marketplace_id' => 1])->toArray();
      $flipkart_summaries = $this->find()->where(['user_id' => $user_id,'group_id'=>$flipkart_last_group_id, 'marketplace_id' => 2])->toArray();
      $response = array(
        '1' => $amazon_summaries,
        '2' => $flipkart_summaries
      );
      return $response;
    }


    public function generateTopMetrics($summaries){
      $data = array(
        "product_count" => 0,
		    "im_selling" => 0,
		    "im_lowest" => 0,
		    "im_not_lowest" => 0,
		    "im_only_seller" => 0,
		    "im_in_top_ten" => 0,
		    "im_not_selling" => 0,
		    "my_avg_rank" => 0,
        'i_have_buybox' => 0,
        'rank_count' => 0
      );
      foreach($summaries as $summary){

        if($summary->im_selling <= 0){
          $rank_count = 0;
        }else{
          $rank_count = $summary->average_rank*$summary->im_selling;
        }

        $data['product_count'] = $data['product_count']+$summary->total_products;
        $data['im_selling'] = $data['im_selling']+$summary->im_selling;
        $data['im_lowest'] = $data['im_lowest']+$summary->im_lowest;
        $data['im_not_lowest'] = $data['im_not_lowest']+$summary->im_not_lowest;
        $data['im_only_seller'] = $data['im_only_seller']+$summary->im_only_seller;
        $data['im_in_top_ten'] = $data['im_in_top_ten']+$summary->im_in_top_10;
        $data['im_not_selling'] = $data['im_not_selling']+$summary->im_not_selling;
        $data['i_have_buybox'] = $data['i_have_buybox']+$summary->i_have_buybox;
        $data['my_avg_rank'] = $data['my_avg_rank']+$summary->average_rank;
        $data['rank_count'] = $data['rank_count']+$rank_count;
      }

      if(count($summaries)>0){
        if($data['im_selling'] <= 0){
          $rnk = 0;
        }else{
          $rnk = $data['rank_count']/$data['im_selling'];
        }
        $data['my_avg_rank'] = substr($rnk, 0, ((strpos($rnk, '.')+1)+2));
      }

      return $data;

    }


    public function saveGroupEntry($group_id,$batch_id,$schedular_id) {
      $schedulerTable = TableRegistry::get('Scheduler');
      $exists = $schedulerTable->exists(['id' => $schedular_id]);
      if($exists){
        $scheduler = $schedulerTable->get($schedular_id);

        $summaryExists = $this->exists(['group_id' => $group_id,'schedular_id'=>$schedular_id,'user_id'=>$scheduler->user_id,'marketplace_id'=>$scheduler->marketplace_id]);

        if(!$summaryExists){

/*          if($is_edit){
            $summarydt = $this->find()->where(['schedular_id'=>$schedular_id,'user_id'=>$scheduler->user_id,'marketplace_id'=>$scheduler->marketplace_id])->order(['created' => 'DESC'])->first();
            $group_id = $summarydt->group_id;
          }*/

         //mark all other valid unfinished summaries as invalid
            $this->query()->update()->set(['status' => 0])->where([
                'marketplace_id' => $scheduler->marketplace_id,
                'user_id' => $scheduler->user_id,
                'updated IS'=> NULL,
                'status'=> 1,
            ])->execute();

          $summary = $this->newEntity();
          $summary->group_id = $group_id;
          $summary->schedular_id = $schedular_id;
          $summary->user_id = $scheduler->user_id;
          $summary->marketplace_id = $scheduler->marketplace_id;
          $summary->batch_id = $batch_id;
          $summary->status = 1;
          $this->save($summary);
        }

      }
    }





    // public function getTrendChartData($user_id, $ranges){
    //   $lastSummary = [];
    //   $trends = array(
    //     'i_have_buybox' => array(),
    //     'im_lowest' => array(),
    //     'im_selling' => array(),
    //     'my_average_rank' => array(),
    //     'total_products' => array()
    //   );
    //
    //   foreach($ranges as $key=>$interval){
    //
    //     if($key == 0){
    //       $conditions = ['Summary.user_id' => $user_id, 'Summary.updated <=' => $interval];
    //     }else{
    //       $conditions = ['Summary.user_id' => $user_id, 'Summary.updated >' => $ranges[$key-1], 'Summary.updated <=' => $interval];
    //     }
    //     $summaries = $this->find()->where($conditions)->order(['created'=>'DESC'])->toArray();
    //
    //
    //     $amazon_last_group_id = null;
    //     $flipkart_last_group_id = null;
    //
    //     foreach($summaries as $summary){
    //       if($summary->marketplace_id == 1 && is_null($amazon_last_group_id)){
    //         $amazon_last_group_id = $summary->group_id;
    //       }
    //       if($summary->marketplace_id == 2 && is_null($flipkart_last_group_id)){
    //         $flipkart_last_group_id = $summary->group_id;
    //       }
    //
    //       if(!is_null($amazon_last_group_id) && !is_null($flipkart_last_group_id)){
    //         break;
    //       }
    //     }
    //
    //     $trend_summaries = $this->find()->where(['user_id' => $user_id,'group_id IN'=>[$amazon_last_group_id,$flipkart_last_group_id]])->group(['user_id','group_id'])->order(['updated' => 'DESC'])->toArray();
    //
    //     if(count($trend_summaries)<=0 && count($lastSummary)>0){
    //       $generatedSummary = $lastSummary;
    //     }else{
    //       $generatedSummary = $this->generateTopMetrics($trend_summaries);
    //     }
    //     $lastSummary = $generatedSummary;
    //
    //     $trends['i_have_buybox'][] = $generatedSummary['i_have_buybox'];
    //     $trends['im_lowest'][] = $generatedSummary['im_lowest'];
    //     $trends['im_selling'][] = $generatedSummary['im_selling'];
    //     $trends['my_average_rank'][] = $generatedSummary['my_avg_rank'];
    //     $trends['total_products'][] = $generatedSummary['product_count'];
    //
    //   }
    //
    //   return $trends;
    //
    // }




    public function getTrendChartData2($user_id,$range) {

        $date_now = new \DateTime();
        if($range == '24h'){
            $start = date("Y-m-d H:i:s", strtotime( "-24 hours"));
            $end = $date_now->format('Y-m-d H:i:s');
        }else if($range == '48h'){
            $start = date("Y-m-d H:i:s", strtotime( "-48 hours"));
            $end = $date_now->format('Y-m-d H:i:s');
        }else if($range == '7d'){
            $start = date("Y-m-d H:i:s", strtotime( "-7 days"));
            $end = $date_now->format('Y-m-d H:i:s');
        }else if($range == '30d'){
            $start = date("Y-m-d H:i:s", strtotime( "-30 days"));
            $end = $date_now->format('Y-m-d H:i:s');
        }else{
            list($startDate, $endDate) = explode(' - ', $range);
            $datetime1 = \DateTime::createFromFormat('d/m/Y', $startDate);
            $datetime2 = \DateTime::createFromFormat('d/m/Y', $endDate);
            $start = $datetime1->format('Y-m-d').' 12:00:00';
            if ($datetime2 > $date_now) {
                $end = $date_now->format('Y-m-d H:i:s');
            }else{
                $end = $datetime2->format('Y-m-d').' 23:59:59';
            }
        }

        $connection = ConnectionManager::get('default');
#        $query = 'select max(DATE_FORMAT(updated,"%D %b %l:%i %p")) as labels, batch_id, sum(total_products) as total_products, group_concat(im_selling) as avg1, group_concat(average_rank) as avg2,sum(im_selling) as im_selling,sum(im_lowest) as im_lowest,sum(i_have_buybox) as i_have_buybox from summary where user_id = '.$user_id.' and updated < "'.$end.'" and updated > "'.$start.'" and updated IS NOT NULL and batch_id <> 0 group by `batch_id` order by `updated`';
        $query = 'select max(DATE_FORMAT(updated,"%D %b %l:%i %p")) as labels, batch_id, group_concat(marketplace_id,"-",total_products) as total_products, group_concat(marketplace_id,"-",im_selling) as im_selling, group_concat(marketplace_id,"-",average_rank) as my_average_rank, group_concat(marketplace_id,"-",im_lowest) as im_lowest,group_concat(marketplace_id,"-",i_have_buybox) as i_have_buybox from summary where user_id = '.$user_id.' and updated < "'.$end.'" and updated > "'.$start.'" and updated IS NOT NULL and batch_id <> 0 group by `batch_id` order by `updated`';

#        $query = 'select max(DATE_FORMAT(sum.updated,"%D %b %l:%i %p")) as labels, batch_id, group_concat(sum.marketplace_id,"-",sum.total_products) as total_products, group_concat(sum.marketplace_id,"-",sum.im_selling) as im_selling, group_concat(sum.marketplace_id,"-",sum.average_rank) as my_average_rank, group_concat(sum.marketplace_id,"-",sum.im_lowest) as im_lowest,group_concat(sum.marketplace_id,"-",sum.i_have_buybox) as i_have_buybox from summary sum inner join scheduler s on s.user_id = sum.user_id and s.marketplace_id = sum.marketplace_id where sum.user_id = '.$user_id.' and sum.updated < "'.$end.'" and sum.updated > "'.$start.'" and sum.updated IS NOT NULL and sum.batch_id <> 0 group by `batch_id` order by sum.updated';
        $data = $connection->execute($query)->fetchAll('assoc');
        $finalData = [];
        $finalData['values'] = [];

        $fields = [
            'my_average_rank',
            'im_lowest',
            'im_selling',
            'i_have_buybox',
            'total_products',
        ];

/*        $data = [
            [
                'labels' => 1,
                'total_products' => '2-5,1-2',
                'im_selling' => '1-3,2-4',
                'im_lowest' => '2-5,1-4',
                'my_average_rank' => '1-5,2-2',
                'i_have_buybox' => '2-5,1-2',
            ],
            [
                'labels' => 2,
                'total_products' => '2-15,1-2',
                'im_selling' => '1-3,2-4',
                'im_lowest' => '2-7,1-4',
                'my_average_rank' => '1-5,2-2',
                'i_have_buybox' => '2-5,1-2',
            ],

            [
                'labels' => 4,
                'total_products' => '1-9',
                'im_selling' => '1-4',
                'im_lowest' => '1-4',
                'my_average_rank' => '1-5',
                'i_have_buybox' => '1-2',
            ],
            [
                'labels' => 3,
                'total_products' => '2-9,1-2',
                'im_selling' => '1-3,2-4',
                'im_lowest' => '2-6,1-4',
                'my_average_rank' => '1-5,2-2',
                'i_have_buybox' => '2-5,1-2',
            ]
        ];*/


        $new_data = [];
        for($i = 0; $i < count($data); $i ++) {
            $finalData['labels'][] = $data[$i]['labels'];
            foreach($fields as $field) {
                $sum = explode(',',$data[$i][$field]);
                $mps = [1 => 'amazon', 2 => 'flipkart']; //need to fect this per user or globally - TODO
                foreach($sum as $s) {
                    $new = explode('-',$s);
                    if(isset($mps[$new[0]]))
                    {
                        $new_data[$field][$i][$new[0]] = $new[1];
                        unset($mps[$new[0]]);
                    }
                }
                if(!empty($mps)) {
                    $latest_mp_record = [];
                    foreach($mps as $marketplace_id => $value) {
                        for($j = ($i -1) ; $j >= 0; $j-- ) {
                            $latest_mp_record[] = $new_data[$field][$j][$marketplace_id];
                        }
                        $new_data[$field][$i][$marketplace_id] = reset($latest_mp_record);
                    }
                }
            }
        }

        foreach($new_data as $field => $value)  {
            for($i = 0; $i < count($value); $i++) {
                if($field == 'my_average_rank') {
                    $numer = [];
                    foreach($value[$i] as $key => $v) {
                        $numer[] = $v * $new_data['im_selling'][$i][$key];
                    }
                    if(array_sum($new_data['im_selling'][$i]) == 0) {
                        $finalData['values'][$field][$i] = 0;
                    } else {
                        $finalData['values'][$field][$i] = round(array_sum($numer)/array_sum($new_data['im_selling'][$i]),2);
                    }
                } else {
                    $finalData['values'][$field][$i] = array_sum($value[$i]);
                }
            }
        }

        $finalData['query'] = $query;
        return $finalData;
    }



    public function getTrendChartData($user_id,$start,$end,$range){
      $lastSummary = [];
      $trends = array(
        'i_have_buybox' => array(),
        'im_lowest' => array(),
        'im_selling' => array(),
        'my_average_rank' => array(),
        'total_products' => array()
      );
      $labels = array();


      $conditions = ['Summary.user_id' => $user_id, 'Summary.updated >' => $start, 'Summary.updated <=' => $end, 'Summary.updated IS NOT' => NULL];
      $summaries = $this->find()->where($conditions)->order(['updated'=>'ASC'])->toArray();

      $dt = array();
      foreach($summaries as $summary){

        if($summary['total_products'] <= 0){
          continue;
        }

        if($summary['marketplace_id'] == 1){
          $missing_mp_id = 2;
        }else{
          $missing_mp_id = 1;
        }

        $set2 = $this->find()->where(['Summary.user_id' => $user_id, 'Summary.marketplace_id' => $missing_mp_id, 'Summary.updated >=' => $summary['updated'], 'Summary.updated IS NOT' => NULL])->order(['updated'=>'ASC'])->toArray();

        if(count($set2) > 0){
          $datekey = $set2[0]['updated']->format('Y-m-d H:i');
          if(!array_key_exists($datekey, $dt)){
              $dt[$datekey] = array($summary,$set2[0]);
            }
        }else{
          $set3 = $this->find()->where(['Summary.user_id' => $user_id, 'Summary.marketplace_id' => $missing_mp_id, 'Summary.updated <=' => $summary['updated'], 'Summary.updated IS NOT' => NULL])->order(['updated'=>'DESC'])->toArray();
          if(count($set3) > 0){
            $datekey = $summary['updated']->format('Y-m-d H:i');
            $dt[$datekey] = array($summary,$set3[0]);
          }else{
            $datekey = $summary['updated']->format('Y-m-d H:i');
            $dt[$datekey] = array($summary);
          }

        }

      }

      foreach($dt as $key => $smdata){
        $generatedSummary = $this->generateTopMetrics($smdata);

        if($generatedSummary['product_count'] <= 0){
          continue;
        }

          $ldate = \DateTime::createFromFormat('Y-m-d H:i', $key);
          if($range == '24h'){
            $label = $ldate->format('D h:i a');
          }else if($range == '48h'){
            $label = $ldate->format('D h:i a');
          }else if($range == '7d'){
            $label = $ldate->format('jS M h:i a');
          }else if($range == '30d'){
            $label = $ldate->format('jS M h:i a');
          }else{
            $label = $ldate->format('jS M h:i a');
          }


          $labels[] = $label;

          $trends['i_have_buybox'][] = $generatedSummary['i_have_buybox'];
          $trends['im_lowest'][] = $generatedSummary['im_lowest'];
          $trends['im_selling'][] = $generatedSummary['im_selling'];
          $trends['my_average_rank'][] = $generatedSummary['my_avg_rank'];
          $trends['total_products'][] = $generatedSummary['product_count'];
      }

      $data = array(
        'values'=> $trends,
        'labels'=> $labels
      );

      return $data;
    }






    public function getTrendMetricsData($user_id,$start,$end){
      $conditions = ['Summary.user_id' => $user_id, 'Summary.updated >' => $start, 'Summary.updated <=' => $end];
      $summaries = $this->find()->where($conditions)->group(['Summary.group_id','Summary.marketplace_id'])->order(['Summary.created'=>'DESC'])->toArray();

      $data = array(
        "won_buy_box"=> 0,
        "won_lowest_price"=> 0,
        "lost_buybox"=> 0,
        "lost_lowest_price"=> 0,
        "comp_price_changed"=> 0,
        "new_sellers"=> 0,
        "seller_stocked_out"=> 0,
        "seller_restocked"=> 0,
        "listings_with_changes"=> 0
      );

      foreach($summaries as $summary){

        if($summary['won_buy_box'] > 0){
          $data['won_buy_box'] = $data['won_buy_box']+$summary['won_buy_box'];
        }

        if($summary['won_lowest_price'] > 0){
          $data['won_lowest_price'] = $data['won_lowest_price']+$summary['won_lowest_price'];
        }

        if($summary['lost_buy_box'] > 0){
          $data['lost_buybox'] = $data['lost_buybox']+$summary['lost_buy_box'];
        }

        if($summary['lost_lowest_price'] > 0){
          $data['lost_lowest_price'] = $data['lost_lowest_price']+$summary['lost_lowest_price'];
        }

        if($summary['competition_changed_price'] > 0){
          $data['comp_price_changed'] = $data['comp_price_changed']+$summary['competition_changed_price'];
        }

        if($summary['new_sellers_entered'] > 0){
          $data['new_sellers'] = $data['new_sellers']+$summary['new_sellers_entered'];
        }

        if($summary['sellers_stocked_out'] > 0){
          $data['seller_stocked_out'] = $data['seller_stocked_out']+$summary['sellers_stocked_out'];
        }

        if($summary['sellers_stocked_again'] > 0){
          $data['seller_restocked'] = $data['seller_restocked']+$summary['sellers_stocked_again'];
        }

        if($summary['listing_with_changes'] > 0){
          $data['listings_with_changes'] = $data['listings_with_changes']+$summary['listing_with_changes'];
        }

      }
      return $data;
    }







    public function generateTrendSummaryData($user_id,$marketplace_id){

      $productsTable = TableRegistry::get('Products');
      
      // $isDirty = $productsTable->exists(['user_id' =>$user_id, 'marketplace_id'=>$marketplace_id, 'dirty' => true]);
      //
      // if($isDirty){
      //   return array(
      //     'total_products' => 0
      //   );
      // }

      $summary = $productsTable->getTopMetrics($user_id,['marketplace_id'=>$marketplace_id]);
      $data = array(
        'total_products' => $summary['product_count'],
        'im_only_seller' => $summary['im_only_seller'],
        'i_have_buybox' => $summary['i_have_buybox'],
        'im_lowest' => $summary['im_lowest'],
        'im_not_lowest' => $summary['im_not_lowest'],
        'im_in_top_10' => $summary['im_in_top_ten'],
        'im_selling' => $summary['im_selling'],
        'im_not_selling' => $summary['im_not_selling'],
        'average_rank' => $summary['my_avg_rank'],

          'won_buy_box' => $summary['won_buy_box'],
          'won_lowest_price' => $summary['won_lowest_price'],
          'lost_buy_box' => $summary['lost_buy_box'],
          'lost_lowest_price' => $summary['lost_lowest_price'],

      );
      return $data;
    }












}
