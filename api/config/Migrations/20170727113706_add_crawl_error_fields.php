<?php

use Phinx\Migration\AbstractMigration;

class AddCrawlErrorFields extends AbstractMigration
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

      $table = $this->table('products_to_be_tracked');
      $table->addColumn('failed_attempt_count', 'integer', [
        'default' => 0,
        'null' => false
        ])
        ->addColumn('first_crawl_succeeded', 'boolean', [
          'default' => false,
          'null' => false
          ])
        ->update();

    }
}
