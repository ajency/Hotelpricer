<?php
namespace App\Controller\Api;
use App\Controller\Api\AppController;
use Cake\ORM\TableRegistry;
use Cake\I18n\Time;
use Cake\Network\Exception\NotAcceptableException;
use Cake\Network\Exception\BadRequestException;

use Cake\Filesystem\Folder;
use Cake\Filesystem\File;

class ProductsController extends AppController
{
    public $paginate = [
        'page' => 1,
        'limit' => 3,
        'maxLimit' => 500,
        'sortWhitelist' => [
            'id', 'marketplace_id', 'listing_id', 'sku_code', 'min', 'max', 'rule_id', 'product_family', 'status', 'user_id', 'created_at', 'last_updated'
        ]
    ];

    public function initialize()
      {
          parent::initialize();
          $this->loadComponent('Crawler');
          $this->loadModel('Queue');
          $this->loadModel('Scheduler');
      }



    // public function fetchProducts(){
    //
    //     $queryData = $this->request->query;
    //     $user = $this->Auth->identify();
    //
    //     //debug($queryData);
    //
    //     $products = $this->paginate($this->Products->getAllProducts($queryData,$user['id']));
    //
    //     $pending_products = $this->Products->getPendingCounts($queryData,$user['id']);
    //     $first_crawled_not_succeeded = $this->Products->getFirstCrawlFailedCount($queryData,$user['id']);
    //
    //     $includesellers = true;
    //     if(array_key_exists('includesellers', $queryData)){
    //       if($queryData['includesellers'] == 'no'){
    //         $includesellers = false;
    //       }
    //     }
    //
    //     $data = array();
    //     foreach($products as $key=>$product){
    //         if(count($product->products_to_be_tracked)<=0){
    //             continue;
    //         }
    //         $data[] = $this->Products->generateProductData($product,$includesellers);
    //     }
    //
    //     $paginationData = $this->request->params['paging']['Products'];
    //     //$this->response->header('Access-Control-Allow-Origin', '*');
    //
    //     $this->set('success', true);
    //     $this->set('result_count', $paginationData['count']);
    //     $this->set('results_per_page', $paginationData['perPage']);
    //     $this->set('page', $paginationData['page']);
    //     $this->set('pending', $pending_products);
    //     $this->set('first_crawled_not_succeeded', $first_crawled_not_succeeded);
    //     $this->set('data', $data);
    //     $this->set('query_data', $queryData);
    //     $this->set('_serialize', ['success','result_count','results_per_page','page','pending','first_crawled_not_succeeded','data','query_data']);
    //     //echo json_encode($data);
    // }






    public function fetchProducts(){

        $queryData = $this->request->query;
        $user = $this->Auth->identify();

        $products = $this->paginate($this->Products->getProducts($queryData,$user['id']));


        $failed_conditions = array(
          'first_crawl_succeeded' => false,
          'user_id' => $user['id']
        );

        if(array_key_exists('marketplace_id', $queryData)){
            $failed_conditions['marketplace_id'] = $queryData['marketplace_id'];
        }

        $not_succeeded = $this->Products->find()->where($failed_conditions)->count();

        $data = array();
        foreach($products as $product){
          $data[] = $this->Products->generateSingleProductResponse($product);
        }

        $paginationData = $this->request->params['paging']['Products'];

        $this->set('success', true);
        $this->set('result_count', $paginationData['count']);
        $this->set('results_per_page', $paginationData['perPage']);
        $this->set('page', $paginationData['page']);
        $this->set('first_crawled_not_succeeded', $not_succeeded);
        $this->set('data', $data);
        $this->set('query_data', $queryData);
        $this->set('_serialize', ['success','result_count','results_per_page','page','pending','first_crawled_not_succeeded','data','query_data']);
    }





