<?php
namespace App\Controller\Api;
use App\Controller\Api\AppController;
use Cake\ORM\TableRegistry;
use Cake\I18n\Time;
use Cake\Network\Exception\NotAcceptableException;
use Cake\Network\Exception\BadRequestException;

use Cake\Filesystem\Folder;
use Cake\Filesystem\File;
use Cake\ORM\Query;

class DashboardController extends AppController
{

  public function initialize()
    {
        parent::initialize();
        $this->loadModel('Summary');
    }

    public function index(){

        $queryData = $this->request->query;
        $user = $this->Auth->identify();
        $user_id = $user['id'];

        if (!$this->request->is(['get'])) {
            throw new BadRequestException('Bad request method!');
        }


        $productsTable = TableRegistry::get('Products');

        $allproducts = $productsTable->getAllProducts($queryData,$user_id);

        $seventhDay = date("Y-m-d", strtotime( "-7 days"));
        $dates = array();

        $product_count = count($allproducts->toArray());
        $at_my_min = 0;
        $at_my_max = 0;
        $buy_box = 0;
        $cheapest = 0;
        $need_min_max = 0;
        $only_seller = 0;
        $chartData = array();
        foreach($allproducts->toArray() as $prod){
          $product = $productsTable->generateProductData($prod);

          for($i = 1; $i <= 7; $i++){
            $startday = date("d-m-Y", strtotime( "$seventhDay +$i days"));

            // $chdata = array(
            //   'my_min' => 0,
            //   'my_max' => 0,
            //   'lowest' => 0
            // );
            // foreach($product['sellers'] as $seller){
            //   if($startday < $seller['updated_on']){
            //     //debug($seller['updated_on']);
            //     //debug($startday);
            //     if($seller['price'] == $product['repricing']['my_min']){
            //       //debug('min matches');
            //       $chdata['my_min']++;
            //     }
            //     if($seller['price'] == $product['repricing']['my_max']){
            //       //debug('max matches');
            //       $chdata['my_max']++;
            //     }
            //     if($seller['lowest'] == 'yes'){
            //       //debug('lowest matches');
            //       $chdata['lowest']++;
            //     }
            //   }
            // }

            //debug($chdata);

            // if(!array_key_exists($startday, $chartData)){
            //   $chartData[$startday] = $chdata;
            // }else{
            //   $chartData[$startday]['my_min'] = $chartData[$startday]['my_min']+$chdata['my_min'];
            //   $chartData[$startday]['my_max'] = $chartData[$startday]['my_max']+$chdata['my_max'];
            //   $chartData[$startday]['lowest'] = $chartData[$startday]['lowest']+$chdata['lowest'];
            // }



          }

          if($product['repricing']['my_min'] == $product['repricing']['my_price']){
            $at_my_min++;
          }

          if($product['repricing']['my_max'] == $product['repricing']['my_price']){
            $at_my_max++;
          }

          if($product['repricing']['is_buy_box'] == 'yes'){
            $buy_box++;
          }

          if($product['repricing']['is_min'] == 'yes'){
            $cheapest++;
          }

          if(is_null($product['repricing']['my_min']) || is_null($product['repricing']['my_max'])){
            $need_min_max++;
          }

          if(count($product['sellers']) == 1){
            $only_seller++;
          }

        }


        //debug($chartData);


        // $chartlabels = array();
        // $chartValue = array(
        //   'lowest' => array(),
        //   'my_min' => array(),
        //   'my_max' => array()
        // );
        // foreach($chartData as $key=>$chdata){
        //   $chartlabels[] = $key;
        //   $chartValue['lowest'][] = $chdata['lowest'];
        //   $chartValue['my_min'][] = $chdata['my_min'];
        //   $chartValue['my_max'][] = $chdata['my_max'];
        // }
        //
        // $chart = array(
        //   'labels' => $chartlabels,
        //   'values' => $chartValue
        // );



        $data = array(
          'product_count' => $product_count,
          'at_my_min' => $at_my_min,
          'at_my_max' => $at_my_max,
          'buy_box' => $buy_box,
          'cheapest' => $cheapest,
          'need_min_max' => $need_min_max,
          'only_seller' => $only_seller,
          'chart_data' => []
        );

        $this->set('success', true);
        $this->set('data', $data);
        $this->set('_serialize', ['success','data']);
    }







