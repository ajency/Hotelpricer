<?php
use Migrations\AbstractMigration;

class AlterUsers extends AbstractMigration
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
        $table->addColumn('account_verified', 'boolean', [
                'default' => 0,
                'null' => true
            ]);
        $table->addColumn('phone_verified', 'boolean', [
                'default' => 0,
                'null' => true
            ]);
        $table->update();
    }
}
