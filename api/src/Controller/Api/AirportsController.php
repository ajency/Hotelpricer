<?php
namespace App\Controller\Api;
use App\Controller\Api\AppController;
use Cake\ORM\TableRegistry;
use Cake\I18n\Time;
use Cake\Network\Exception\NotAcceptableException;
use Cake\Network\Exception\BadRequestException;

use Cake\Filesystem\Folder;
use Cake\Filesystem\File;

class AirportsController extends AppController
{

  public function initialize()
  {
      parent::initialize();
      $this->Auth->allow(['index']);
  }

    public function index(){

        $queryData = $this->request->query;
        $user = $this->Auth->identify();

        if (!$this->request->is(['get'])) {
            throw new BadRequestException('Bad request method!');
        }

        $airportsTable = TableRegistry::get('Airports');
        $airportsData = $this->paginate($airportsTable->getAirports($queryData));

        $paginationData = $this->request->params['paging']['Airports'];

        $this->set('success', true);
        $this->set('result_count', $paginationData['count']);
        $this->set('results_per_page', $paginationData['perPage']);
        $this->set('page', $paginationData['page']);
        $this->set('data', $airportsData);
        $this->set('query_data', $queryData);
        $this->set('_serialize', ['success','result_count','results_per_page','page','data','query_data']);
    }


}
