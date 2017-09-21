<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Marketplaces Model
 *
 * @property \Cake\ORM\Association\HasMany $Products
 * @property \Cake\ORM\Association\HasMany $ProductsToBeTracked
 *
 * @method \App\Model\Entity\Marketplace get($primaryKey, $options = [])
 * @method \App\Model\Entity\Marketplace newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Marketplace[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Marketplace|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Marketplace patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Marketplace[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Marketplace findOrCreate($search, callable $callback = null, $options = [])
 */
class MarketplacesTable extends Table
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

        $this->setTable('marketplaces');
        $this->setDisplayField('title');
        $this->setPrimaryKey('id');

        $this->hasMany('Products', [
            'foreignKey' => 'marketplace_id'
        ]);
        $this->hasMany('ProductsToBeTracked', [
            'foreignKey' => 'marketplace_id'
        ]);

        $this->hasMany('ProductSellerData', [
            'foreignKey' => 'marketplace_id'
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
            ->requirePresence('url', 'create')
            ->notEmpty('url');

        $validator
            ->allowEmpty('description');

        return $validator;
    }
}
