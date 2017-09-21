<?php
use Migrations\AbstractMigration;

class AddRunToScheduler extends AbstractMigration
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
        $table = $this->table('scheduler');
        $table->addColumn('run', 'integer', [
            'default' => 0,
            'limit' => 1,
            'null' => false,
        ]);
        $table->update();
    }
}
