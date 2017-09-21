<?php
use Migrations\AbstractMigration;

class AddBBLowToProducts extends AbstractMigration
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
        $table = $this->table('products');
        $table->addColumn('won_buy_box', 'boolean', [
            'default' => false,
            'null' => NULL
        ])->update();

        $table->addColumn('won_lowest_price', 'boolean', [
            'default' => NULL,
            'null' => true
        ])->update();

        $table->addColumn('lost_buy_box', 'boolean', [
            'default' => NULL,
            'null' => true
        ])->update();

        $table->addColumn('lost_lowest_price', 'boolean', [
            'default' => NULL,
            'null' => true
        ])->update();

        $table->update();
    }
}
