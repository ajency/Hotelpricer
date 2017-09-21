<?php
use Migrations\AbstractMigration;

class AddSellerToDummyData extends AbstractMigration
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
        $table->addColumn('seller_id', 'integer', [
            'default' => 0,
            'null' => false,
            ]);
        $table->update();
    }
}
