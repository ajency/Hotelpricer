<?php
use Migrations\AbstractMigration;

class AlterUsersTable extends AbstractMigration
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
        $table->addColumn('name', 'string', [
            'default' => null,
            'null' => true,
            ]);
        $table->addColumn('phone', 'string', [
            'default' => null,
            'null' => true,
            ]);
        $table->addColumn('otp', 'string', [
            'default' => null,
            'null' => true,
            ]);
        $table->addColumn('otp_expiry', 'datetime', [
            'default' => null,
            'null' => false,
        ]);
        $table->update();
    }
}
