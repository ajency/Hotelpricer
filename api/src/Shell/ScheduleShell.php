<?php

namespace App\Shell;

use App\Model\Table\SchedulerTable;
use Cake\Console\Shell;
use Cake\Datasource\ConnectionManager;
use Cake\I18n\Time;
use Cake\Mailer\Email;
use Cake\ORM\TableRegistry;
use Cake\Routing\Router;
use Cake\Core\Configure;
use App\Controller\Component\CrawlerComponent;
use Cake\Controller\ComponentRegistry;


class ScheduleShell extends Shell
{
     CONST PRODUCT_LIMIT = 20;
     CONST FAILURE_BATCH_LIMIT = 10;
     CONST INTERVAL_GRACE = 0.20;

     public function initialize()
    {
        parent::initialize();
        $this->loadModel('Scheduler');
        $this->loadModel('Products');
        $this->loadModel('Queue');
        $this->loadModel('ProductsToBeTracked');

    }

    public function main()
    {
        $this->out('Hello Scheduler.');
    }


    /*public function runScheduler(){
        $productLimit = self::PRODUCT_LIMIT;
        $schedulers = $this->Scheduler->getCurrentScheduler();
        foreach ($schedulers as $key => $scheduler) {
            $userId = $scheduler['user_id'];
            $marketplaceId = $scheduler['marketplace_id'];

            $j=1;
            $i = true;
            while ($i == true) {


                $getProductIds = $this->Products->getUserMarketPlaceProductsTobeTracked($userId,$marketplaceId,$productLimit,$j);
                $j++;
                if(!empty($getProductIds)){
                    $this->Queue->addQueue($getProductIds,$scheduler['id']);
                }
                else{
                    $i=false;
                    break;
                }
            }



            $this->Scheduler->updateNextOccurrence($scheduler['id'],$scheduler['job_interval']);
        }

    }*/



    public function updateOccurrence($user_id, $seconds = 0, $marketplace_id = null) {
        if($user_id == 'all') {
            $this->Scheduler->updateNextOccurrenceForAll($seconds, $marketplace_id);
        } else {
            $this->Scheduler->updateNextOccurrenceForUser($user_id, $seconds, $marketplace_id);
        }
    }

    public function addOccurrence($user_id,$seconds = 0) {
        $marketplaces = SchedulerTable::getEnabledMarketplaces();
        foreach($marketplaces as $marketplace_id) {
            $time = new Time('+'.$seconds.' seconds');
            $schedulerTable = TableRegistry::get('Scheduler');
            $schedule = $schedulerTable->newEntity();
            $schedule->user_id = $user_id;
            $schedule->marketplace_id = $marketplace_id;
            $schedule->job_interval = SchedulerTable::DEFAULT_INTERVAL;
            $schedule->next_occurrence = $time;
            $schedule->type = 'Crawler';
            $schedule->meta_data = serialize([]);
            $schedule->created = Time::now();
            $schedule->updated = Time::now();
            $scheduleData = $schedulerTable->save($schedule);
            print_r($scheduleData);
        }
    }

