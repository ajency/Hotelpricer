<?php
use Migrations\AbstractMigration;
use Cake\ORM\TableRegistry;

class CreateSchedular extends AbstractMigration
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
        $table->addColumn('user_id', 'integer', [
            'default' => 0,
            'null' => false,
            ]);
        $table->addColumn('marketplace_id', 'integer', [
            'default' => 0,
            'null' => false,
            ]);
        $table->addColumn('job_interval', 'integer', [
            'default' => 0,
            'null' => false,
            ]);
        $table->addColumn('next_occurrence', 'timestamp', [
                'default' => 'CURRENT_TIMESTAMP',
                'limit' => null,
                'null' => false
            ]);
        $table->addColumn('meta_data', 'text', [
            'default' => null,
            'null' => false,
            ]);
        $table->addColumn('type', 'string', [
            'default' => null,
            'null' => false,
            ]);
        $table->addColumn('created', 'timestamp', [
                'default' => 'CURRENT_TIMESTAMP',
                'limit' => null,
                'null' => false
            ]);
        $table->addColumn('updated', 'datetime', [
                'default' => null,
                'limit' => null,
                'null' => true
            ]);
        $table->create();

 

    }
}
