<?php
namespace App\Controller\Api;


use App\Controller\Api\AppController;
use Cake\Filesystem\Folder;
use Cake\Filesystem\File;
use Cake\ORM\TableRegistry;
use Cake\Datasource\ConnectionManager;
use Cake\Network\Exception\NotFoundException;
use Cake\I18n\Time;

use Aws\Lambda\LambdaClient;

error_reporting(0);


class TestApiController extends AppController
{

  public function initialize()
    {
        parent::initialize();
        $this->loadComponent('Crawler');
    }

    public function startCrawl(){

              $data = $this->request->data;

              $productsTable = TableRegistry::get('ProductsToBeTracked');
              $products = $productsTable->getTrackableProducs($data);

              // debug(json_encode($products));
              // exit;

              if(count($products)>0){

                    $output = $this->Crawler->run($products,true);
                    $this->set('success', 'yes');
                    $this->set('message', $output);

                }else{
                    $this->set('success', 'no');
                    $this->set('message', 'There should be atleast 5 miniutes interval to run the same crawler again!');
                }

                $this->set('_serialize', ['success','message']);
    }





    public function getProducts($marketplace_id){
        /*$this->autoRender = false;
        if ($this->request->is('get')) {*/
            $data = $this->request->query;
            $productsTable = TableRegistry::get('ProductsToBeTracked');
            $sellersTable = TableRegistry::get('Sellers');
            $allProducts = $productsTable->getAllProducts(['marketplace_id' => $marketplace_id]);

            $user = $this->Auth->identify();



            foreach ($allProducts as $key => $product) {

                $seller_data = array();
                foreach($product->product_seller_data as $psdata){
                    $psdata->updated_on_readable = Time::parse($psdata->updated_on)->nice();

                    if($psdata->fullfilled_by_marketplace){
                        $psdata->fullfilled_by_marketplace = 'Yes';
                    }else{
                        $psdata->fullfilled_by_marketplace = 'No';
                    }

                    if($psdata->buy_box){
                        $psdata->buy_box = 'Yes';
                    }else{
                        $psdata->buy_box = 'No';
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
                                'covered_under_loyalty'=>$sl_data->covered_under_loyalty,
                                'buy_box'=>$sl_data->buy_box,
                                'condition'=>$sl_data->condition
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

            //echo json_encode(array('products'=>$allProducts));


            $productwithMarketplace = array();
            foreach($allProducts as $product){
                if(!array_key_exists($product->marketplace_id, $productwithMarketplace)){
                    $productwithMarketplace[$product->marketplace_id] = array();
                }
                $productwithMarketplace[$product->marketplace_id][] = $product;
            }


            //$this->set('products', $allProducts);
            $this->set('productswithmarketplaces', $productwithMarketplace);
            //$this->set('user', $user);
            $this->set('_serialize', ['productswithmarketplaces']);
        //}
    }






}
