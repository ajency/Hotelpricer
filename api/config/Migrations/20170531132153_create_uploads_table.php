<?php

use Phinx\Migration\AbstractMigration;

class CreateUploadsTable extends AbstractMigration
{
    public function up()
    {
        $table = $this->table('uploads');
        $table
            ->addColumn('user_id', 'integer', [
                'null' => false
            ])
            ->addColumn('file_name', 'string', [
                'limit' => 100,
                'null' => false
            ])
            ->addColumn('file_path', 'text', [
                'null' => false
            ])
            ->addColumn('status', 'string', [
                'default' => 'Pending',
                'null' => false
            ])
            ->addColumn('no_of_listing', 'integer', [
                'null' => false
            ])
            ->addColumn('no_of_rows', 'integer', [
                'null' => false
            ])
            ->addColumn('details', 'text', [
                'null' => true
            ])
            ->addColumn('created', 'timestamp', [
                'default' => 'CURRENT_TIMESTAMP',
                'limit' => null,
                'null' => false
            ])
            ->create();
    }
    public function down()
    {
        $this->dropTable('uploads');
    }
}
