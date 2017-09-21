<?php

use Phinx\Migration\AbstractMigration;
use Cake\ORM\TableRegistry;

class UpdateFirstCrawlData extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-abstractmigration-class
     *
     * The following commands can be used in this method and Phinx will
     * automatically reverse them when rolling back:
     *
     *    createTable
     *    renameTable
     *    addColumn
     *    renameColumn
     *    addIndex
     *    addForeignKey
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change()
    {

      $trackedTable = TableRegistry::get('ProductsToBeTracked');
      $trackData = $trackedTable->find()->toArray();
      foreach($trackData as $data){

        $query = $trackedTable->query();
        $query->update()
        ->set(['first_crawl_succeeded' => true])
        ->where(['id' => $data['id']])
        ->execute();
      }

    }
}
