<?php

namespace App\Shell;

use App\Model\Table\UsersTable;
use Cake\Console\Shell;
use Cake\I18n\Time;
use Cake\Core\Configure;
use Cake\Datasource\ConnectionManager;
use Cake\ORM\TableRegistry;

class DeleteSummaryShell extends Shell
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


    public function generate()
    {
        $queueTable = TableRegistry::get('Queue');
        $summaryTable = TableRegistry::get('Summary');
        $summarydata = $summaryTable->find()->where(['updated IS' => NULL])->toArray();
        foreach ($summarydata as $summary) {
            $this->out($summary['id'].' - '.$summary['user_id']);
            $queues = $queueTable->find()->where(['ref_id' => $summary['schedular_id'], 'group_id' => $summary['group_id']])->toArray();
            if (empty($queues)) {
                $this->out('Deleting Summary id '.$summary['id']);
                $summaryTable->delete($summary);
            }

        }
    }


}
