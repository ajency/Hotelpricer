<?php

use Phinx\Migration\AbstractMigration;
use Cake\ORM\TableRegistry;

class SummaryDataStatus extends AbstractMigration
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

      $productsTable = TableRegistry::get('Products');
      $productsData = $productsTable->find()->contain(['ProductsToBeTracked'])->toArray();
      foreach($productsData as $data){

        // debug($data);
        // exit;

        foreach($data->products_to_be_tracked as $tracked){
          if($tracked->listing_id == $data->listing_id){

            $query = $productsTable->query();
            $query->update()
            ->set(['crawl_status' => $tracked->crawl_status,'first_crawl_succeeded' => $tracked->first_crawl_succeeded])
            ->where(['id' => $data->id])
            ->execute();

          }
        }


      }

    }


}
