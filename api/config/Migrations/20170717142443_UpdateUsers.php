<?php
use Migrations\AbstractMigration;
use Cake\ORM\TableRegistry;

class UpdateUsers extends AbstractMigration
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


       $usersTable = TableRegistry::get('Users');
       $usersData = $usersTable->find()->toArray();
       foreach($usersData as $data){

         $query = $usersTable->query();
         $query->update()
         ->set(['account_verified' => 1,'phone_verified' => 1])
         ->where(['id' => $data['id']])
         ->execute();
       }
    }
}
