<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * UserPreferences Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Users
 *
 * @method \App\Model\Entity\UserPreference get($primaryKey, $options = [])
 * @method \App\Model\Entity\UserPreference newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\UserPreference[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\UserPreference|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UserPreference patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\UserPreference[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\UserPreference findOrCreate($search, callable $callback = null, $options = [])
 */
class UserPreferencesTable extends Table
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

        $this->setTable('user_preferences');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('Users', [
            'foreignKey' => 'user_id',
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
            ->requirePresence('meta_key', 'create')
            ->notEmpty('meta_key');

        $validator
            ->requirePresence('meta_value', 'create')
            ->notEmpty('meta_value');

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

        return $rules;
    }




    public function updatePreferences($postData,$user_id){
      foreach($postData as $key=>$value){
        $this->updatePreference($user_id,$key,$value);
      }
    }



    public function updatePreference($user_id,$meta_key,$meta_value){
      $preference = $this->find()->where(['user_id'=>$user_id,'meta_key'=>$meta_key])->first();
      if(empty($preference)){
        $pref = $this->newEntity();
        $pref->user_id = $user_id;
        $pref->meta_key = $meta_key;
        $pref->meta_value = $meta_value;
      }else{
        $pref = $this->patchEntity($preference, ['meta_value' => $meta_value]);
      }
      $this->save($pref);
    }


    public function getPreference($user_id,$meta_key){
      $preference = $this->find()->where(['user_id'=>$user_id,'meta_key'=>$meta_key])->first();
      if(empty($preference)){
        return false;
      }else{
        return $preference->meta_value;
      }
    }




}
