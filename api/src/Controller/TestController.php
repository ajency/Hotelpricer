<?php

/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link      http://cakephp.org CakePHP(tm) Project
 * @since     0.2.9
 * @license   http://www.opensource.org/licenses/mit-license.php MIT License
 */
namespace App\Controller;

use Cake\Datasource\ConnectionManager;

use Cake\Core\Configure;
use Cake\Network\Exception\ForbiddenException;
use Cake\Network\Exception\NotFoundException;
use Cake\View\Exception\MissingTemplateException;

use Cake\ORM\TableRegistry;
use Cake\I18n\Time;

use Cake\Utility\Security;
use Firebase\JWT\JWT;


/**
 * Static content controller
 *
 * This controller will render views from Template/Pages/
 *
 * @link http://book.cakephp.org/3.0/en/controllers/pages-controller.html
 */
class TestController extends AppController
{

    public function initialize()
    {
        parent::initialize();
        $this->Auth->allow(['index']);
          $this->loadComponent('Crawler');
    }

    /**
     * Displays a view
     *
     * @param string ...$path Path segments.
     * @return void|\Cake\Network\Response
     * @throws \Cake\Network\Exception\ForbiddenException When a directory traversal attempt.
     * @throws \Cake\Network\Exception\NotFoundException When the view file could not
     *   be found or \Cake\View\Exception\MissingTemplateException in debug mode.
     */


   public function index(){

    //  $queitem = array(
    //    'amazon'=>array(244=>B01KVDHYGI,242=>B01NCV1KH2),
    //    'batch_id'=>80428880224062
    //  );
    //  $output = $this->Crawler->run($queitem,true, 15038979902192);
    //  debug($output);

    //  $productsTable = TableRegistry::get('Products');
    //  $summary = $productsTable->updateSummaryData(165,159);
    //  debug($summary);

    // $productsTable = TableRegistry::get('Products');
    // $product_ids = $productsTable->find('list',[
    // 'keyField' => 'product_id',
    // 'valueField' => 'product_id'
    // ])->where(['dirty'=>false])->order(['last_updated' => 'ASC'])->limit(10)->toArray();
    //
    // debug(array_values($product_ids));

    // $queueTable = TableRegistry::get('Queue');
    // $summaryTable = TableRegistry::get('Summary');
    // $summarydata = $summaryTable->find()->where(['updated IS'=> NULL])->toArray();
    // $toBeTrackedTable = TableRegistry::get('ProductsToBeTracked');
    // foreach($summarydata as $summary){
    //
    //     $queues = $queueTable->find()->where(['ref_id' => $summary['schedular_id'], 'group_id' =>$summary['group_id']])->toArray();
    //     $trackable_ids = array();
    //     foreach($queues as $queue){
    //       $message = unserialize($queue['message']);
    //       $trackable_ids = array_merge($trackable_ids,reset($message));
    //     }
    //
    //     if(count($trackable_ids)<=0){
    //       continue;
    //     }
    //
    //     $isGroupPending = $toBeTrackedTable->exists(['id IN' => $trackable_ids, 'last_updated <'=>$summary['created'], 'crawl_status IN'=>['Pending','Crawling']]);
    //     debug($isGroupPending);
    //
    //     if(!$isGroupPending){
    //       $summary_data = $summaryTable->generateTrendSummaryData($summary['user_id'],$summary['marketplace_id']);
    //       // $summary_data['updated'] = Time::now();
    //       //  $query = $summaryTable->query();
    //       //  $query->update()
    //       //    ->set($summary_data)
    //       //    ->where(['id' => $summary['id']])
    //       //    ->execute();
    //     }
    //
    // }



    // $connection = ConnectionManager::get('default');
    // $summaryTable = TableRegistry::get('Summary');
    // $toBeTrackedTable = TableRegistry::get('ProductsToBeTracked');
    // $queueTable = TableRegistry::get('Queue');
    // $productsTable = TableRegistry::get('Products');
    //
    // $summaryQuery = 'SELECT s.* FROM summary s WHERE s.updated IS NULL AND s.created BETWEEN DATE_SUB(NOW(), INTERVAL 30 MINUTE) AND DATE_SUB(NOW(), INTERVAL 2 MINUTE)';
    // $pendingSummaries = $connection->execute($summaryQuery)->fetchAll('assoc');
    // foreach($pendingSummaries as $summary){
    //
    //   // $trackable_ids = array();
    //   // $queues = $queueTable->find()->where(['ref_id' => $summary['schedular_id'], 'group_id' =>$summary['group_id']])->toArray();
    //   //
    //   // foreach($queues as $queue){
    //   //   $message = unserialize($queue['message']);
    //   //   $trackable_ids = array_merge($trackable_ids,reset($message));
    //   // }
    //   //
    //   // $product_ids = $toBeTrackedTable->getMainProductIds($trackable_ids);
    //
    //   $product_ids = $productsTable->find('list',[
    // 'keyField' => 'id',
    // 'valueField' => 'id'
    // ])->where(['user_id' => $summary['user_id'], 'marketplace_id' => $summary['marketplace_id']])->toArray();
    //
    //   $summary_data = $productsTable->generateTrendSummary(array_values($product_ids));
    //   $summary_data['updated'] = Time::now();
    //   //  $query = $summaryTable->query();
    //   //  $query->update()
    //   //    ->set($summary_data)
    //   //    ->where(['id' => $summary['id']])
    //   //    ->execute();
    //   //debug($summary_data);
    // }


     $token = JWT::encode(['sub' => 1], Security::salt());
     $this->set('token',$token);
     $this->set('marketplace_id',1);
   }







}