    public function runScheduler($seconds_limit = 58)
    {
        if($seconds_limit > 0) {

        } else {
            $this->out("::::::::::::::::::::::::::::::::::::::Start Batch::::::::::::::::::::::::::::::::::::::");
            $schedulers = $this->Scheduler->getCurrentScheduler();
            //$group_id = time().rand(10*45, 100*98);
            $this->out(":::::::::::Processing ".count($schedulers)." Scheduler Items::::::::::::::::::::::::::");
            $getProductIdsUploads = $getProductIdsInterval = $getProductIdsFailed = [];
            $global_batch_id = md5(uniqid(rand(), true));

            foreach ($schedulers as $key => $scheduler) {
                $group_id = time().rand(10*45, 100*98);
                $batch_id = substr(base_convert($global_batch_id, 16, 10) , -(14 - strlen($scheduler['user_id']))).$scheduler['user_id'];
                $this->out(":::::::::::Processing 1 Item:::::::::::::::::::::::::");
                $start = time();

                $connection = ConnectionManager::get('default');
                $marketplaces = [
                    1 => 'amazon',
                    2 => 'flipkart',
                ];
                $limit = self::PRODUCT_LIMIT;

                $page = 1;
                $offset = 0;
                $process = 1;
                $priority = 1;

                $this->out("Getting new products");
                $updateStatusIds = [];
                while ($process) {
                    $newQuery = 'select ptbt.id,ptbt.listing_id from products_to_be_tracked ptbt inner join products p on p.id = ptbt.product_id and p.user_id = ' . $scheduler['user_id'] . ' and p.marketplace_id = ' . $scheduler['marketplace_id'] . ' where p.status = 1 and ptbt.failed_attempt_count = 0 and ptbt.first_crawl_succeeded = 0 and ptbt.crawl_status <> "Crawling" ORDER BY ptbt.last_updated LIMIT ' . $offset . ',' . $limit;
                    //$this->out($newQuery);
                    $getProductIdsUploads = $connection->execute($newQuery)->fetchAll('assoc');
                    $getProductIdsUploadsIds = $sendToCrawler = [];
                    foreach ($getProductIdsUploads as $product) {
                        $getProductIdsUploadsIds[$product['id']] = (string) $product['listing_id'];
                        $updateStatusIds[] = $product['id'];
                    }
                    $sendToCrawler = [$marketplaces[$scheduler['marketplace_id']] => $getProductIdsUploadsIds, 'batch_id'=>$batch_id];
//                    print_r($sendToCrawler);


                    if (!empty($getProductIdsUploadsIds)) {
                        $this->Queue->addQueueItem($sendToCrawler, $scheduler['id'], $priority, 1, $group_id);
                        $add_to_summary = true;
                        $priority = 0;
                        $offset = $page * $limit;
                        $page = $page + 1;
                    }

                    if (count($getProductIdsUploads) < $limit || count($getProductIdsUploads) == 0) {
                        $process = false;
                    }
                }

                $this->out("Getting old products");
                $beforeWhen = new Time('-' . ($scheduler['job_interval'] - ($scheduler['job_interval'] * self::INTERVAL_GRACE)) . ' seconds');
                $beforeWhen = $beforeWhen->format('Y-m-d H:i:s');
                //$this->out($beforeWhen);
                $page = 1;
                $offset = 0;
                $process = 1;
                while ($process) {
                    $intervalQuery = 'select ptbt.id,ptbt.listing_id from products_to_be_tracked ptbt inner join products p on p.id = ptbt.product_id and p.user_id = ' . $scheduler['user_id'] . ' and p.marketplace_id = ' . $scheduler['marketplace_id'] . ' where p.status = 1 and ptbt.first_crawl_succeeded = 1 and DATE_FORMAT(ptbt.last_updated, "%Y-%m-%d %H:%i:%s") <= "' . $beforeWhen . '" ORDER BY ptbt.last_updated LIMIT ' . $offset . ',' . $limit;
#                    $intervalQuery = 'select ptbt.id from products_to_be_tracked ptbt inner join products p on p.id = ptbt.product_id and p.user_id = ' . $scheduler['user_id'] . ' and p.marketplace_id = ' . $scheduler['marketplace_id'] . ' where p.status = 1 and ptbt.first_crawl_succeeded = 1 and ptbt.failed_attempt_count < 4 and  DATE_FORMAT(ptbt.last_updated, "%Y-%m-%d %H:%i:%s") <= "' . $beforeWhen . '" ORDER BY ptbt.last_updated LIMIT ' . $offset . ',' . $limit;
#                    $intervalQuery = 'select ptbt.id from products_to_be_tracked ptbt inner join products p on p.id = ptbt.product_id and p.user_id = ' . $scheduler['user_id'] . ' and p.marketplace_id = ' . $scheduler['marketplace_id'] . ' where p.status = 1 and ptbt.first_crawl_succeeded = 1 and ptbt.failed_attempt_count < 4 ORDER BY ptbt.last_updated LIMIT ' . $offset . ',' . $limit;
                    $this->out($intervalQuery);
                    $getProductIdsInterval = $connection->execute($intervalQuery)->fetchAll('assoc');
                    $getProductIdsIntervalIds = $sendToCrawler = [];
                    foreach ($getProductIdsInterval as $product) {
                        $getProductIdsIntervalIds[$product['id']] = (string) $product['listing_id'];
                        $updateStatusIds[] = $product['id'];
                    }
                    $sendToCrawler = [$marketplaces[$scheduler['marketplace_id']] => $getProductIdsIntervalIds, 'batch_id'=>$batch_id];
//                    print_r($sendToCrawler);


                    if (!empty($getProductIdsIntervalIds)) {
                        $this->Queue->addQueueItem($sendToCrawler, $scheduler['id'], 0, 2, $group_id);
                        $add_to_summary = true;
                        $offset = $page * $limit;
                        $page = $page + 1;
                    }

                    if (count($getProductIdsInterval) < $limit || count($getProductIdsInterval) == 0 ) {
                        $process = false;
                    }
                }


                $page = 1;
                $offset = 0;
                $process = 1;
                $limit = self::FAILURE_BATCH_LIMIT;
                $this->out("Getting failed products");
                while ($process) {
                    $failedQuery = 'select ptbt.id,ptbt.listing_id from products_to_be_tracked ptbt inner join products p on p.id = ptbt.product_id and p.user_id = ' . $scheduler['user_id'] . ' and p.marketplace_id = ' . $scheduler['marketplace_id'] . ' where p.status = 1 and ptbt.first_crawl_succeeded = 0 and ptbt.failed_attempt_count < 4 and ptbt.failed_attempt_count > 0 and ptbt.crawl_status <> "Crawling" ORDER BY ptbt.last_updated LIMIT ' . $offset . ',' . $limit;
                    //$this->out($failedQuery);
                    $getProductIdsFailed = $connection->execute($failedQuery)->fetchAll('assoc');
                    $getProductIdsFailedIds = $sendToCrawler = [];
                    foreach ($getProductIdsFailed as $product) {
                        $getProductIdsFailedIds[$product['id']] = (string) $product['listing_id'];
                        $updateStatusIds[] = $product['id'];
                    }

                 $sendToCrawler = [$marketplaces[$scheduler['marketplace_id']] => $getProductIdsFailedIds, 'batch_id'=>$batch_id];


                    if (!empty($getProductIdsFailedIds)) {
                        $this->Queue->addQueueItem($sendToCrawler, $scheduler['id'], 1, 3, $group_id);
                        $add_to_summary = true;
                        $offset = $page * $limit;
                        $page = $page + 1;
                    }

                    if (count($getProductIdsFailed) < $limit || count($getProductIdsFailed) == 0) {
                        $process = false;
                    }
                }

                if(!empty($updateStatusIds)) {
                    $this->ProductsToBeTracked->bulkUpdateCrawlStatus($updateStatusIds);
                }

                //To avoid split second requeue we reset trigger flags and data here
                if($scheduler['run'] == 1) {
                    $this->Scheduler->changeRunStatusForUser($scheduler['user_id'], 3, $scheduler['marketplace_id']); //We set run status to processed ie 3 so that next_occurrance run knows not to process it
                } else {
                    $this->Scheduler->updateNextOccurrenceForUser($scheduler['user_id'], $scheduler['job_interval'], $scheduler['marketplace_id']);
                    if($scheduler['run'] == 3) {
                        $this->Scheduler->changeRunStatusForUser($scheduler['user_id'], 0, $scheduler['marketplace_id']); //We set run status to processed ie 3 so that next_occurrance run knows not to process it
                    }
                }

                if($add_to_summary) { // - staging
                    $summaryTable = TableRegistry::get('Summary');
                    $summaryTable->saveGroupEntry($group_id,$batch_id,$scheduler['id']);
                }

                $this->out(":::::::::::Processed 1 Item in::::::::::::::::::".(time() - $start)." seconds");
            }
            $this->out("::::::::::::::::::::::::::::::::::::::END Batch::::::::::::::::::::::::::::::::::::::");
        }
    }
}
