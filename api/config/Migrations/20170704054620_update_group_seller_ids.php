<?php

use Phinx\Migration\AbstractMigration;
use Cake\ORM\TableRegistry;

class UpdateGroupSellerIds extends AbstractMigration
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
       $trackTable = TableRegistry::get('ProductsToBeTracked');
       $sellerDataTable = TableRegistry::get('ProductSellerData');
       $sellersData = $sellerDataTable->find()->toArray();
       foreach($sellersData as $data){

         $seller = $sellersTable->find()->where(['id'=>$data['seller_id']])->first();
         $seller_marketplace_id = $seller->seller_id;

         $trackableProduct = $trackTable->find()->where(['id'=>$data['product_id']])->first();
         $group_id = $trackableProduct->product_id;
         $marketplace_id = $trackableProduct->marketplace_id;

         $query = $sellerDataTable->query();
         $query->update()
         ->set(['group_id' => $group_id,'marketplace_id' => $marketplace_id,'seller_marketplace_id' => $seller_marketplace_id])
         ->where(['id' => $data['id']])
         ->execute();
       }

     }
}
