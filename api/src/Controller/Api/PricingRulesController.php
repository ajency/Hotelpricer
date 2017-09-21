<?php
namespace App\Controller\Api;
use Cake\Event\Event;
use Cake\Network\Exception\BadRequestException;
use Cake\ORM\TableRegistry;
use Cake\I18n\Time;


class PricingRulesController extends AppController
{


  public function fetchAll(){
    $queryData = $this->request->query;
    $user = $this->Auth->identify();

    if (!$this->request->is(['get'])) {
        throw new BadRequestException('Bad request method!');
    }

    $query = $this->PricingRules->find()->where(['user_id' => $user['id']])->orWhere(['type'=>'default'])->contain('Products','Users');
    $rulesdata = $this->paginate($query);

    $data = array();
    foreach($rulesdata as $rule){
      $res = array(
        'id' => $rule['id'],
        'title' => $rule['title'],
        'description' => $rule['description'],
        'skus' => count($rule['products']),
        'type' => $rule['type'],
        'is_active' => $rule['is_active'],
        'channel_id' => $rule['channel_id'],
        'created_by' => (!is_null($rule['user_id'])) ? $this->getUserById($rule['user_id']) : 'Admin',
        'created_on'=>Time::parse($rule['created'])->nice()
      );
      $data[] = $res;
    }

    $paginationData = $this->request->params['paging']['PricingRules'];

    $this->set('success', true);
    $this->set('result_count', $paginationData['count']);
    $this->set('results_per_page', $paginationData['perPage']);
    $this->set('page', $paginationData['page']);
    $this->set('data', $data);
    $this->set('query_data', $queryData);
    $this->set('_serialize', ['success','result_count','results_per_page','page','data','query_data']);
  }


    public function getDetails(){
        $queryData = $this->request->query();

        if(!array_key_exists('id', $queryData)){
            throw new BadRequestException('Rule id is missing in query parameter!');
        }

        $data = $this->PricingRules->getRule($queryData['id']);

        $this->set('data',$data);
        $this->set('success', true);
        $this->set('_serialize', ['success','data']);
    }



    public function getFields(){
        $queryData = $this->request->query();

        if(!array_key_exists('channel_id', $queryData)){
            throw new BadRequestException('channel_id is missing in query parameter!');
        }

        $ruleActionsTable = TableRegistry::get('PricingRuleActions');
        $data = $ruleActionsTable->getActions($queryData['channel_id']);


        $this->set('data',$data);
        $this->set('success', true);
        $this->set('_serialize', ['success','data']);
    }




    public function getUserById($user_id){
      $usersTable = TableRegistry::get('Users');
      $user = $usersTable->get($user_id);
      return $user->username;
    }




}
