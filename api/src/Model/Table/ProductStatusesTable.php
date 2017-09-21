<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * ProductStatuses Model
 *
 * @method \App\Model\Entity\ProductStatus get($primaryKey, $options = [])
 * @method \App\Model\Entity\ProductStatus newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\ProductStatus[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\ProductStatus|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\ProductStatus patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\ProductStatus[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\ProductStatus findOrCreate($search, callable $callback = null, $options = [])
 */
class ProductStatusesTable extends Table
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

        $this->setTable('product_statuses');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->hasMany('Products', [
            'foreignKey' => 'status'
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
            ->requirePresence('label', 'create')
            ->notEmpty('label');

        $validator
            ->allowEmpty('description');

        return $validator;
    }
}
