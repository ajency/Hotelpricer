<?php
namespace App\Controller;


use App\Controller\AppController;
use Cake\Filesystem\Folder;
use Cake\Filesystem\File;
use Cake\ORM\TableRegistry;
use Cake\Datasource\ConnectionManager;
use Cake\Network\Exception\NotFoundException;
use Cake\I18n\Time;

use Aws\Lambda\LambdaClient;

error_reporting(0);


class ApiController extends AppController
{

    public function index()
    {
        $usersTable = TableRegistry::get('Users');
        $users = $usersTable->find('all')->toArray();

        $this->set('users', $users);        
        $this->set('_serialize', ['users']);
    }

    

    public function startCrawl(){

        $this->autoRender = false;
          if ($this->request->is('get')) {
              $data = $this->request->query;

              $productsTable = TableRegistry::get('Products');
              $products = $productsTable->getTrackableProducs();

              if(count($products)>0){

                  $lambdaClient = LambdaClient::factory(array(
                    'credentials' => array(
                        'key'    => 'AKIAIDEGN7AA3NZ6M3AA',
                        'secret' => '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',
                        ),
                    'region'  => 'us-east-1',
                    'version' => 'latest'
                    ));

                  /*$output = $lambdaClient->invoke([
                    'FunctionName' => 'repricing-production',
                    'InvocationType' => 'RequestResponse',
                    'Payload' => json_encode(array('products'=>$products)),
                    'LogType' => 'Tail'
                    ]);*/

                  /*$asyncresult = $lambdaclient->invoke([
                    'FunctionName' => $functionName,
                    'InvocationType' => 'Event',
                    'Payload' => json_encode($payload),
                    ]);

                  $promise = $lambdaclient->invokeAsync([
                    'FunctionName' => $functionName,
                    'Payload' => json_encode($payload),
                    ]);*/

                  //$result = exec("/var/www/html/repricing/crawl_start.sh ".$product_ids." 2>&1", $output);
                  //$result = exec("aws lambda invoke --function-name repricing-production  --region us-east-1 output.txt 2>&1", $output);


                    foreach($products as $marketplace=>$ids){
                        $product_ids = implode(',', $ids);
                        $result = exec("/var/www/html/repricing/crawl_start.sh ".$marketplace." ".$product_ids." 2>&1", $output);
                    }

                    echo json_encode(array('success'=>'yes','message'=>$output));

                }else{
                    echo json_encode(array('success'=>'no','message'=>'No products matches the criteria!'));
                }

          }

    }





    public function getProducts(){
        $this->autoRender = false;
        if ($this->request->is('get')) {
            $data = $this->request->query;
            $productsTable = TableRegistry::get('Products');
            $sellersTable = TableRegistry::get('Sellers');
            $allProducts = $productsTable->getAllProducts();

            foreach ($allProducts as $key => $product) {

                $seller_data = array();
                foreach($product->product_seller_data as $psdata){
                    $psdata->updated_on_readable = Time::parse($psdata->updated_on)->nice();

                    if($psdata->fullfilled_by_marketplace){
                        $psdata->fullfilled_by_marketplace = 'Yes';
                    }else{
                        $psdata->fullfilled_by_marketplace = 'No';
                    }

                    if($psdata->covered_under_loyalty){
                        $psdata->covered_under_loyalty = 'Yes';
                    }else{
                        $psdata->covered_under_loyalty = 'No';
                    }

                    if(!array_key_exists($psdata->seller_id, $seller_data)){
                        $seller_data[$psdata->seller_id] = array();
                    }

                    $seller_data[$psdata->seller_id][] = $psdata;
                    
                }


                $sellers = array();
                foreach($seller_data as $sel_data){
                    if(count($sel_data)==1){
                        $sell_data = $sel_data[0];
                        $sell_data['more'] = array();
                        $sellers[] = $sell_data;
                    }else{
                        $sellers_data = array_reverse($sel_data);                        
                        $sell_data = $sellers_data[0];
                        
                        $more_data = array();
                        foreach($sellers_data as $key => $sl_data){
                            if($key>0){
                            $more_data[] = array(
                                'updated_on_readable'=>$sl_data->updated_on_readable,
                                'price'=>$sl_data->price,
                                'rating'=>$sl_data->rating,
                                'rating_count'=>$sl_data->rating_count,
                                'delivery'=>$sl_data->delivery,
                                'fullfilled_by_marketplace'=>$sl_data->fullfilled_by_marketplace,
                                'covered_under_loyalty'=>$sl_data->covered_under_loyalty
                                );
                            }
                        }
                        $sell_data['more'] = $more_data;
                        $sellers[] = $sell_data;
                    }                    
                }


                $product->seller_data = $sellers;

                $product->last_updated = Time::parse($product->last_updated)->nice();
            }

            echo json_encode(array('products'=>$allProducts));
        }
    }
    





}
