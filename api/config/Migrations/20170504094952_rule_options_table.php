<?php

use Phinx\Migration\AbstractMigration;

class RuleOptionsTable extends AbstractMigration
{
    public function up()
    {
        $table = $this->table('pricing_rule_options');
        $table
            ->addColumn('action_id', 'integer', [
                'null' => false
            ])
            ->addColumn('title', 'string', [
                'limit' => 100,
                'null' => false
            ])
            ->addColumn('slug', 'string', [
                'limit' => 100,
                'null' => false
            ])
            ->create();
    }
    public function down()
    {
        $this->dropTable('pricing_rule_options');
    }
}
