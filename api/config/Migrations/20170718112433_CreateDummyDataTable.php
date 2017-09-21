<?php
use Migrations\AbstractMigration;

class CreateDummyDataTable extends AbstractMigration
{
    /**
     * Change Method.
     *
     * More information on this method is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-change-method
     * @return void
     */
    public function change()
    {
        $table = $this->table('dummy_data');
        $table->addColumn('marketplace_id', 'integer', [
            'default' => 0,
            'null' => false,
            ]);
        $table->addColumn('category_id', 'integer', [
            'default' => 0,
            'null' => false,
            ]);
        $table->addColumn('listing_id', 'integer', [
            'default' => 0,
            'null' => false,
            ]);
        $table->addColumn('created', 'timestamp', [
                'default' => 'CURRENT_TIMESTAMP',
                'limit' => null,
                'null' => false
            ]);
        $table->addColumn('updated', 'datetime', [
                'default' => null,
                'limit' => null,
                'null' => true
            ]);
        $table->create();
    }
}
