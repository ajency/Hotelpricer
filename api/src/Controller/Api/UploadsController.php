<?php
namespace App\Controller\Api;
use App\Controller\Api\AppController;
use Cake\ORM\TableRegistry;
use Cake\I18n\Time;
use Cake\Network\Exception\NotAcceptableException;
use Cake\Network\Exception\BadRequestException;

use Cake\Filesystem\Folder;
use Cake\Filesystem\File;

class UploadsController extends AppController
{

  public $paginate = [
      'page' => 1,
      'limit' => 10,
      'maxLimit' => 200,
      'sortWhitelist' => [
          'id', 'file_name', 'status', 'no_of_listing', 'no_of_rows', 'created'
      ]
  ];



    public function fetchAll(){

        $queryData = $this->request->query;
        $user = $this->Auth->identify();

        if (!$this->request->is('get')) {
            throw new BadRequestException('Bad request method!');
        }

        if(array_key_exists('filters', $queryData)){
          if(array_key_exists('uploaded_on', $queryData['filters'])){
            if(!$this->validate_date_reg($queryData['filters']['uploaded_on'])){
              throw new NotAcceptableException('Invalid date format!');
            }
          }
        }

        $uploads = $this->paginate($this->Uploads->getAllUploads($queryData,$user['id']));

        $data = array();
        foreach($uploads as $upload){

            $set_status = false;
            if($upload['status'] == 'Crawling') {
                $productsToBeTrackedTable = TableRegistry::get('ProductsToBeTracked');
                $in_progress = $productsToBeTrackedTable->exists([ 'failed_attempt_count' => 0, 'first_crawl_succeeded' => 0, 'dirty' => 1, 'upload_id' => $upload['id']]);
                if(!$in_progress) {
                    $set_status = 'Processed';
                    $uploadsTable = TableRegistry::get('Uploads');
                    $set = ['status' => 'Processed'];
                    $uploadsTable->query()->update()
                        ->set($set)
                        ->where(['id' => $upload['id']])
                        ->execute();
                }
            }


            $dt = array(
                'id' => $upload['id'],
                'file_name'=>$upload['file_name'],
                'status' => $set_status == true ? $set_status : $upload['status'],
                'no_of_listing'=>$upload['no_of_listing'],
                'no_of_rows'=>$upload['no_of_rows'],
                'created'=>Time::parse($upload['created'])->nice()
                );
            $data[] = $dt;
        }

        $import_crawl_limit = 50;
        $productsTable = TableRegistry::get('Products');
        $query = $productsTable->query()->find('all', [
            'conditions' => ['user_id' => $user['id'], 'status' => 1]
        ]);
        $i = $query->count();
        $message = [];
        $last_upload = $uploads->first();

        $message['last_upload'] = $last_upload;
        $last_upload_details = unserialize($last_upload['details']);
        $message['last_import_id'] = $last_upload['id'];
        $message['total_products'] = $i;
        $message['credits'] = $import_crawl_limit;
        $message['no_of_rows'] = $last_upload['no_of_rows'];
        $message['no_of_listing'] = $last_upload['no_of_listing'];
        $message['credits_remaining'] = ($import_crawl_limit - $i);
        $message['last_credits_used'] = isset($last_upload_details['credits_used']) ? $last_upload_details['credits_used'] : 0;
        $message['skipped'] = isset($last_upload_details['skipped']) ? $last_upload_details['skipped'] : 0;
        $message['is_crawling'] = $last_upload['status'] == 'Crawling' ? 1 : 0;
        $message['is_processed'] = $last_upload['status'] == 'Processed' ? 1 : 0;
        $message['is_import'] = $last_upload['status'] == 'Importing' ? 1 : 0;
        $message['upload_created_time'] = strtotime($last_upload['created']);
        $message['current_time'] = time();

        $message['marked_as_inactive'] = $message['no_of_rows'] - ($message['last_credits_used'] + $message['skipped']);
        if($message['marked_as_inactive'] == $message['no_of_rows']) {
            $message['marked_as_inactive'] = 0;
        }

        //reset alert box is new import detected by creation time
        if($queryData['hideAlertBox'] == 1 && $queryData['last_import_id'] != $message['last_import_id'])
        {
            $queryData['hideAlertBox'] = 0;
        }
/*        if($message['is_import'] || $message['is_crawling']) {
            $queryData['hideAlertBox'] = 0;
        }*/

        $paginationData = $this->request->params['paging']['Uploads'];

        $this->set('success', true);
        $this->set('result_count', $paginationData['count']);
        $this->set('results_per_page', $paginationData['perPage']);
        $this->set('page', $paginationData['page']);
        $this->set('data', $data);
        $this->set('message', $message);
        $this->set('query_data', $queryData);
        $this->set('_serialize', ['success','result_count','results_per_page','page','data','message','query_data']);
    }



