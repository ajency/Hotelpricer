<?php

namespace App\Shell;

use App\Model\Table\QueueTable;
use Cake\Console\Shell;
use Cake\Core\Exception\Exception;
use Cake\I18n\Time;
use Cake\ORM\TableRegistry;
use Cake\Core\Configure;
use App\Controller\Component\CrawlerComponent;
use Cake\Controller\ComponentRegistry;

use Cake\Log\Log;

class CrawlerShell extends Shell
{

     public function initialize()
    {
        parent::initialize();
        $this->loadModel('ProductsToBeTracked');
        $this->Crawler = new CrawlerComponent(new ComponentRegistry(), []);
    }

    public function main()
    {
        $this->out('Hello Crawler.');
    }

    public function crawlAmazon(){
      $products = $this->ProductsToBeTracked->getTrackableProducs(['marketplace_id' => 1]);
      $output = $this->Crawler->run($products);
      $this->out('Amazon crawler started....');
    }

    public function crawlFlipkart(){
      $products = $this->ProductsToBeTracked->getTrackableProducs(['marketplace_id' => 2]);
      $output = $this->Crawler->run($products);
      $this->out('Flipkart crawler started....');
    }

    public function crawlSnapdeal(){
      $products = $this->ProductsToBeTracked->getTrackableProducs(['marketplace_id' => 3]);
      $output = $this->Crawler->run($products);
      $this->out('Snapdeal crawler started....');
    }

    public function crawlPaytm(){
      $products = $this->ProductsToBeTracked->getTrackableProducs(['marketplace_id' => 4]);
      $output = $this->Crawler->run($products);
      $this->out('Paytm crawler started....');
    }



    public function crawl($priority = 0, $seconds_limit = 59, $items = 10) {

        if($seconds_limit > 0) {
            $start_time = time();
            $stop_time = $start_time + $seconds_limit;
            $process = true;
            $processed_items = 0;
            $no_items = 0;
            while($process) {
                $queueTable = TableRegistry::get('Queue');
                $jobs = $queueTable
                    ->find()
                    ->where(['status' => 0])
                    ->where(['priority' => $priority])
                    ->where(['type <' => 4]) //change to less than 4 - TODO
                    ->limit($items)->toArray();
                if($jobs) {
                    $this->out("Fetching ".$items." items from queue...");
                    foreach($jobs as $job) {
                        //Update the status as invoked for the queue item, required as crawler can take more than 1 second to return execution to this function
                        $job->status = 1;
                        $job->updated = Time::now();
                        $queueTable->save($job);
                        $output = $this->Crawler->run(unserialize($job->message),false,$job->group_id);
                        //Update the status as processed for the queue item
                        $job->status = 2;
                        $job->updated = Time::now();
                        $queueTable->save($job);

                        $this->out("Processed one item in queue...");
                        $processed_items++;
                        $process = time() > $stop_time ? false : true;
                        if($process == false) {
                            break; //come out of foreach loop else well miss the next min run of cron and the whole min is wasted
                        }
                    }
                } else {
                    $process = time() > $stop_time ? false : true;
                    $no_items++;
                }
            }
            $this->out("Processed Items : ".$processed_items." | Interval : ".$seconds_limit." seconds | start_time : ".$start_time."  | stop_time : ".$stop_time." | no_items : ".$no_items);
        } else {
            $queueTable = TableRegistry::get('Queue');
            $jobs = $queueTable
                ->find()
                ->where(['status' => 0])
                ->where(['priority' => $priority])
                ->where(['type <' => 4])
                ->limit($items)->toArray();
            if($jobs) {
                $this->out("Fetching ".$items." items from queue...");
                foreach($jobs as $job) {
                    $start = time();
                    //Update the status as invoked for the queue item, required as crawler can take more than 1 second to return execution to this function
                    $job->status = 1;
                    $job->updated = Time::now();
                    $queueTable->save($job);
                    $output = $this->Crawler->run(unserialize($job->message),false,$job->group_id);
                    //Update the status as processed for the queue item
                    $job->status = 2;
                    $job->updated = Time::now();
                    $queueTable->save($job);
                    $this->out("Processed one item in queue in ".(time() - $start)." seconds");
                }
            }
        }
    }







    public function saveResponse($response){

        try {

            $response = unserialize($response);
            $productSellerTable = TableRegistry::get('ProductSellerData');

            if($response['status'] == 'failed'){
                $this->ProductsToBeTracked->markFailed($response['product']['product_id']);
            }else{

                // if(count($response['sellers']) > 0){
                //   $this->ProductsToBeTracked->updateAfterCrawlSucceeded($response['product']);
                //   $productSellerTable->updateAfterCrawlSucceeded($response);
                // }else{
                //   $this->ProductsToBeTracked->markFailed($response['product']['product_id']);
                // }

                //$this->ProductsToBeTracked->updateAfterCrawlSucceeded($response['product']);
                $productSellerTable->updateAfterCrawlSucceeded($response);


            }
        } catch (Exception $e) {
            exit;
        }
    }
}
