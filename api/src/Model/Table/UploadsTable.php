<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cake\I18n\Time;

/**
 * Uploads Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Users
 *
 * @method \App\Model\Entity\Upload get($primaryKey, $options = [])
 * @method \App\Model\Entity\Upload newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Upload[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Upload|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Upload patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Upload[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Upload findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class UploadsTable extends Table
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

        $this->setTable('uploads');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

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
            ->requirePresence('file_name', 'create')
            ->notEmpty('file_name');

        $validator
            ->requirePresence('file_path', 'create')
            ->notEmpty('file_path');

        $validator
            ->requirePresence('status', 'create')
            ->notEmpty('status');

        $validator
            ->integer('no_of_listing')
            ->requirePresence('no_of_listing', 'create')
            ->notEmpty('no_of_listing');

        $validator
            ->integer('no_of_rows')
            ->requirePresence('no_of_rows', 'create')
            ->notEmpty('no_of_rows');

        $validator
            ->allowEmpty('details');

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


    public function updateUploadProduct_Ids($upload_id, $details, $status, $credits_used = null) {


        $set = ['status' => $status, 'details' => serialize($details)];
        if($credits_used) {
            $set['credits_used'] = $credits_used;
        }
        $res = $this->query()->update()
            ->set($set)
            ->where(['id' => $upload_id])
            ->execute();
        return $res;
    }



    public function saveUploadData($path,$filename,$user_id,$row_count,$listing_ids_count,$details){

         $upload_data = array(
            'user_id'=>$user_id,
            'file_name'=>$filename,
            'file_path'=>$path,
            'status'=>'Importing',
            'no_of_listing'=>$listing_ids_count,
            'no_of_rows'=>$row_count,
            'details'=>serialize($details),
            'created'=>Time::now()
        );


        $uploadEntity = $this->newEntity();
        $upload = $this->patchEntity($uploadEntity,$upload_data);
        $uploaded = $this->save($upload);
        return $uploaded->id;
    }

    public function getAllUploads($queryData,$user_id){
        $query = $this->find()->where(['user_id'=>$user_id]);

        //Search
        if(array_key_exists('search', $queryData)){
            if(array_key_exists('field', $queryData['search']) && array_key_exists('value', $queryData['search'])){
                if(!empty($queryData['search']['field']) && !empty($queryData['search']['value'])){
                    if($queryData['search']['field'] == 'id'){
                        $query->where(["Uploads.id" => $queryData['search']['value']]);
                    }else if($queryData['search']['field'] == 'filename'){
                        $query->where(["Uploads.file_name LIKE" => "%".$queryData['search']['value']."%"]);
                    }
                }
            }
        }

        //Filters
        if(array_key_exists('filters', $queryData)){

            //Status
            if(array_key_exists('status', $queryData['filters'])){
                $query->where(["Uploads.status" => ucfirst($queryData['filters']['status'])]);
            }

            //Uploaded on
            if(array_key_exists('uploaded_on', $queryData['filters'])){
                $date = \DateTime::createFromFormat('d/m/Y', $queryData['filters']['uploaded_on']);
                //echo $date->format('Y-m-d');
                $query->where([
                  "Uploads.created >=" => $date->format('Y-m-d').' 00:00:00',
                  "Uploads.created <=" => $date->format('Y-m-d').' 23:59:59'
                ]);
            }
        }

        return $query;
    }
}
