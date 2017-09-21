<?php
namespace App\Shell;
ini_set('display_startup_errors',1);
ini_set('display_errors',1);
error_reporting(-1);

use App\Model\Table\QueueTable;
use App\Model\Table\SchedulerTable;
use Cake\Console\Shell;
use Cake\I18n\Time;
use Cake\ORM\TableRegistry;
use Cake\Core\Configure;
use App\Controller\Component\CrawlerComponent;
use Cake\Controller\ComponentRegistry;

class ImportShell extends Shell
{
    public function initialize()
    {
        parent::initialize();
        $this->loadModel('ProductsToBeTracked');
        $this->loadModel('Products');
        $this->loadModel('Scheduler');
        $this->Crawler = new CrawlerComponent(new ComponentRegistry(), []);
    }

    public function main()
    {
        $this->out('Hello Crawler.');
    }

    public function import($priority = 0, $seconds_limit = 59, $items = 1) {


        if($seconds_limit > 0) {
           $this->out('Pass params : 0 0 1');
        } else {
            $queueTable = TableRegistry::get('Queue');
            $jobs = $queueTable
                ->find()
                ->where(['status' => 0])
                ->where(['priority' => $priority])
                ->where(['type' => QueueTable::TYPE_IMPORT])
                ->limit($items)->toArray();
            foreach($jobs as $job) {
                $this->out("Fetched ".$items." items from queue...");
                $start = time();
                //Update the status as invoked for the queue item, required as crawler can take more than 1 second to return execution to this function
                $job->status = 2;
                $job->updated = Time::now();
                $queueTable->save($job);

                /*
                 * Start import
                 */
                $message = unserialize($job->message);

                $filepath = $message['file_path'];
                $marketPlace = $message['marketplace'];
                $file_name = $message['file_name'];
                $sellerId = $message['seller_id'];
                $importType = $message['import_type'];
                $user_id = $message['user_id'];
                $upload_id = $message['upload_id'];

                $importStatus = false;

                try {
                    $uploads = TableRegistry::get('Uploads');
                    //delete dummy data
                    if($importType == 'import'){
                        $this->Products->deleteDummyProducts($user_id);
                    }

                    $products_imported = $this->Products->importProducts($filepath, $user_id, $upload_id, $importType, $marketPlace, $sellerId);

/*                    if($importType == 'import' && (count($products_imported)<=0 || !$products_imported)) {
                        $uploads->updateUploadProduct_Ids($upload_id,[],'Processed');
                        unlink($filepath);
                    }*/

                    if($importType == 'dummy'){
                        $userPreferenceTable = TableRegistry::get('UserPreferences');
                        $userPreferenceTable->updatePreference($user_id,'dummy_uploaded','1');
                    }
                    $importStatus = true;
                } catch (Exception $e) {
                    var_dump($e->getMessage());
                }

//                    }

                $marketplaces = SchedulerTable::getEnabledMarketplaces();
                foreach($marketplaces as $marketplace_id) {
                    $schedulerTable = TableRegistry::get('Scheduler');
                    $exists = $schedulerTable->exists(['user_id' => $user_id, 'marketplace_id' => $marketplace_id]);
                    if(!$exists) {
                        $default_interval = SchedulerTable::DEFAULT_INTERVAL;
                        $time = new Time('+'.$default_interval.' seconds');
                        $schedule = $schedulerTable->newEntity();
                        $schedule->user_id = $user_id;
                        $schedule->marketplace_id = $marketplace_id;
                        $schedule->job_interval = SchedulerTable::DEFAULT_INTERVAL;
                        $schedule->next_occurrence = $time;
                        $schedule->type = 'Crawler';
                        $schedule->meta_data = serialize([]);
                        $schedule->created = Time::now();
                        $schedule->updated = Time::now();
                        $schedulerTable->save($schedule);
                        $this->out("Added user to scheduler....");
                    }
                }

                //Queue trigger
                if($importStatus) {
                    $this->Scheduler->changeRunStatusForUser($user_id);
                }

                /*
                 * End import
                 */
                $job->status = 1;
                $job->updated = Time::now();
                $queueTable->save($job);
                $this->out("Processed one item in queue in ".(time() - $start)." seconds");
            }
        }

    }
}
