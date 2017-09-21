<?php

use Phinx\Migration\AbstractMigration;

class SummaryTable extends AbstractMigration
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
         $table = $this->table('summary');
         $table
             ->addColumn('group_id', 'biginteger', [
                  'limit' => 14,
                 'null' => false
             ])
             ->addColumn('schedular_id', 'integer', [
                 'null' => false
             ])
             ->addColumn('user_id', 'integer', [
                 'null' => false
             ])
             ->addColumn('marketplace_id', 'integer', [
                 'null' => false
             ])
             ->addColumn('created', 'timestamp', [
                 'default' => 'CURRENT_TIMESTAMP',
                 'limit' => null,
                 'null' => false
             ])
             ->addColumn('total_products', 'integer', [
                 'default' => null,
                 'null' => true
             ])
             ->addColumn('im_only_seller', 'integer', [
                 'default' => null,
                 'null' => true
             ])
             ->addColumn('i_have_buybox', 'integer', [
                 'default' => null,
                 'null' => true
             ])
             ->addColumn('im_lowest', 'integer', [
                 'default' => null,
                 'null' => true
             ])
             ->addColumn('im_not_lowest', 'integer', [
                 'default' => null,
                 'null' => true
             ])
             ->addColumn('im_in_top_10', 'integer', [
                 'default' => null,
                 'null' => true
             ])
             ->addColumn('im_selling', 'integer', [
                 'default' => null,
                 'null' => true
             ])
             ->addColumn('im_not_selling', 'integer', [
                 'default' => null,
                 'null' => true
             ])
             ->addColumn('average_rank', 'decimal', [
               'default' => null,
               'precision'=>'10',
               'scale'=>'1',
               'null' => true
             ])
             ->addColumn('won_buy_box', 'integer', [
                 'default' => null,
                 'null' => true
             ])
             ->addColumn('won_lowest_price', 'integer', [
                 'default' => null,
                 'null' => true
             ])
             ->addColumn('lost_buy_box', 'integer', [
                 'default' => null,
                 'null' => true
             ])
             ->addColumn('lost_lowest_price', 'integer', [
                 'default' => null,
                 'null' => true
             ])
             ->addColumn('competition_changed_price', 'integer', [
                 'default' => null,
                 'null' => true
             ])
             ->addColumn('new_sellers_entered', 'integer', [
                 'default' => null,
                 'null' => true
             ])
             ->addColumn('sellers_stocked_out', 'integer', [
                 'default' => null,
                 'null' => true
             ])
             ->addColumn('sellers_stocked_again', 'integer', [
                 'default' => null,
                 'null' => true
             ])
             ->addColumn('listing_with_changes', 'integer', [
                 'default' => null,
                 'null' => true
             ])
             ->create();
     }
     public function down()
     {
         $this->dropTable('summary');
     }
}
