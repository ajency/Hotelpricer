<?php
namespace App\Controller\Api;
use App\Controller\Api\AppController;
use Cake\ORM\TableRegistry;
use Cake\I18n\Time;
use Cake\Network\Exception\NotAcceptableException;
use Cake\Network\Exception\BadRequestException;

use Cake\Filesystem\Folder;
use Cake\Filesystem\File;

class ActivitiesController extends AppController
{

    public function fetchAll($product_id = NULL){

        $queryData = $this->request->query;
        $user = $this->Auth->identify();

        if ($this->request->is(['patch', 'post', 'put'])) {
            throw new BadRequestException('Bad request method!');
        }

        if(!is_numeric($product_id)){
            throw new NotAcceptableException('Invalid Product ID!');
        }

        $activities = $this->paginate($this->Activities->getActivities($product_id,$queryData,$user['id']));
        $activityActions = $this->Activities->getActivitActions($product_id,$queryData,$user['id']);

        $data = array();
        foreach($activities as $activity){

          //Check if previous price is null, then ignore (previous bugs, fixed later)
          if($activity['action'] == 'seller_price_changed'){
            $details = unserialize($activity['details']);
            if(isset($details[2])){
              if(is_null($details[2]['value'])){
                continue;
              }
            }
          }

            $dt = array(
                'action'=>$activity['action'],
                'content'=>$activity['content'],
                'details'=> unserialize($activity['details']),
                'created'=>Time::parse($activity['created'])->nice(),
                'is_tracker'=>$activity['is_tracker']
                );
            $data[] = $dt;
        }


        $paginationData = $this->request->params['paging']['Activities'];

        $this->set('success', true);
        $this->set('result_count', $paginationData['count']);
        $this->set('activity_actions', $activityActions);
        $this->set('results_per_page', $paginationData['perPage']);
        $this->set('page', $paginationData['page']);
        $this->set('data', $data);
        $this->set('query_data', $queryData);
        $this->set('_serialize', ['success','result_count','results_per_page','page','data','query_data','product_id','activity_actions']);
    }



}
