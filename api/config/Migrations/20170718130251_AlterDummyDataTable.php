<?php
use Migrations\AbstractMigration;

class AlterDummyDataTable extends AbstractMigration
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
        $table->changeColumn('seller_id', 'string', [
            'default' => null,
            'null' => false,
            ]);

        $table->changeColumn('listing_id', 'string', [
            'default' => null,
            'null' => false,
            ]); 
        
        $table->update();
    }
}
