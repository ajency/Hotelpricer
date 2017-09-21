<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * PricingRuleActions Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Channels
 *
 * @method \App\Model\Entity\PricingRuleAction get($primaryKey, $options = [])
 * @method \App\Model\Entity\PricingRuleAction newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\PricingRuleAction[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\PricingRuleAction|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\PricingRuleAction patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\PricingRuleAction[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\PricingRuleAction findOrCreate($search, callable $callback = null, $options = [])
 */
class PricingRuleActionsTable extends Table
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

        $this->setTable('pricing_rule_actions');
        $this->setDisplayField('title');
        $this->setPrimaryKey('id');

        $this->belongsTo('Marketplaces', [
            'foreignKey' => 'channel_id',
            'joinType' => 'INNER'
        ]);

        $this->belongsTo('PricingRuleActionGroup', [
            'foreignKey' => 'group_id',
            'joinType' => 'INNER'
        ]);

        $this->hasMany('PricingRuleOptions', [
            'foreignKey' => 'action_id'
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

        $validator
            ->requirePresence('group_id', 'create')
            ->notEmpty('group_id');

        $validator
            ->boolean('allow_price_input')
            ->allowEmpty('allow_price_input');

        $validator
            ->allowEmpty('operators');

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
        $rules->add($rules->existsIn(['channel_id'], 'Marketplaces'));

        return $rules;
    }



    public function getActions($channel_id){
        $actions = $this->find()->select(['id','title','allow_price_input','operators','PricingRuleActionGroup.id','PricingRuleActionGroup.title'])->where(['channel_id'=>$channel_id])->contain([
                'PricingRuleActionGroup',
                'PricingRuleOptions' => [
                'queryBuilder' => function ($q) {
                    return $q->select(['id','title','action_id']);
                }
                ]
            ])->group(['PricingRuleActions.group_id']);

        foreach($actions as $action){
            if($action->operators !== null){
                $action->operators = json_decode($action->operators);
            }
        }

        return $actions;
    }


}