    public function getMetrics(){
      $queryData = $this->request->query;
      $user = $this->Auth->identify();
      $user_id = $user['id'];

      if (!$this->request->is(['get'])) {
          throw new BadRequestException('Bad request method!');
      }

      $productsTable = TableRegistry::get('Products');
      $data = $productsTable->getTopMetrics($user_id,$queryData);

      $last_summary = $this->Summary->find()->where(['user_id' => $user_id, 'updated IS NOT' => NULL])->order(['updated' => 'DESC'])->first();

      if($last_summary){
        $data['last_updated'] = Time::parse($last_summary->updated)->nice();
      }else{
        $data['last_updated'] = '';
      }




      // $summaries = $this->Summary->getMarketplaceTopSummaries($user_id);
      //
      // if(isset($queryData['marketplace_id'])){
      //   $data = $this->Summary->generateTopMetrics($summaries[$queryData['marketplace_id']]);
      // }else{
      //   $data = $this->Summary->generateTopMetrics(array_merge($summaries['1'], $summaries['2']));
      // }

      $this->set('success', true);
      $this->set('data', $data);
      $this->set('queryData', $queryData);
      $this->set('_serialize', ['success','data','queryData']);
    }



    public function get24HourMetric() {
        $queryData = $this->request->query;
        $user = $this->Auth->identify();
        $user_id = $user['id'];

        if (!$this->request->is(['get'])) {
            throw new BadRequestException('Bad request method!');
        }

        $productsTable = TableRegistry::get('Products');
        $data = $productsTable->get24HourMetric($user_id);

        $this->set('success', true);
        $this->set('data', $data);
        $this->set('queryData', $queryData);
        $this->set('_serialize', ['success','data','queryData']);
    }



    public function getMarketplaceMetrics(){
      $queryData = $this->request->query;
      $user = $this->Auth->identify();
      $user_id = $user['id'];

      if (!$this->request->is(['get'])) {
          throw new BadRequestException('Bad request method!');
      }

      $productsTable = TableRegistry::get('Products');
      $amazonData = $productsTable->getTopMetrics($user_id,array('marketplace_id'=>1));
      $amazonData['marketid'] = 1;
      $amazonData['market'] = 'Amazon';
      $flipkartData = $productsTable->getTopMetrics($user_id,array('marketplace_id'=>2));
      $flipkartData['marketid'] = 2;
      $flipkartData['market'] = 'Flipkart';
      $data = array(
        $amazonData,
        $flipkartData
      );
      //debug($data);

      $this->set('success', true);
      $this->set('data', $data);
      $this->set('queryData', $queryData);
      $this->set('_serialize', ['success','data','queryData']);
    }

