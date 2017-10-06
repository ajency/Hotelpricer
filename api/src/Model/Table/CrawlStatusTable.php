<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * CrawlStatus Model
 *
 * @property \Cake\ORM\Association\HasMany $Hotels
 *
 * @method \App\Model\Entity\CrawlStatus get($primaryKey, $options = [])
 * @method \App\Model\Entity\CrawlStatus newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\CrawlStatus[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\CrawlStatus|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\CrawlStatus patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\CrawlStatus[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\CrawlStatus findOrCreate($search, callable $callback = null, $options = [])
 */
class CrawlStatusTable extends Table
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

        $this->setTable('crawl_status');
        $this->setDisplayField('title');
        $this->setPrimaryKey('id');

        $this->hasMany('Hotels', [
            'foreignKey' => 'crawl_status_id'
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

        return $validator;
    }
}
