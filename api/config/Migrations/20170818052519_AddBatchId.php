<?php
use Migrations\AbstractMigration;

class AddBatchId extends AbstractMigration
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
        $table->addColumn('batch_id', 'biginteger', [
            'limit' => 14,
            'null' => false,
            'default' => 0
        ]);
        $table->update();
    }
}