    public function getTrendchart(){
      $queryData = $this->request->query;
      $user = $this->Auth->identify();
      $user_id = $user['id'];

      if (!$this->request->is(['get'])) {
        throw new BadRequestException('Bad request method!');
      }


      $data = $this->Summary->getTrendChartData2($user_id,$queryData['range']);
      $this->set('success', true);
      $this->set('data', $data);
      $this->set('queryData', $queryData);
      $this->set('_serialize', ['success','data','queryData']);
    }




/*    public function getTrendchart(){
      $queryData = $this->request->query;
      $user = $this->Auth->identify();
      $user_id = $user['id'];

      if (!$this->request->is(['get'])) {
          throw new BadRequestException('Bad request method!');
      }

      $labels = array();
      $ranges = array();
      $date_now = new \DateTime();

      if($queryData['range'] == '24h'){
        $start = date("Y-m-d H:i:s", strtotime( "-24 hours"));
        $end = $date_now->format('Y-m-d H:i:s');
        // $seventhDay = date("Y-m-d H:i:s", strtotime( "-24 hours"));
        // for($i = 1; $i <= 24; $i++){
        //   //if($i % 3 == 0 || $i==1)  {
        //     $startday = date("D h:i a", strtotime( "$seventhDay +$i hours"));
        //     $labels[] = $startday;
        //     $ranges[] = date("Y-m-d H:i:s", strtotime( "$seventhDay +$i hours"));
        //   //}
        //   }
      }else if($queryData['range'] == '48h'){
        $start = date("Y-m-d H:i:s", strtotime( "-48 hours"));
        $end = $date_now->format('Y-m-d H:i:s');
        // $seventhDay = date("Y-m-d H:i:s", strtotime( "-48 hours"));
        // for($i = 1; $i <= 48; $i++){
        //   //if($i % 3 == 0 || $i==1)  {
        //     $startday = date("D h:i a", strtotime( "$seventhDay +$i hours"));
        //     $labels[] = $startday;
        //     $ranges[] = date("Y-m-d H:i:s", strtotime( "$seventhDay +$i hours"));
        //   //}
        //   }
      }else if($queryData['range'] == '7d'){
        $start = date("Y-m-d", strtotime( "-7 days")).' 00:00:01';
        $end = $date_now->format('Y-m-d H:i:s');

        // $seventhDay = date("Y-m-d", strtotime( "-7 days"));
        // $rangeDay = date("Y-m-d H:i:s", strtotime( "-7 days"));
        // debug($seventhDay);
        // for($i = 1; $i <= 7; $i++){
        //     $startday = date("D jS M", strtotime( "$seventhDay +$i days"));
        //     $labels[] = $startday;
        //     $ranges[] = date("Y-m-d H:i:s", strtotime( "$rangeDay +$i days"));
        //   }
      }else if($queryData['range'] == '30d'){
        $start = date("Y-m-d", strtotime( "-30 days")).' 00:00:01';
        $end = $date_now->format('Y-m-d H:i:s');

        // $seventhDay = date("Y-m-d", strtotime( "-30 days"));
        // $rangeDay = date("Y-m-d H:i:s", strtotime( "-30 days"));
        // for($i = 1; $i <= 30; $i++){
        //     $startday = date("jS M", strtotime( "$seventhDay +$i days"));
        //     $labels[] = $startday;
        //     $ranges[] = date("Y-m-d H:i:s", strtotime( "$rangeDay +$i days"));
        //   }
      }else{
        list($startDate, $endDate) = explode(' - ', $queryData['range']);
        $datetime1 = \DateTime::createFromFormat('d/m/Y', $startDate);
        $datetime2 = \DateTime::createFromFormat('d/m/Y', $endDate);
        $start = $datetime1->format('Y-m-d').' 12:00:00';
        if ($datetime2 > $date_now) {
          $end = $date_now->format('Y-m-d H:i:s');
        }else{
          $end = $datetime2->format('Y-m-d').' 23:59:59';
        }


        // $days_count = $datetime1->diff($datetime2)->format('%a');
        // $calculate_days_count = $days_count+1;
        // $customDay = date("Y-m-d", strtotime( "-".$calculate_days_count." days"));
        // $rangeDay = date("Y-m-d H:i:s", strtotime( "-".$calculate_days_count." days"));
        // for($i = 1; $i <= $calculate_days_count; $i++){
        //     $startday = date("jS M y", strtotime( "$customDay +$i days"));
        //     $labels[] = $startday;
        //     $ranges[] = date("Y-m-d H:i:s", strtotime( "$rangeDay +$i days"));
        //   }
      }

      $data = $this->Summary->getTrendChartData($user_id,$start,$end,$queryData['range']);

      // $data = array(
      //   'values'=> $this->Summary->getTrendChartData($user_id,$ranges),
      //   'labels'=> $labels
      // );

      $this->set('success', true);
      $this->set('data', $data);
      $this->set('queryData', $queryData);
      $this->set('_serialize', ['success','data','queryData']);
    }*/





    public function getTrendMetrics(){
      $queryData = $this->request->query;
      $user = $this->Auth->identify();
      $user_id = $user['id'];

      if (!$this->request->is(['get'])) {
          throw new BadRequestException('Bad request method!');
      }

      if($queryData['range'] == '24h'){
        $date_now = new \DateTime();
        $start = date("Y-m-d H:i:s", strtotime( "-24 hours"));
        $end = $date_now->format('Y-m-d H:i:s');
      }else if($queryData['range'] == '48h'){
        $date_now = new \DateTime();
        $start = date("Y-m-d H:i:s", strtotime( "-48 hours"));
        $end = $date_now->format('Y-m-d H:i:s');
      }else if($queryData['range'] == '7d'){
        $date_now = new \DateTime();
        $start = date("Y-m-d H:i:s", strtotime( "-7 days"));
        $end = $date_now->format('Y-m-d H:i:s');
      }else if($queryData['range'] == '30d'){
        $date_now = new \DateTime();
        $start = date("Y-m-d H:i:s", strtotime( "-30 days"));
        $end = $date_now->format('Y-m-d H:i:s');
      }else{
        list($startDate, $endDate) = explode(' - ', $queryData['range']);
        $date_now = new \DateTime();
        $datetime1 = \DateTime::createFromFormat('d/m/Y', $startDate);
        $datetime2 = \DateTime::createFromFormat('d/m/Y', $endDate);
        if ($datetime2 > $date_now) {
          $datetime2 = $date_now;
        }
        $start = $datetime1->format('Y-m-d H:i:s');
        $end = $datetime2->format('Y-m-d H:i:s');
      }

      $data = $this->Summary->getTrendMetricsData($user_id,$start,$end);

      $this->set('success', true);
      $this->set('data', $data);
      $this->set('queryData', $queryData);
      $this->set('_serialize', ['success','data','queryData']);
    }











}
