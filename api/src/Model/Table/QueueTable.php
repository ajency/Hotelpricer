<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cake\ORM\TableRegistry;

/**
 * Queue Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Reves
 *
 * @method \App\Model\Entity\Queue get($primaryKey, $options = [])
 * @method \App\Model\Entity\Queue newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Queue[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Queue|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Queue patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Queue[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Queue findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class QueueTable extends Table
{

    CONST TYPE_CRAWL = 0;
    CONST TYPE_CRAWL_NEW = 1;
    CONST TYPE_CRAWL_INTERVAL = 2;
    CONST TYPE_CRAWL_FAILED = 3;

    CONST TYPE_IMPORT = 4;

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('queue');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');
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
            ->requirePresence('message', 'create')
            ->notEmpty('message');

        $validator
            ->integer('status')
            ->requirePresence('status', 'create')
            ->notEmpty('status');

        return $validator;
    }

    public function addQueue($products,$schedulerId){
        $queueTable = TableRegistry::get('Queue');
        $job = $queueTable->newEntity();

        $job->message = serialize($products);
        $job->ref_id = $schedulerId;
        $job->type = 1;
        $queueTable->save($job);
    }


    public function addQueueItem($message,$ref_id, $priority = 0, $type = 0, $group_id) {

/*      if(is_null($group_id)){
        $group_id = time().rand(10*45, 100*98);
      }*/

   /*     if(is_null($batch_id)){
            $batch_id = $group_id;
        }*/

        $queueTable = TableRegistry::get('Queue');
        $job = $queueTable->newEntity();
        $job->message = serialize($message);
        $job->ref_id = $ref_id;
        $job->priority = $priority;
        $job->group_id = $group_id;
        $job->type = $type;
        $queueTable->save($job);

/*        $summaryTable = TableRegistry::get('Summary');
        $summaryTable->saveGroupEntry($group_id,$batch_id,$ref_id);*/


    }

    public function addQueueItems($message,$ref_id, $priority = 0, $type = 0, $group_id = null) {

    }
}
