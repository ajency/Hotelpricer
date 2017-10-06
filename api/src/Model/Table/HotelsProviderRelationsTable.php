<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * HotelsProviderRelations Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Hotels
 * @property \Cake\ORM\Association\BelongsTo $BookingProviders
 * @property \Cake\ORM\Association\BelongsTo $Searches
 *
 * @method \App\Model\Entity\HotelsProviderRelation get($primaryKey, $options = [])
 * @method \App\Model\Entity\HotelsProviderRelation newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\HotelsProviderRelation[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\HotelsProviderRelation|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\HotelsProviderRelation patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\HotelsProviderRelation[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\HotelsProviderRelation findOrCreate($search, callable $callback = null, $options = [])
 */
class HotelsProviderRelationsTable extends Table
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

        $this->setTable('hotels_provider_relations');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('Hotels', [
            'foreignKey' => 'hotel_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('BookingProviders', [
            'foreignKey' => 'booking_provider_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('Searches', [
            'foreignKey' => 'search_id',
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
        $rules->add($rules->existsIn(['search_id'], 'Searches'));

        return $rules;
    }
}