    public function getResult($upload_id = NULL){

        $queryData = $this->request->query;
        $user = $this->Auth->identify();

        if (!$this->request->is('get')) {
            throw new BadRequestException('Bad request method!');
        }

        if(!is_numeric($upload_id)){
          throw new NotAcceptableException('Invalid upload ID!');
        }

        $upload = $this->Uploads->findById($upload_id)->first();
        if(empty($upload)){
          throw new NotAcceptableException('Upload id does not exist!');
        }

        $details = unserialize($upload->details);
        if(!array_key_exists('product_ids', $details)){
          throw new NotAcceptableException('No products found for the uplaod ID!');
        }

        $product_ids = $details['product_ids'];
        if(count($product_ids)<=0){
          throw new NotAcceptableException('No listings found for the uplaod ID!');
        }

        // $productsTable = TableRegistry::get('Products');
        // $products = $this->paginate($productsTable->getUploadedProducts($queryData,$product_ids));

        $productsToBeTrackedTable = TableRegistry::get('ProductsToBeTracked');
        $products = $this->paginate($productsToBeTrackedTable->getUploadedTrackedProducts($queryData,$product_ids));

        $paginationData = $this->request->params['paging']['ProductsToBeTracked'];

        $data = array();
        foreach($products as $product){
            $dt = array(
                'listing_id' => $product['listing_id'],
                'created'=>Time::parse($product['created'])->nice(),
                'last_updated'=>Time::parse($product['last_updated'])->nice(),
                'status'=>$product['crawl_status']
                );
            $data[] = $dt;
        }


        $this->set('success', true);
        $this->set('result_count', $paginationData['count']);
        $this->set('results_per_page', $paginationData['perPage']);
        $this->set('page', $paginationData['page']);
        $this->set('data', $data);
        $this->set('query_data', $queryData);
        $this->set('_serialize', ['success','result_count','results_per_page','page','data','query_data']);

      }




  public function getFile($upload_id = NULL){
    $queryData = $this->request->query;
    $user = $this->Auth->identify();

    if (!$this->request->is('get')) {
        throw new BadRequestException('Bad request method!');
    }

    if(!is_numeric($upload_id)){
      throw new NotAcceptableException('Invalid upload ID!');
    }

    $upload = $this->Uploads->findById($upload_id)->first();
    if(empty($upload)){
      throw new NotAcceptableException('Upload id does not exist!');
    }

    //$filedata = file_get_contents($upload->file_path);
    $filedata = fread(fopen($upload->file_path, "r"), filesize($upload->file_path));

    $file_ext = pathinfo($upload->file_path, PATHINFO_EXTENSION);

    if($file_ext == 'csv'){
        $mime_type = 'application/csv;charset=UTF-8';
    }else{
        $mime_type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    }
    $file = "data:".$mime_type.";base64,".base64_encode($filedata);

    $this->set('success', true);
    $this->set('file', $file);
    $this->set('name', $upload->file_name);
    $this->set('_serialize', ['success','name','file']);
  }




  public function validate_date_reg($date)
  {
    $d = \DateTime::createFromFormat('d/m/Y', $date);
   return $d && $d->format('d/m/Y') === $date;
   }



}
