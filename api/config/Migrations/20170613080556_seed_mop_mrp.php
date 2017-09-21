<?php

use Phinx\Migration\AbstractMigration;
use Cake\ORM\TableRegistry;

class SeedMopMrp extends AbstractMigration
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
    public function up()
    {
      $productsTable = TableRegistry::get('Products');
      $products = $productsTable->find()->toArray();
      foreach($products as $product){
        $query = $productsTable->query();
        $query->update()
        ->set(['mrp' => $product['min'],'mop' => $product['max']])
        ->where(['id' => $product['id']])
        ->execute();
      }

    }
}
