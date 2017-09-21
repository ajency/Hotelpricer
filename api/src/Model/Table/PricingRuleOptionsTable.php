<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * PricingRuleOptions Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Actions
 *
 * @method \App\Model\Entity\PricingRuleOption get($primaryKey, $options = [])
 * @method \App\Model\Entity\PricingRuleOption newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\PricingRuleOption[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\PricingRuleOption|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\PricingRuleOption patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\PricingRuleOption[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\PricingRuleOption findOrCreate($search, callable $callback = null, $options = [])
 */
class PricingRuleOptionsTable extends Table
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

        $this->setTable('pricing_rule_options');
        $this->setDisplayField('title');
        $this->setPrimaryKey('id');

        $this->belongsTo('PricingRuleActions', [
            'foreignKey' => 'action_id',
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
            ->requirePresence('title', 'create')
            ->notEmpty('title');

        $validator
            ->requirePresence('slug', 'create')
            ->notEmpty('slug');

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
        $rules->add($rules->existsIn(['action_id'], 'PricingRuleActions'));

        return $rules;
    }
}
