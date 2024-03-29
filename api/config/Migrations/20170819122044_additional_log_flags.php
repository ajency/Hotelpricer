<?php

use Phinx\Migration\AbstractMigration;

class AdditionalLogFlags extends AbstractMigration
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
      $table = $this->table('product_seller_data');
      $table->addColumn('own_buy_box', 'boolean', [
              'default' => false,
              'null' => true
          ])->update();
          $table->addColumn('lost_buy_box', 'boolean', [
                  'default' => false,
                  'null' => true
              ])->update();
              $table->addColumn('own_lowest_price', 'boolean', [
                      'default' => false,
                      'null' => true
                  ])->update();

                  $table->addColumn('lost_lowest_price', 'boolean', [
                          'default' => false,
                          'null' => true
                      ])->update();
    }
}
