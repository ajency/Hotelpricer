<?php

use Phinx\Migration\AbstractMigration;

class SummaryData extends AbstractMigration
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

      $table = $this->table('products');
      $table->addColumn('my_price', 'decimal', [
        'default' => null,
        'precision'=>'10',
        'scale'=>'2',
        'null' => true
        ])
        ->addColumn('number_of_sellers', 'integer', [
          'default' => null,
          'null' => true
          ])
          ->addColumn('mapped_listings', 'integer', [
            'default' => null,
            'null' => true
            ])
            ->addColumn('rank', 'integer', [
              'default' => null,
              'null' => true
              ])
              ->addColumn('buy_box_flag', 'boolean', [
                'default' => null,
                'null' => true
                ])
                ->addColumn('buy_box_price', 'decimal', [
                  'default' => null,
                  'precision'=>'10',
                  'scale'=>'2',
                  'null' => true
                  ])
                  ->addColumn('battlefield_min_price', 'decimal', [
                    'default' => null,
                    'precision'=>'10',
                    'scale'=>'2',
                    'null' => true
                    ])
                    ->addColumn('battlefield_max_price', 'decimal', [
                      'default' => null,
                      'precision'=>'10',
                      'scale'=>'2',
                      'null' => true
                      ])
                      ->addColumn('dirty', 'boolean', [
                        'default' => true,
                        'null' => true
                        ])
        ->update();

    }
}
