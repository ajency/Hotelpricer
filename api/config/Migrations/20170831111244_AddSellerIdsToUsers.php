<?php
use Migrations\AbstractMigration;

class AddSellerIdsToUsers extends AbstractMigration
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
        $table = $this->table('users');
        $table->addColumn('seller_id', 'text', [
                'default' => NULL,
                'null' => true
            ]);
        $table->update();
    }
}
