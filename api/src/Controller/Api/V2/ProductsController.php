<?php
namespace App\Controller\Api\V2;
use App\Controller\Api\AppController;
use App\Model\Table\QueueTable;
use Cake\ORM\TableRegistry;
use Cake\I18n\Time;
use Cake\Network\Exception\NotAcceptableException;
use Cake\Network\Exception\BadRequestException;

use Cake\Filesystem\Folder;
use Cake\Filesystem\File;

class ProductsController extends AppController
{

  public function initialize()
    {
        parent::initialize();
        $this->loadComponent('Crawler');
        $this->loadModel('Scheduler');
    }

    public function importProducts() {

     $user = $this->Auth->identify();

      if ($this->request->is(['patch', 'get', 'put'])) {
          throw new BadRequestException('Bad request method!');
      }

      $postData = $this->request->getData();
      $importType = (isset($postData['type']))? $postData['type']: null;


      $path = WWW_ROOT.'uploads/product-sheets/';
      $path = preg_replace("@webroot\/@","tmp/",$path);

      if(!file_exists($path)){
       new Folder($path,true,0777);
     }

     $allowedExtensions = $this->Products->importProductsAllowedExtentions();

      if(isset($postData['marketplace_id']) && $postData['marketplace_id']==''){
        throw new NotAcceptableException('Please provide a marketplace id or specify sheet as custom.');
      }

        $import_crawl_limit = 50;
        $productsTable = TableRegistry::get('Products');
        $query = $productsTable->query()->find('all', [
            'conditions' => ['user_id' => $user['id'], 'status' => 1]
        ]);
        $i = $query->count();


        if($i >= $import_crawl_limit) {
            throw new NotAcceptableException('Upload limit exceeded, your account currently has '.$i.' active products');
        }


        if(isset($postData['url'])){

        if(!isset($postData['filename'])){
          throw new NotAcceptableException('Filename is missing!');
        }

        $file_name = $postData['filename'];
        $file_parts = explode('.', $file_name);
        $unique_name = $file_parts[0].'_'.date('m-d-Y_hia').'.'.$file_parts[1];

       if(!in_array($file_parts[1],$allowedExtensions[$postData['marketplace_id']])) {
           throw new NotAcceptableException('Invalid file type!');
       }

        $downlaoded = file_put_contents(
          $path.$unique_name,
          file_get_contents($postData['url'])
          );
          if($downlaoded){
            $filepath = $path.$unique_name;
          }else{
            throw new NotAcceptableException('File download failed from remote url!');
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

        $marketPlace = (isset($postData['marketplace_id']))? $postData['marketplace_id'] : '';
        $sellerId = (isset($postData['seller_id']))? $postData['seller_id'] : '';

        if(is_numeric($marketPlace) && $sellerId == '') {
            throw new NotAcceptableException('Seller Id is required if a specific marketplace is specified.');
        }

        $check_sheet = $this->Products->excelToArray($filepath,true,$marketPlace,true);
        $this->set('checksheet', $check_sheet);
        $data = [];

        if($check_sheet['success'] == false) {
            unlink($filepath);
            $this->set('success', false);
            $this->set('errors', $check_sheet['errors']);
        }else{

            $message = [];

            if($importType == 'import') {
                $uploads = TableRegistry::get('Uploads');
                $upload_id = $uploads->saveUploadData($filepath, $file_name, $user['id'], $check_sheet['row_count'], $check_sheet['listing_ids_count'], [], ($import_crawl_limit - $i));
            }

            $message['user_id'] = $user['id'];
            $message['marketplace'] = $marketPlace;
            $message['seller_id'] = $sellerId;
            $message['import_type'] = $importType;
            $message['file_path'] = $filepath;
            $message['file_name'] = $file_name;
            $message['upload_id'] = $upload_id;

            $queueTable = TableRegistry::get('Queue');
            $job = $queueTable->newEntity();
            $job->message = serialize($message);
            $job->ref_id = $user['id'];
            $job->group_id = 0;
            $job->type = QueueTable::TYPE_IMPORT;
            $queueTable->save($job);
            $data['is_all_crawled'] = false;
            $no_will_crawl = $import_crawl_limit - $i;

            $data['check_sheet'] = $check_sheet;

            if($no_will_crawl > $check_sheet['listing_ids_count']) {
                $no_will_crawl = $check_sheet['listing_ids_count'];
            }
            $data['no_will_crawl'] = $no_will_crawl;

            if($check_sheet['listing_ids_count'] == $no_will_crawl) {
                $data['is_all_crawled'] = true;
            }

            $this->set('success', true);
            $this->set('status', 'Importing');
            $this->set('data', $data);
        }
        $this->set('_serialize', ['success','status','errors','postData', 'data', 'checksheet']);
    }
}
