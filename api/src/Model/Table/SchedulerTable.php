<?php
namespace App\Model\Table;

use Cake\Core\Exception\Exception;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cake\I18n\Time;
use Cake\Datasource\ConnectionManager;


/**
 * Scheduler Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Users
 * @property \Cake\ORM\Association\BelongsTo $Marketplaces
 *
 * @method \App\Model\Entity\Scheduler get($primaryKey, $options = [])
 * @method \App\Model\Entity\Scheduler newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Scheduler[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Scheduler|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Scheduler patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Scheduler[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Scheduler findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class SchedulerTable extends Table
{

    CONST DEFAULT_INTERVAL = 7200; //in seconds

    CONST RUN_STATUS_OFF = 0; //in seconds
    CONST RUN_STATUS_ON = 1; //in seconds
    CONST RUN_STATUS_TODO = 2; //in seconds
    CONST RUN_STATUS_DONE = 3; //in seconds

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('scheduler');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->belongsTo('Users', [
            'foreignKey' => 'user_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('Marketplaces', [
            'foreignKey' => 'marketplace_id',
            'joinType' => 'INNER'
        ]);
    }


    public static function getEnabledMarketplaces() {
        return [
            1,2
        ];
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        $validator
            ->integer('id')
            ->allowEmpty('id', 'create');

        $validator
            ->integer('interval')
            ->requirePresence('interval', 'create')
            ->notEmpty('interval');

        $validator
            ->dateTime('next_occurrence')
            ->requirePresence('next_occurrence', 'create')
            ->notEmpty('next_occurrence');

        $validator
            ->requirePresence('meta_data', 'create')
            ->notEmpty('meta_data');

        $validator
            ->requirePresence('type', 'create')
            ->notEmpty('type');

        return $validator;
    }

    /**
     * Returns a rules checker object that will be used for validating
     * application integrity.
     *
     * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
     * @return \Cake\ORM\RulesChecker
     */
    public function buildRules(RulesChecker $rules)
    {
        $rules->add($rules->existsIn(['user_id'], 'Users'));
        $rules->add($rules->existsIn(['marketplace_id'], 'Marketplaces'));

        return $rules;
    }

    public function getCurrentScheduler() {
        $currentDateTime = Time::now();
        $date = $currentDateTime->format('Y-m-d H:i');
        $connection = ConnectionManager::get('default');
        $q = 'SELECT * FROM scheduler where DATE_FORMAT(next_occurrence, "%Y-%m-%d %H:%i") <= "'.$date.'" OR run = '.self::RUN_STATUS_ON;
        print_r($q);
        $schedulers = $connection->execute($q)->fetchAll('assoc');
        $scheduler_ids = array_column($schedulers, 'id');
        //To avoid the dreaded queue race condition
        if(!empty($scheduler_ids)) {
            $this->query()->update()
                ->set(['run' => self::RUN_STATUS_TODO])
                ->where(['id IN' => $scheduler_ids])
                ->where(['run' => self::RUN_STATUS_ON])
                ->execute();
        }
        print_r($scheduler_ids);
        print_r($schedulers);
        return $schedulers;
    }


    public function changeRunStatusForUser($userId, $status = 1, $marketplace_id = null) {
        try {
            $query = $this->query();
            $query->update()
                ->set(['run' => $status])
                ->where(['user_id' => $userId]);
            if($marketplace_id) {
                $query->where(['marketplace_id' => $marketplace_id]);
            }
            $query->execute();
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function updateNextOccurrence($schedulerId,$interval) {
        $time = new Time('+'.$interval.' seconds');
        $query = $this->query();
        $query->update()
        ->set(['next_occurrence' => $time])
        ->where(['id' => $schedulerId])
        ->execute();
    }

    public function updateNextOccurrenceForUser($userId, $interval = 0, $marketplace_id = null) {

        try {
            $time = new Time('+'.$interval.' seconds');
            $query = $this->query();
            $query->update()
                ->set(['next_occurrence' => $time])
                ->where(['user_id' => $userId]);
            if($marketplace_id) {
                $query->where(['marketplace_id' => $marketplace_id]);
            }
            $query->execute();
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function updateNextOccurrenceForAll($interval = 0, $marketplace_id = null){
        try {
            $time = new Time('+'.$interval.' seconds');
            $query = $this->query();
            $query->update()
                ->set(['next_occurrence' => $time]);
            if($marketplace_id) {
                $query->where(['marketplace_id' => $marketplace_id]);
            }
            $query->execute();
        } catch (Exception $e) {
            throw $e;
        }
    }
}
