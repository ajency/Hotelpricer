<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Airports Model
 *
 * @method \App\Model\Entity\Airport get($primaryKey, $options = [])
 * @method \App\Model\Entity\Airport newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Airport[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Airport|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Airport patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Airport[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Airport findOrCreate($search, callable $callback = null, $options = [])
 */
class AirportsTable extends Table
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

        $this->setTable('airports');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');
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
            ->requirePresence('name', 'create')
            ->notEmpty('name');

        $validator
            ->requirePresence('city', 'create')
            ->notEmpty('city');

        $validator
            ->requirePresence('country', 'create')
            ->notEmpty('country');

        $validator
            ->requirePresence('iata', 'create')
            ->notEmpty('iata');

        $validator
            ->allowEmpty('icao');

        $validator
            ->integer('latitude')
            ->requirePresence('latitude', 'create')
            ->notEmpty('latitude');

        $validator
            ->integer('longitude')
            ->requirePresence('longitude', 'create')
            ->notEmpty('longitude');

        $validator
            ->integer('altitude')
            ->requirePresence('altitude', 'create')
            ->notEmpty('altitude');

        $validator
            ->integer('timezone')
            ->requirePresence('timezone', 'create')
            ->notEmpty('timezone');

        $validator
            ->integer('dst')
            ->requirePresence('dst', 'create')
            ->notEmpty('dst');

        $validator
            ->integer('tz_timezone')
            ->requirePresence('tz_timezone', 'create')
            ->notEmpty('tz_timezone');

        $validator
            ->integer('type')
            ->requirePresence('type', 'create')
            ->notEmpty('type');

        $validator
            ->requirePresence('source', 'create')
            ->notEmpty('source');

        return $validator;
    }




    public function getAirports($queryData){
      $query = $this->find();



      if(array_key_exists('keyword', $queryData)){
        $query->where(["Airports.city LIKE" => $queryData['keyword']."%"]);
        $query->orWhere(["Airports.iata LIKE" => $queryData['keyword']."%"]);
        $query->orWhere(["Airports.name LIKE" => $queryData['keyword']."%"]);
      }

      if(array_key_exists('domestic', $queryData)){
        if($queryData['domestic'] == 'yes'){
          $query->where(["Airports.country" => 'India']);
        }
      }

      return $query;
    }




}
