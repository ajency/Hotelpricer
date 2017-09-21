<?php
use Migrations\AbstractMigration;

class AddStatustoSummary extends AbstractMigration
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
        $table = $this->table('summary');
        $table->addColumn('status', 'integer', [
            'default' => 1,
            'limit' => 2,
            'null' => false,
        ]);
        $table->update();
    }
}
