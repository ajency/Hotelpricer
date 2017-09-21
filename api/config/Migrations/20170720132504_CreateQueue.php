<?php
use Migrations\AbstractMigration;

class CreateQueue extends AbstractMigration
{
    /**
     * Change Method.
     *
     * More information on this method is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-change-method
     * @return void
     */
    public function up()
    {
        $table = $this->table('queue');
        $table
            ->addColumn('ref_id', 'integer', [
                'null' => false
            ])
            ->addColumn('message', 'text', [
                'null' => false
            ])
            ->addColumn('created', 'timestamp', [
                'default' => 'CURRENT_TIMESTAMP',
                'limit' => null,
                'null' => false
            ])
            ->addColumn('updated', 'timestamp', [
                'null' => true
            ])
            ->addColumn('status', 'integer', [
                'null' => false,
                'default' => 0,
            ])
            ->create();
    }

    public function down()
    {
        $this->dropTable('queue');
    }
}
