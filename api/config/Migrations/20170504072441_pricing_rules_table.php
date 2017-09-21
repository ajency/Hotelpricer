<?php

use Phinx\Migration\AbstractMigration;

class PricingRulesTable extends AbstractMigration
{
    public function up()
    {
        $table = $this->table('pricing_rules');
        $table
            ->addColumn('channel_id', 'integer', [
                'null' => false
            ])
            ->addColumn('title', 'string', [
                'limit' => 100,
                'null' => false
            ])
            ->addColumn('rule', 'text', [
                'default' => null,
                'null' => true
            ])
            ->addColumn('rule_type', 'string', [
                'limit' => 32,
                'default' => 'custom',
                'null' => false
            ])
            ->addColumn('created', 'timestamp', [
                'default' => 'CURRENT_TIMESTAMP',
                'limit' => null,
                'null' => false
            ])
            ->addColumn('modified', 'datetime', [
                'default' => null,
                'limit' => null,
                'null' => true
            ])
            ->create();
    }
    public function down()
    {
        $this->dropTable('pricing_rules');
    }
}
