<?php

use Phinx\Migration\AbstractMigration;

class ActivityTable extends AbstractMigration
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
         $table = $this->table('activities');
         $table
             ->addColumn('user_id', 'integer', [
                 'null' => false
             ])
             ->addColumn('product_id', 'integer', [
                 'null' => false
             ])
             ->addColumn('action', 'string', [
                 'limit' => 100,
                 'null' => false
             ])
             ->addColumn('content', 'text', [
                 'null' => false
             ])
             ->addColumn('details', 'text', [
                  'default' => null,
                 'null' => true
             ])
             ->addColumn('created', 'timestamp', [
                 'default' => 'CURRENT_TIMESTAMP',
                 'limit' => null,
                 'null' => false
             ])
             ->create();
     }
     public function down()
     {
         $this->dropTable('activities');
     }

}
