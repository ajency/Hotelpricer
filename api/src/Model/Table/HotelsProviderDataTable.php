<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * HotelsProviderData Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Hotels
 * @property \Cake\ORM\Association\BelongsTo $BookingProviders
 * @property \Cake\ORM\Association\BelongsTo $BookingProviders
 * @property \Cake\ORM\Association\BelongsTo $Batches
 *
 * @method \App\Model\Entity\HotelsProviderData get($primaryKey, $options = [])
 * @method \App\Model\Entity\HotelsProviderData newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\HotelsProviderData[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\HotelsProviderData|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\HotelsProviderData patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\HotelsProviderData[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\HotelsProviderData findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class HotelsProviderDataTable extends Table
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

        $this->setTable('hotels_provider_data');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->belongsTo('Hotels', [
            'foreignKey' => 'hotel_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('BookingProviders', [
            'foreignKey' => 'booking_provider_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('BookingProviders', [
            'foreignKey' => 'search_engine_id'
        ]);
        $this->belongsTo('Batches', [
            'foreignKey' => 'batch_id',
            'joinType' => 'INNER'
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
            ->requirePresence('room_type', 'create')
            ->notEmpty('room_type');

        $validator
            ->decimal('rate')
            ->requirePresence('rate', 'create')
            ->notEmpty('rate');

        $validator
            ->allowEmpty('booking_url');

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
        $rules->add($rules->existsIn(['hotel_id'], 'Hotels'));
        $rules->add($rules->existsIn(['booking_provider_id'], 'BookingProviders'));
        $rules->add($rules->existsIn(['search_engine_id'], 'BookingProviders'));
        $rules->add($rules->existsIn(['batch_id'], 'Batches'));

        return $rules;
    }
}
