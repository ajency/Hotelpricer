<?php
namespace App\Controller\Api;
use App\Controller\Api\AppController;
use Cake\Console\ShellDispatcher;
use Cake\I18n\Time;
use Cake\Network\Exception\NotAcceptableException;
use Cake\Network\Exception\BadRequestException;

use Cake\ORM\TableRegistry;

//use Cake\Event\Event;

class CrawlResponseController extends AppController
{

  public function initialize()
    {
        parent::initialize();
        $this->loadModel('ProductSellerData');
        $this->Auth->allow(['saveData']);
    }



    public function saveData(){
      $postData = $this->request->getData();

      if (!$this->request->is(['post'])) {
          throw new BadRequestException('Bad request method!');
      }

      // $event = new Event('Controller.CrawlResponse.crawlDataResponse', $this, $postData);
      // $this->eventManager()->dispatch($event);

      #$result = exec(ROOT."/bin/cake crawler saveResponse ".escapeshellarg(serialize($postData))." 2>&1", $output);
#      $result = exec(ROOT."/bin/cake crawler saveResponse ".escapeshellarg(serialize($postData))." > /dev/null &");

        $shell = new ShellDispatcher();
        $output = $shell->run(['cake', 'crawler' , 'saveResponse' , escapeshellarg(serialize($postData))]);



      //For debugging
      // $productSellerTable = TableRegistry::get('ProductSellerData');
      // $trackTable = TableRegistry::get('ProductsToBeTracked');
      // if($postData['status'] == 'failed'){
      //   $trackTable->markFailed($postData['product']['product_id']);
      // }else{
      //   $trackTable->updateAfterCrawlSucceeded($postData['product']);
      //   $productSellerTable->updateAfterCrawlSucceeded($postData);
      // }


      $this->set('success', true);
      $this->set('_serialize', ['success']);
    }


}
