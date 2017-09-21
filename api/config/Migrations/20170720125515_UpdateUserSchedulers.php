<?php
use Migrations\AbstractMigration;
use Cake\ORM\TableRegistry;
use Cake\I18n\Time;

class UpdateUserSchedulers extends AbstractMigration
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

        $time = new Time('+4 hours'); 

        $usersTable = TableRegistry::get('Users');
        $schedulerTable = TableRegistry::get('Scheduler');
        $usersData = $usersTable->find()->where('active',1)->toArray();
        foreach($usersData as $user){

            $schedule = $schedulerTable->newEntity();
            $schedule->user_id = $user['id'];
            $schedule->marketplace_id = 1;
            $schedule->job_interval = 4;
            $schedule->next_occurrence = $time;
            $schedule->type = 'Crawler';
            $schedule->meta_data = serialize([]);
            $schedule->created = Time::now();;
            $schedule->updated = Time::now();;
            $scheduleData = $schedulerTable->save($schedule);

            $schedule1 = $schedulerTable->newEntity();
            $schedule1->user_id = $user['id'];
            $schedule1->marketplace_id = 2;
            $schedule1->job_interval = 4;
            $schedule1->next_occurrence = $time;
            $schedule1->meta_data = serialize([]);
            $schedule1->type = 'Crawler';
            $schedule1->created = Time::now();;
            $schedule1->updated = Time::now();;
            $scheduleData = $schedulerTable->save($schedule1);

        }
    }
}