    public function edit($id = null)
    {
        //$user = $this->Auth->identify();

        $product = $this->Products->get($id, [
            'contain' => []
        ]);

        $invalid_data = [];
        $additional_fields = ['tracked_listings'];
        foreach($this->request->getData() as $key=>$value){
            if(!array_key_exists($key, $product->toArray())){
                if(!in_array($key, $additional_fields)){
                    $invalid_data[] = $key;
                }
            }
        }
        if(count($invalid_data)>0){
            throw new NotAcceptableException('Invalid field(s) '.implode(', ', $invalid_data));
        }

        if ($this->request->is(['patch', 'post', 'put'])) {
            $productpatch = $this->Products->patchEntity($product, $this->request->getData());
            $response = $this->Products->save($productpatch);

            //Handle completing listing ids update/create
            if(array_key_exists('tracked_listings', $this->request->getData())){
                $listing_ids = explode(',', $this->request->getData()['tracked_listings']);
                $listing_ids = array_map('trim',$listing_ids);
                $listing_ids = array_filter($listing_ids);

                $toBeTrackedTable = TableRegistry::get('ProductsToBeTracked');

                $existing_ids = $toBeTrackedTable->getListingIds($id);

                $upload_id = $toBeTrackedTable->getUploadId($id);

                foreach($existing_ids as $key=>$value){
                    if(!in_array($value, $listing_ids) && $value != $product['listing_id']){
                        $toBeTrackedTable->toggleActivate(false,$key);
                    }
                }

                /*debug($listing_ids);
                exit;*/

                foreach($listing_ids as $key=>$value){
                    $value = trim($value);

                    $trackexists = $toBeTrackedTable->exists(['product_id' => $response->id, 'marketplace_id' => $product['marketplace_id'], 'listing_id' => $value]);
                    if($trackexists){
                        $toBeTrackedTable->toggleActivate(true,null,$response->id,$value);
                        continue;
                    }

                    $tracked = array(
                        'product_id'=>$id,
                        'marketplace_id'=>$product['marketplace_id'],
                        'listing_id'=>$value,
                        'listing_url'=>$this->Products->generateListingUrl($value,$product['marketplace_id']),
                        'created_at'=>Time::now(),
                        'upload_id'=>$upload_id,
                        'crawl_status'=>'Pending',
                        'is_competition' => true
                        );
                    $toBeTrackedTable->saveTrackableProduct($tracked);
                }
            }

            $product_data = $this->Products->getSingleProduct($id);
            //$updated_data = $this->Products->generateProductData($product_data);
            $updated_data = $this->Products->generateSingleProductResponse($product_data);


            //Start Crawl, Dont wait for response.
            $trproducts = $toBeTrackedTable->getTrackableProducs(array('product_ids'=>[$id]), true);


            if ($response) {

                foreach($trproducts as $marketplace => $ids){
                    $sendToCrawler[$marketplace] = $ids;

                    $user = $this->Auth->identify();
                    $user_id = $user['id'];

                    $query = $this->Scheduler->find('all', [
                        'conditions' => ['Scheduler.user_id' => $user_id, 'Scheduler.marketplace_id' => $product['marketplace_id']]
                    ]);
                    $ref_id = $query->first();

                    $summaryTable = TableRegistry::get('Summary');
                    $global_batch_id = md5(uniqid(rand(), true));
                    $group_id = time().rand(10*45, 100*98);
                    $batch_id = substr(base_convert($global_batch_id, 16, 10) , -(14 - strlen($ref_id->user_id))).$ref_id->user_id;
                    $this->Queue->addQueueItem($sendToCrawler,$ref_id->id,1,0,$group_id);
                    $summaryTable->saveGroupEntry($group_id,$batch_id,$ref_id->id);

                    /*                $product_ids = implode(',', $ids);
                                    exec(ROOT."/crawl_start.sh ".$marketplace." ".$product_ids." > /dev/null 2>&1 &");*/
                }

                $product = $this->set('trproducts',$trproducts);
                $product = $this->set('success',true);
                $product = $this->set('product',$updated_data);
            }else{
                $product = $this->set('success',false);
                $product = [];
            }
        }else{
            throw new BadRequestException('Bad request method');
        }

        $this->set('_serialize', ['success','product', 'trproducts']);

    }




    public function importProducts(){

        if ($this->request->is(['patch', 'get', 'put'])) {
            throw new BadRequestException('Bad request method!');
        }

        $postData = $this->request->getData();


        $path = WWW_ROOT.'uploads/product-sheets/';
        $path = preg_replace("@webroot\/@","tmp/",$path);

        if(!file_exists($path)){
         new Folder($path,true,0777);
       }

       $allowedExtensions = ['xls','xlsx','xl'];


        if(isset($postData['url'])){

          if(!isset($postData['filename'])){
            throw new NotAcceptableException('Filename is missing!');
          }

          $file_name = $postData['filename'];
          $file_parts = explode('.', $file_name);
          $unique_name = $file_parts[0].'_'.date('m-d-Y_hia').'.'.$file_parts[1];
          if(!in_array($file_parts[1],$allowedExtensions)){
            throw new NotAcceptableException('Invalid file type!');
          }

          $downlaoded = file_put_contents(
            $path.$unique_name,
            file_get_contents($postData['url'])
            );
            if($downlaoded){
              $filepath = $path.$unique_name;
            }else{
              throw new NotAcceptableException('File downlaod failed from remote url!');
            }

        }else{
          if(!isset($this->request->data['file'])){
              throw new NotAcceptableException('No file uploaded!');
          }

           $info = new \finfo(FILEINFO_MIME_TYPE);
           $file_name = basename($this->request->data['file']['name']);

           $file_parts = explode('.', $file_name);
           $unique_name = $file_parts[0].'_'.date('m-d-Y_hia').'.'.$file_parts[1];

           if(!in_array($file_parts[1],$allowedExtensions)){
             throw new NotAcceptableException('Invalid file type!');
           }

            $filepath = $path.$unique_name;
            if(!move_uploaded_file($this->request->data['file']['tmp_name'],$filepath)){
              throw new NotAcceptableException('File upload failed!');
            }
        }


          $sheetdata = $this->Products->excelToArray($filepath);

          if(count($sheetdata)<=0){
            throw new NotAcceptableException('Empty file uploaded. No records found!');
          }

          $errors = $this->Products->validateImportSheet($sheetdata);

          if(count($errors)>0){
            $this->set('success', false);
            $this->set('errors', $errors);
          }else{

            $user = $this->Auth->identify();
            $products_imported = $this->Products->importProducts($filepath,$file_name,$user['id']);
	//	debug($filepath);

            if(count($products_imported)<=0){
              throw new NotAcceptableException('The file rows already imported. Try with new data!');
              unlink($filepath);
            }

            if(!$products_imported){
                throw new NotAcceptableException('Unable to import file!');
                unlink($filepath);
            }

            $this->set('success', true);
            $this->set('status', 'Crawling');
            $this->set('products_imported', $products_imported);

          }

        $this->set('_serialize', ['success','products_imported','status','errors']);
    }





