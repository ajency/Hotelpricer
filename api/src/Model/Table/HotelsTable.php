<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Hotels Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Users
 * @property \Cake\ORM\Association\BelongsTo $CrawlStatus
 * @property \Cake\ORM\Association\HasMany $HotelsProviderData
 * @property \Cake\ORM\Association\HasMany $HotelsProviderRelations
 *
 * @method \App\Model\Entity\Hotel get($primaryKey, $options = [])
 * @method \App\Model\Entity\Hotel newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Hotel[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Hotel|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Hotel patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Hotel[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Hotel findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class HotelsTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('hotels');
        $this->setDisplayField('title');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->belongsTo('Users', [
            'foreignKey' => 'user_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('CrawlStatus', [
            'foreignKey' => 'crawl_status_id',
            'joinType' => 'INNER'
        ]);
        $this->hasMany('HotelsProviderData', [
            'foreignKey' => 'hotel_id'
        ]);
        $this->hasMany('HotelsProviderRelations', [
            'foreignKey' => 'hotel_id'
        ]);
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
            ->requirePresence('title', 'create')
            ->notEmpty('title');

        $validator
            ->requirePresence('address', 'create')
            ->notEmpty('address');

        $validator
            ->integer('numbr_of_rooms')
            ->requirePresence('numbr_of_rooms', 'create')
            ->notEmpty('numbr_of_rooms');

        $validator
            ->requirePresence('type', 'create')
            ->notEmpty('type');

        $validator
            ->boolean('active')
            ->requirePresence('active', 'create')
            ->notEmpty('active');

        $validator
            ->dateTime('last_tracked_on')
            ->allowEmpty('last_tracked_on');

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
        $rules->add($rules->existsIn(['crawl_status_id'], 'CrawlStatus'));

        return $rules;
    }
}
