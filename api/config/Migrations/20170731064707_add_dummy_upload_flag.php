<?php

use Phinx\Migration\AbstractMigration;
use Cake\ORM\TableRegistry;

class AddDummyUploadFlag extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-abstractmigration-class
     *
     * The following commands can be used in this method and Phinx will
     * automatically reverse them when rolling back:
     *
     *    createTable
     *    renameTable
     *    addColumn
     *    renameColumn
     *    addIndex
     *    addForeignKey
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change()
    {

      $usersTable = TableRegistry::get('Users');
      $userData = $usersTable->find()->toArray();
      $userPreferenceTable = TableRegistry::get('UserPreferences');
      foreach($userData as $user){
        $userPreferenceTable->updatePreference($user['id'],'dummy_uploaded','1');
      }

    }


}
