<?php

use Phinx\Migration\AbstractMigration;
use Cake\ORM\TableRegistry;

class SeedSellerCountData extends AbstractMigration
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
       $sellersTable = TableRegistry::get('Sellers');
       $sellerDataTable = TableRegistry::get('ProductSellerData');
       $sellers = $sellersTable->find()->toArray();
       foreach($sellers as $seller){

         $sellerData = $sellerDataTable->find()->where(['seller_id'=>$seller['id']])->order(['updated_on'=>'DESC'])->first();

         $query = $sellersTable->query();
         $query->update()
         ->set(['rating' => $sellerData->rating,'rating_count' => $sellerData->rating_count])
         ->where(['id' => $seller['id']])
         ->execute();
       }

     }
}
