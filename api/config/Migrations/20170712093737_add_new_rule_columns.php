<?php

use Phinx\Migration\AbstractMigration;

class AddNewRuleColumns extends AbstractMigration
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
      $table = $this->table('pricing_rules');
      $table->addColumn('user_id', 'integer', [
               'null' => true,
               'default' => NULL
                 ])
      ->addColumn('type', 'string', [
               'null' => false,
               'default' => 'default'
                 ])
                 ->addColumn('compete_with', 'text', [
                          'null' => false
                            ])
                            ->addColumn('scenario', 'text', [
                                     'null' => false
                                       ])
                            ->addColumn('min_max', 'text', [
                                     'null' => false
                                       ])

                                       ->addColumn('include_sellers', 'text', [
                                                'null' => true,
                                                'default' => NULL
                                                  ])
                                                  ->addColumn('exclude_sellers', 'text', [
                                                           'null' => true,
                                                           'default' => NULL
                                                             ])
                                                             ->addColumn('additional_settings', 'text', [
                                                                      'null' => true,
                                                                      'default' => NULL
                                                                        ])

                                                                        ->addColumn('is_active', 'boolean', [
                                                                                 'null' => false,
                                                                                 'default' => true
                                                                                   ])
                 ->update();

    }
}
