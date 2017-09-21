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


class ScheduleShellOld extends Shell
{
    CONST PRODUCT_LIMIT = 50;
    CONST FAILURE_BATCH_LIMIT = 10;

    public function initialize()
    {
        parent::initialize();
        $this->loadModel('Scheduler');
        $this->loadModel('Products');
        $this->loadModel('Queue');

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


    public function runScheduler()
    {
        $start_time = time();
        $stop_time = $start_time + 58;
        $process = true;

        while ($process) {
            $this->out("::::::::::::::::::::::::::::::::::::::Start Batch::::::::::::::::::::::::::::::::::::::");
            $schedulers = $this->Scheduler->getCurrentScheduler();
            //$group_id = time().rand(10*45, 100*98);
            $this->out(":::::::::::Processing ".count($schedulers)." Scheduler Items::::::::::::::::::::::::::");

            $getProductIdsUploads = $getProductIdsInterval = $getProductIdsFailed = [];
            $global_batch_id = md5(uniqid(rand(), true));
            #$global_batch_id = time().rand(10*45, 100*98);;
            $this->out(":::::::::::Processing Global batch_id ".$global_batch_id."::::::::::::::::::::::::::");

            foreach ($schedulers as $key => $scheduler) {

                $add_to_summary = false;
                $group_id = time().rand(10*45, 100*98);
                #   $batch_id = $global_batch_id;
                $batch_id = substr(base_convert($global_batch_id, 16, 10) , -(14 - strlen($scheduler['user_id']))).$scheduler['user_id'];
                $this->out(":::::::::::Processing Global batch_id ".$batch_id."::::::::::::::::::::::::::");
                $this->out(":::::::::::Processing Scheduler ".json_encode($scheduler)."::::::::::::::::::::::::::");

                //To avoid split second requeue we reset trigger flags and data here
                if($scheduler['run'] == 1) {
                    $this->Scheduler->changeRunStatusForUser($scheduler['user_id'], 0, $scheduler['marketplace_id']);
                } else {
                    $this->Scheduler->updateNextOccurrenceForUser($scheduler['user_id'], $scheduler['job_interval'], $scheduler['marketplace_id']);
                }

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
                while ($process) {
                    $newQuery = 'select ptbt.id from products_to_be_tracked ptbt inner join products p on p.id = ptbt.product_id and p.user_id = ' . $scheduler['user_id'] . ' and p.marketplace_id = ' . $scheduler['marketplace_id'] . ' where p.status = 1 and ptbt.failed_attempt_count = 0 and ptbt.first_crawl_succeeded = 0 ORDER BY ptbt.last_updated LIMIT ' . $offset . ',' . $limit;
                    $this->out($newQuery);
                    $getProductIdsUploads = $connection->execute($newQuery)->fetchAll();
                    $getProductIdsUploadsIds = $sendToCrawler = [];
                    foreach ($getProductIdsUploads as $product) {
                        $getProductIdsUploadsIds[] = (string)$product[0];
                    }
                    $sendToCrawler = [$marketplaces[$scheduler['marketplace_id']] => $getProductIdsUploadsIds];
                    print_r($sendToCrawler);

                    if (!empty($getProductIdsUploadsIds)) {
                        $this->Queue->addQueueItem($sendToCrawler, $scheduler['id'], $priority, 1, $group_id);
                        $add_to_summary = true;
                        $priority = 0;
                        $offset = $page * $limit;
                        $page = $page + 1;
                    }

                    if (count($getProductIdsUploads) < $limit) {
                        $process = false;
                    }
                }

                $beforeWhen = new Time('-' . ($scheduler['job_interval'] - ($scheduler['job_interval'] * 0.20)) . ' seconds');
                $beforeWhen = $beforeWhen->format('Y-m-d H:i:s');
                //$this->out($beforeWhen);
                $page = 1;
                $offset = 0;
                $process = 1;
                while ($process) {
                    $intervalQuery = 'select ptbt.id from products_to_be_tracked ptbt inner join products p on p.id = ptbt.product_id and p.user_id = ' . $scheduler['user_id'] . ' and p.marketplace_id = ' . $scheduler['marketplace_id'] . ' where p.status = 1 and ptbt.first_crawl_succeeded = 1 and DATE_FORMAT(ptbt.last_updated, "%Y-%m-%d %H:%i:%s") <= "' . $beforeWhen . '" ORDER BY ptbt.last_updated LIMIT ' . $offset . ',' . $limit;
#                    $intervalQuery = 'select ptbt.id from products_to_be_tracked ptbt inner join products p on p.id = ptbt.product_id and p.user_id = ' . $scheduler['user_id'] . ' and p.marketplace_id = ' . $scheduler['marketplace_id'] . ' where p.status = 1 and ptbt.first_crawl_succeeded = 1 and ptbt.failed_attempt_count < 4 and  DATE_FORMAT(ptbt.last_updated, "%Y-%m-%d %H:%i:%s") <= "' . $beforeWhen . '" ORDER BY ptbt.last_updated LIMIT ' . $offset . ',' . $limit;
#                    $intervalQuery = 'select ptbt.id from products_to_be_tracked ptbt inner join products p on p.id = ptbt.product_id and p.user_id = ' . $scheduler['user_id'] . ' and p.marketplace_id = ' . $scheduler['marketplace_id'] . ' where p.status = 1 and ptbt.first_crawl_succeeded = 1 and ptbt.failed_attempt_count < 4 ORDER BY ptbt.last_updated LIMIT ' . $offset . ',' . $limit;
                    $this->out($intervalQuery);
                    $getProductIdsInterval = $connection->execute($intervalQuery)->fetchAll();
                    $getProductIdsIntervalIds = $sendToCrawler = [];
                    foreach ($getProductIdsInterval as $product) {
                        $getProductIdsIntervalIds[] = (string)$product[0];
                    }
                    $sendToCrawler = [$marketplaces[$scheduler['marketplace_id']] => $getProductIdsIntervalIds];

                    print_r($sendToCrawler);

                    if (!empty($getProductIdsIntervalIds)) {
                        $this->Queue->addQueueItem($sendToCrawler, $scheduler['id'], 0, 2, $group_id);
                        $add_to_summary = true;
                        $offset = $page * $limit;
                        $page = $page + 1;
                    }

                    if (count($getProductIdsInterval) < $limit) {
                        $process = false;
                    }
                }


                $page = 1;
                $offset = 0;
                $process = 1;
                $limit = self::FAILURE_BATCH_LIMIT;
                while ($process) {
                    $failedQuery = 'select ptbt.id from products_to_be_tracked ptbt inner join products p on p.id = ptbt.product_id and p.user_id = ' . $scheduler['user_id'] . ' and p.marketplace_id = ' . $scheduler['marketplace_id'] . ' where p.status = 1 and ptbt.first_crawl_succeeded = 0 and ptbt.failed_attempt_count < 4 and ptbt.failed_attempt_count > 0 ORDER BY ptbt.last_updated LIMIT ' . $offset . ',' . $limit;
                    $this->out($failedQuery);
                    $getProductIdsFailed = $connection->execute($failedQuery)->fetchAll();
                    $getProductIdsFailedIds = $sendToCrawler = [];
                    foreach ($getProductIdsFailed as $product) {
                        $getProductIdsFailedIds[] = (string)$product[0];
                    }
                    $sendToCrawler = [$marketplaces[$scheduler['marketplace_id']] => $getProductIdsFailedIds];

                    print_r($sendToCrawler);

                    if (!empty($getProductIdsFailedIds)) {
                        $this->Queue->addQueueItem($sendToCrawler, $scheduler['id'], 1, 3, $group_id);
                        $add_to_summary = true;
                        $offset = $page * $limit;
                        $page = $page + 1;
                    }

                    if (count($getProductIdsFailed) < $limit) {
                        $process = false;
                    }
                }

                if($add_to_summary) { // - staging
                    $summaryTable = TableRegistry::get('Summary');
                    $summaryTable->saveGroupEntry($group_id,$batch_id,$scheduler['id']);
                }
            }
            $process = time() > $stop_time ? false : true;
            $this->out("::::::::::::::::::::::::::::::::::::::END Batch::::::::::::::::::::::::::::::::::::::");
        }
    }
}
