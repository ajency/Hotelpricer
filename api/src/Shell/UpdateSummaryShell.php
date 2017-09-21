<?php

namespace App\Shell;

use Aura\Intl\Exception;
use Cake\Console\Shell;
use Cake\I18n\Time;
use Cake\Core\Configure;
use Cake\ORM\TableRegistry;

class UpdateSummaryShell extends Shell
{

     public function initialize()
    {
        parent::initialize();
        $this->loadModel('Products');
    }

    public function main()
    {
        $this->out('Hello Summary Updater.');
    }

    public function update($limit = null){

      if(is_null($limit)){
        $limit = 50;
      }
        try {
            $trackableTable = TableRegistry::get('ProductsToBeTracked');
            $product_ids = $trackableTable->find('list',[
                'keyField' => 'id',
                'valueField' => 'product_id'
            ])->where(['dirty'=>true])->order(['last_updated' => 'ASC'])->limit($limit)->toArray();

    #      $this->out($product_ids);

            //$products = array_values($product_ids);

            foreach($product_ids as $key=>$value){
                $this->Products->updateSummaryData($key,$value);
            }
            $this->out('Summary data updated....');
        } catch (Exception $e) {

        }
    }



}
