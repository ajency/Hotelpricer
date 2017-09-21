<?php

use Phinx\Migration\AbstractMigration;

class UserPreferenceTable extends AbstractMigration
{
  public function up()
  {
      $table = $this->table('user_preferences');
      $table
          ->addColumn('user_id', 'integer', [
              'null' => false
          ])
          ->addColumn('meta_key', 'string', [
              'null' => false
          ])
          ->addColumn('meta_value', 'text', [
              'null' => false
          ])
          ->create();
  }
  public function down()
  {
      $this->dropTable('user_preferences');
  }
}
