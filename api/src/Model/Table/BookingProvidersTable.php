<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * BookingProviders Model
 *
 * @property \Cake\ORM\Association\HasMany $HotelsProviderData
 * @property \Cake\ORM\Association\HasMany $HotelsProviderRelations
 *
 * @method \App\Model\Entity\BookingProvider get($primaryKey, $options = [])
 * @method \App\Model\Entity\BookingProvider newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\BookingProvider[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\BookingProvider|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\BookingProvider patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\BookingProvider[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\BookingProvider findOrCreate($search, callable $callback = null, $options = [])
 */
class BookingProvidersTable extends Table
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

        $this->setTable('booking_providers');
        $this->setDisplayField('title');
        $this->setPrimaryKey('id');

        $this->hasMany('HotelsProviderData', [
            'foreignKey' => 'booking_provider_id'
        ]);
        $this->hasMany('HotelsProviderRelations', [
            'foreignKey' => 'booking_provider_id'
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
            ->allowEmpty('url');

        $validator
            ->boolean('is_search_engine')
            ->requirePresence('is_search_engine', 'create')
            ->notEmpty('is_search_engine');

        return $validator;
    }
}