    public function exportProducts(){

        if ($this->request->is(['patch', 'get', 'put'])) {
            throw new BadRequestException('Bad request method!');
        }

          $user = $this->Auth->identify();
          $postData = $this->request->data;

          $file = $this->Products->generateExcel($postData,$user['id']);

          if(array_key_exists('is_competing', $postData)){
            $filename = 'Competing_listings_'.date('d-m-Y');
          }else{
            $filename = 'All_products_'.date('d-m-Y');
          }

          if(array_key_exists('is_empty', $postData)){
            $filename = 'Empty_template_'.date('d-m-Y');
          }

        $this->set('success', true);
        $this->set('file', $file);
        $this->set('name', $filename);
        $this->set('_serialize', ['success','name','file']);
    }




    public function crawlProducts(){
        if ($this->request->is(['patch', 'get', 'put'])) {
            throw new BadRequestException('Bad request method!');
        }

        $postData = $this->request->data;

        if(!array_key_exists('product_ids', $postData)){
            throw new NotAcceptableException('Product ids missing');
        }

        $productsTable = TableRegistry::get('ProductsToBeTracked');
        $products = $productsTable->getTrackableProducs($postData);

        // $output = '';
        //
        // foreach($products as $marketplace=>$ids){
        //     $product_ids = implode(',', $ids);
        //     $result = exec(ROOT."/crawl_start.sh ".$marketplace." ".$product_ids." 2>&1", $output);
        // }
        $output = $this->Crawler->run($products,true);

        $this->set('products', $products);
        $this->set('success', true);
        $this->set('_serialize', ['success','products']);
    }









    public function getProductInfo($product_id = null){

      $product = $this->Products->get($product_id, [
          'contain' => ['ProductsToBeTracked']
      ]);



      $product->created_at = Time::parse($product->created_at)->nice();
      $product->last_updated = Time::parse($product->last_updated)->nice();

      $listing_ids = array();
      foreach($product->products_to_be_tracked as $key=>$track){
        if(($product->listing_id != $track->listing_id) && ($track->active)){
          $track->created_at = Time::parse($track->created_at)->nice();
          $track->last_updated = Time::parse($track->last_updated)->nice();
          $listing_ids[] = $track->listing_id;
        }else{
          unset($product->products_to_be_tracked[$key]);
          $product->products_to_be_tracked = array_values($product->products_to_be_tracked);
        }

      }
      $product->tracked_listings = implode(', ', $listing_ids);

      if (!$this->request->is(['get'])) {
        throw new BadRequestException('Bad request method!');
      }

      if(!is_numeric($product_id)){
        throw new NotAcceptableException('Invalid product ID!');
      }

      $this->set('data', $product);
      $this->set('success', true);
      $this->set('_serialize', ['success','data']);

    }


    public function testRequest(){
      $this->set('data','dummy data');
      $this->set('_serialize', ['data']);
    }




    public function getSingleProductDetails($product_id = null){

      if (!$this->request->is(['get'])) {
        throw new BadRequestException('Bad request method!');
      }

      if(!is_numeric($product_id)){
        throw new NotAcceptableException('Invalid product ID!');
      }

      $product = $this->Products->getSingleProduct($product_id);
      $product_data = $this->Products->generateSingleProductResponse($product);

      $this->set('data', $product_data);
      $this->set('success', true);
      $this->set('_serialize', ['success','data']);

    }





}
