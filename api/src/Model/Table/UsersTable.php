<?php
namespace App\Model\Table;

use Cake\Core\Configure;
use Cake\Datasource\ConnectionManager;
use Cake\I18n\Date;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\ORM\TableRegistry;
use Cake\Validation\Validator;
use Cake\Network\Request;

use Cake\Mailer\Email;


/**
 * Users Model
 *
 * @method \App\Model\Entity\User get($primaryKey, $options = [])
 * @method \App\Model\Entity\User newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\User[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\User|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\User patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\User[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\User findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class UsersTable extends Table
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

        $this->setTable('users');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->hasMany('Products', [
            'foreignKey' => 'user_id'
        ]);

        $this->hasMany('UserPreferences', [
            'foreignKey' => 'user_id'
        ]);

        $this->hasMany('PricingRules', [
            'foreignKey' => 'user_id'
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
            ->requirePresence('username', 'create')
            ->notEmpty('username');

        $validator
            ->requirePresence('password', 'create')
            ->notEmpty('password');

        $validator
              ->requirePresence('email', 'create')
              ->notEmpty('email');

        $validator
            ->boolean('active')
            ->allowEmpty('active');

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
        $rules->add($rules->isUnique(['username']));
        $rules->add($rules->isUnique(['email']));

        return $rules;
    }



    public function get_user($id){
        return $this->find()->select(['id','username','email','active','created','modified'])->where(['id'=>$id])->first();
    }




    public function sendPasswordResetMail($recipent,$reset_link){
        $message = "Hi<br /><br /><br />";
        $message .="Please click on this link to reset password:<br />";
        $message .="<a href='".$reset_link."'>".$reset_link."</a><br /><br />";
        $message .="Thanks<br />";
        $message .="Team Repricer";
        $email = new Email();
        $email->transport('mailchimp');
        $email->from(['repricer@browntape.com' => 'Repricer'])
          ->to($recipent)
          ->subject('Reset Password')
          ->emailFormat('html');
        $send = $email->send($message);

          return $send;
    }




    public function sendEmail($template_name, $template_vars, $subject, $recepients, $tags, $sender_name = 'Browntape Tracker', $sender_email = 'support@browntape.com') {


        $bcc_address = 'tracker.signups@browntape.com';
        $api_url = 'https://mandrillapp.com/api/1.0/messages/send-template.json';
        $config = \Cake\Mailer\Email::getConfigTransport('mailchimp');
        $message_obj['key'] = $config['password'];
        $message_obj['template_name'] = $template_name;
        $message_obj['template_content'] = $template_vars;
        $message_obj['message']['global_merge_vars'] = $template_vars;
        $message_obj['message']['from_name'] = $sender_name;
        $message_obj['message']['from_email'] = $sender_email;
        $message_obj['message']['subject'] = $subject;
        $message_obj['message']['to'] = $recepients;
        $message_obj['message']['bcc_address'] = $bcc_address;
        $message_obj['tags'] = $tags;

        $ch = curl_init($api_url);

#        curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($message_obj));
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

    public function sendCrawlCompleteEmail($recipient_email_user_ids) {
        foreach($recipient_email_user_ids as $user_id => $batches) {

            foreach($batches as $batch_id => $value) {
                if(array_sum($value) == 0)
                {
                    $connection = ConnectionManager::get('default');
                    $query = "SELECT message FROM `queue` q inner join `summary` s on q.group_id = s.group_id where s.batch_id = ".$batch_id;
                    $queue_items = $connection->execute($query)->fetchAll('assoc');
                    if($queue_items) {
                        $ptbt_ids = [];
                        foreach($queue_items as $item) {
                            $ptbt_ids = array_merge($ptbt_ids, reset(unserialize($item['message'])));
                        }
                        $productsTable = TableRegistry::get('Products');
                        $user = $this->find()->select(['id','name','email'])->where(['id'=>$user_id])->first();
                        $data = $productsTable->getTopMetrics($user_id,[]);
                        $template_name = 'crawl-complete';
                        $template_vars = [
                            [ 'name' => 'DATE' ,  'content' => date('g:i A l, d M Y') ],
                            [ 'name' => 'NAME' , 'content' => $user->name ],
                            [ 'name' => 'COUNT' , 'content' => count(array_unique($ptbt_ids)) ],
                            [ 'name' => 'CRAWLED' , 'content' => count(array_unique($ptbt_ids)) ],
                            [ 'name' => 'TOTAL' , 'content' => $data['product_count']],
/*                            [ 'name' => 'COMPETING' , 'content' => $data['product_count']],*/

                            /*                    [ 'name' => 'SELLING' , 'content' => $data['im_selling' ]],
                                                                [ 'name' => 'BUYBOX' , 'content' => $data['i_have_buybox' ]],
                                                                [ 'name' => 'LOWEST' , 'content' => $data['im_lowest' ]],
                                                                [ 'name' => 'RANK' , 'content' => $data['my_avg_rank' ]],*/

                        ];
                        $subject = 'Tracker: Products updated - '.date('g:i A l, d M y');
                        $tags = ['tracker','crawl-complete'];
                        $recepients = [
                            [ 'email' => $user->email, 'name' => $user->name , 'type' => 'to' ]
                        ];
                        print_r($this->sendEmail($template_name, $template_vars, $subject, $recepients, $tags));
                    }
                }
            }
        }
    }
}
