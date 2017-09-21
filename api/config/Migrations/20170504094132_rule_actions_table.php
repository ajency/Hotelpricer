<?php

use Phinx\Migration\AbstractMigration;

class RuleActionsTable extends AbstractMigration
{
    public function up()
    {
        $table = $this->table('pricing_rule_actions');
        $table
            ->addColumn('channel_id', 'integer', [
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
            ->addColumn('allow_price_input', 'boolean', [
                'default' => 0,
                'null' => true
            ])
            ->addColumn('operators', 'text', [
                'default' => null,
                'null' => true
            ])
            ->create();
    }
    public function down()
    {
        $this->dropTable('pricing_rule_actions');
    }
}
