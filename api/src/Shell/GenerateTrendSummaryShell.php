<?php

namespace App\Shell;

use App\Model\Table\UsersTable;
use Cake\Console\Shell;
use Cake\I18n\Time;
use Cake\Core\Configure;
use Cake\Datasource\ConnectionManager;
use Cake\ORM\TableRegistry;

class GenerateTrendSummaryShell extends Shell
{

     public function initialize()
    {
        parent::initialize();
        $this->loadModel('Summary');
    }

    public function main()
    {
        $this->out('Hello Trend Summary Generator.');
    }


    public function generate($limit = 100, $user_id = null) {

      // $connection = ConnectionManager::get('default');
      // $summaryTable = TableRegistry::get('Summary');
      // $toBeTrackedTable = TableRegistry::get('ProductsToBeTracked');
      // $queueTable = TableRegistry::get('Queue');
      // $productsTable = TableRegistry::get('Products');
      //
      // $summaryQuery = 'SELECT s.* FROM summary s WHERE s.updated IS NULL AND s.created BETWEEN DATE_SUB(NOW(), INTERVAL 10 MINUTE) AND DATE_SUB(NOW(), INTERVAL 5 MINUTE)';
      // $pendingSummaries = $connection->execute($summaryQuery)->fetchAll('assoc');
      // foreach($pendingSummaries as $summary){
      //
      // //   $product_ids = $productsTable->find('list',[
      // // 'keyField' => 'id',
      // // 'valueField' => 'id'
      // // ])->where(['user_id' => $summary['user_id'], 'marketplace_id' => $summary['marketplace_id'], 'first_summary_generated' => true])->toArray();
      // //
      // //   $summary_data = $productsTable->generateTrendSummary(array_values($product_ids));
      //
      // $summary_data = $summaryTable->generateTrendSummaryData($summary['user_id'],$summary['marketplace_id']);
      //
      //
      //   $summary_data['updated'] = Time::now();
      //    $query = $summaryTable->query();
      //    $query->update()
      //      ->set($summary_data)
      //      ->where(['id' => $summary['id']])
      //      ->execute();
      // }


        $trigger_email = false;


      $queueTable = TableRegistry::get('Queue');
      $summaryTable = TableRegistry::get('Summary');
      $toBeTrackedTable = TableRegistry::get('ProductsToBeTracked');

      $marketplaces = array(
        '1' => 'amazon',
        '2' => 'flipkart',
        '3' => 'snapdeal',
        '4' => 'paytm'
      );

      $this->out("Generate Trend Summary START#".date('H:i:s'));

        //get all summary where updated is null
      $recipient_email_user_ids = [];
      $summarydata = $summaryTable->find()->where(['updated IS'=> NULL, 'status' => 1])->limit($limit)->toArray();
      foreach($summarydata as $summary){
          $recipient_email_user_ids[$summary['user_id']][$summary['batch_id']][] = -1;

          //get all products to be tracked ids from queue table
          $queues = $queueTable->find()->where(['ref_id' => $summary['schedular_id'], 'group_id' =>$summary['group_id']])->toArray();
          $trackable_ids = array();
      #    $this->out(":::::::::::::::Fetching product ids from queues::::::::::::START#".date('H:i:s'));
          $marketplace_key = $marketplaces[$summary['marketplace_id']];

          foreach($queues as $queue){
            $message = unserialize($queue['message']); // - staging
            $queue_product_ids = array_keys($message[$marketplace_key]);
            $trackable_ids = array_merge($trackable_ids,$queue_product_ids);
          }

          /*
           * @author : antonio
           * IF Q items not found we should discard the summary point as it would never get generated
           */

          #$this->out(":::::::::::::::Fetched product ids from queues::::::::::::END#".date('H:i:s'));
          $this->out($summary['id'].' - '.$summary['user_id']);
          if(count($trackable_ids)<=0){
#                $this->out('Deleting Summary id '.$summary['id']);
#                $summaryTable->delete($summary);
                continue;
          }
          $this->out($summary['user_id']." - trackable_ids count".count($trackable_ids));

          //check if any products from group_id is pending crawling
          $isGroupPending = $toBeTrackedTable->exists(['id IN' => $trackable_ids, 'last_updated <'=>$summary['created'], 'crawl_status IN'=>['Pending','Crawling']]);

          if(!$isGroupPending) {
            $this->out(":::::::::::::::Generating Summary::::::::::::START#".date('H:i:s'));
            $summary_data = $summaryTable->generateTrendSummaryData($summary['user_id'],$summary['marketplace_id']);
            $this->out(":::::::::::::::Summary Generated::::::::::::END#".date('H:i:s'));

            if($summary_data['total_products'] > 0) {

            if($trigger_email) {
                $recipient_email_user_ids[$summary['user_id']][$summary['batch_id']][] = 1;
            }

              $summary_data['updated'] = Time::now();
               $query = $summaryTable->query();
               $query->update()
                 ->set($summary_data)
                 ->where(['id' => $summary['id']])
                 ->execute();
            }
          }
      }
        if($trigger_email) {
            $usersTable = TableRegistry::get('Users');
            $usersTable->sendCrawlCompleteEmail($recipient_email_user_ids);
        }

        $this->out("Generate Trend Summary END#".date('H:i:s'));
    }


}
