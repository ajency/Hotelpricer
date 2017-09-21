<?php
namespace App\Controller\Api;
use App\Model\Table\SchedulerTable;
use Cake\Event\Event;
use Cake\Network\Exception\UnauthorizedException;
use Cake\Utility\Security;
use Firebase\JWT\JWT;

use Cake\Network\Exception\NotAcceptableException;
use Cake\Network\Exception\BadRequestException;

use Cake\ORM\TableRegistry;
use Cake\Utility\Text;
use Cake\I18n\Time;

class UsersController extends AppController
{
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('Crawler');
        $this->Auth->allow(['add', 'token', 'forgotPassword', 'resetPassword','registerUser']);
    }


    public function add()
    {
        $this->Crud->on('afterSave', function(Event $event) {
            if ($event->subject->created) {
                $this->set('data', [
                    'id' => $event->subject->entity->id,
                    'token' => JWT::encode(
                        [
                        'sub' => $event->subject->entity->id,
                        'exp' =>  time() + 604800
                        ],
                        Security::salt())
                    ]);
                $this->Crud->action()->config('serialize.data', 'data');
            }
        });
        return $this->Crud->execute();
    }



    public function token()
    {

        $rulesTable = TableRegistry::get('PricingRules');

        $statusTable = TableRegistry::get('ProductStatuses');
        $marketplacesTable = TableRegistry::get('Marketplaces');

        $user = $this->Auth->identify();
        if (!$user) {
            throw new UnauthorizedException('Invalid username or password');
        }

        $user_data = $this->Users->findById($user['id'])->contain(['UserPreferences'])->first();
        // $user_data['account_verified'] = false;
        $user_data['dummy_uploaded'] = false;
        $user_data['dummy_cleared'] = false;

        foreach($user_data->user_preferences as $preference){

          if($preference->meta_key == 'dummy_uploaded'){
            if($preference->meta_value == '1'){
              $user_data['dummy_uploaded'] = true;
            }
          }

          if($preference->meta_key == 'dummy_cleared'){
            if($preference->meta_value == '1'){
              $user_data['dummy_cleared'] = true;
            }
          }

        }

        if($this->request->header('authorization') == null){
          $token = JWT::encode([
                  'sub' => $user['id'],
                  'exp' =>  time() + 604800
                  ],
                  Security::salt());
        }else{
          $token = str_ireplace('bearer' . ' ', '', $this->request->header('authorization'));
        }

        $pricing_rules = $rulesTable->find('list', [
            'keyField' => 'id',
            'valueField' => 'title',
            'groupField' => 'channel_id'
            ])->where(['user_id'=>$user['id']])->orWhere(['type'=>'default'])->toArray();

        $status = $statusTable->find('list', [
            'keyField' => 'id',
            'valueField' => 'label'
            ])->toArray();

        $smarketplaces = $marketplacesTable->find('list', [
            'keyField' => 'id',
            'valueField' => 'title'
            ])->toArray();


        $data = [
            'token'=>$token,
            'user'=>$user_data,
            'default_pricing_rules'=>$pricing_rules,
            'status'=>$status,
            'marketplaces'=>$smarketplaces
        ];

        $this->set('success', true);
        $this->set('data', $data);
        $this->set('_serialize', ['success', 'data']);
    }





    public function forgotPassword(){
      if ($this->request->is(['patch', 'get', 'put'])) {
          throw new BadRequestException('Bad request method!');
      }

      $postData = $this->request->data;

      if(!isset($postData['email'])){
          throw new NotAcceptableException('Email id is missing!');
      }

      $user = $this->Users->findByEmail($postData['email'])->first();
      if(empty($user)){
        throw new NotAcceptableException('No user associated with the email id!');
      }

      $password = sha1(Text::uuid());
      $password_token = Security::hash($password, 'sha256', true);
      $hashval = sha1($user->username . rand(1, 100));
      $user->password_reset_token = $password_token;
      $user->hashval = $hashval;

      $env = getenv("environment");
      $webapp_url = getenv("webapp_url");
      $rest_url = $webapp_url."/reset-password"."/".$password_token . "#" . $hashval;
      $rest_url = preg_replace('/([^:])(\/{2,})/', '$1/', $rest_url);

      if($this->Users->sendPasswordResetMail($user->email,$rest_url)){
        $this->Users->save($user);
        $this->set('success', true);
        $this->set('status', 'Password reset mail sent to user.');
      }else{
        $this->set('success', false);
        $this->set('status', 'Unable to send password reset email!');
      }

      $this->set('_serialize', ['success','status']);

    }




    public function resetPassword(){
      if ($this->request->is(['patch', 'get', 'put'])) {
          throw new BadRequestException('Bad request method!');
      }

      $postData = $this->request->data;

      if(!isset($postData['token'])){
          throw new NotAcceptableException('Token is missing!');
      }

      if(!isset($postData['new_password'])){
          throw new NotAcceptableException('New Password is missing!');
      }

      if(!isset($postData['confirm_password'])){
          throw new NotAcceptableException('Confirm Password is missing!');
      }


      $token = strtok($postData['token'],  '#');
      $user = $this->Users->findByPasswordResetToken($token)->first();
      if(empty($user)){
        throw new NotAcceptableException('Invalid token!');
      }

      $user = $this->Users->patchEntity($user, [
                        'password' => $postData['new_password'],
                        'new_password' => $postData['new_password'],
                        'confirm_password' => $postData['confirm_password']
                            ]
                    );
      $hashval_new = sha1($user->username . rand(1, 100));
      $user->password_reset_token = $hashval_new;

      if($postData['new_password'] != $postData['confirm_password']){
        $this->set('success', false);
        $this->set('status', 'Password and confirm password does not match!');
      }else{
        if($this->Users->save($user)) {
          $this->set('success', true);
          $this->set('status', 'Password reset successfully.');
        }else{
          $this->set('success', false);
          $this->set('status', 'Error resetting password!');
        }
      }

      $this->set('_serialize', ['success','status']);
    }





    public function updatePreferences(){
      if (!$this->request->is('post')) {
          throw new BadRequestException('Bad request method!');
      }

      $postData = $this->request->data;
      if(empty($postData)){
        throw new NotAcceptableException('No preference data recieved!');
      }

      $user = $this->Auth->identify();

      $preferencesTable = TableRegistry::get('UserPreferences');
      $preferencesTable->updatePreferences($postData,$user['id']);

      $this->set('success', true);
      $this->set('status', 'User preferences data updated successfully');
      $this->set('_serialize', ['success','status']);
    }



    public function registerUser(){


      if (!$this->request->is('post')) {
          throw new BadRequestException('Bad request method!');
      }

      // generate OTP
      $postData = $this->request->data;

      $name = (isset($postData['name'])) ? $postData['name']:'';
      $email = (isset($postData['email'])) ? $postData['email']:'';
      $phone = (isset($postData['phone'])) ? $postData['phone']:'';
      $password = (isset($postData['password'])) ? $postData['password']:'';

      $otpExpiry = date("Y-m-d H:i:s", strtotime("+1 days"));
      $otp = $this->generateOtp();

      $postData['otp'] = $otp;
      $postData['otp_expiry'] = $otpExpiry;

      $username = $email;

      $emailExists = $this->Users->exists(['email' => $email]);
      $smsSent = false;

      $redirect_url = '';
      if($email!="" && !$emailExists){
          $user = $this->Users->newEntity();
          $user->username = $username;
          $user->password = $password;
          $user->name = $name;
          $user->email = $email;
          $user->phone = $phone;
          $user->otp = $otp;
          $user->active = true;
          $user->otp_expiry = $otpExpiry;
          $userData = $this->Users->save($user);

          if($userData){

              $postData['send-otp'] = true;
              if(isset($postData['send-otp']) && ($postData['send-otp'] == true || $postData['send-otp'] == 1 || $postData['send-otp'] == "true")) {

                  if($this->sendOtpSms($phone,$otp)){
                    $smsSent = true;
                  }

              } else {
                  $marketplaces = SchedulerTable::getEnabledMarketplaces();
                  foreach($marketplaces as $marketplace_id) {
                      $default_interval = SchedulerTable::DEFAULT_INTERVAL;
                      $time = new Time('+'.$default_interval.' seconds');
                      $schedulerTable = TableRegistry::get('Scheduler');
                      $schedule = $schedulerTable->newEntity();
                      $schedule->user_id = $userData['id'];
                      $schedule->marketplace_id = $marketplace_id;
                      $schedule->job_interval = SchedulerTable::DEFAULT_INTERVAL;
                      $schedule->next_occurrence = $time;
                      $schedule->type = 'Crawler';
                      $schedule->meta_data = serialize([]);
                      $schedule->created = Time::now();
                      $schedule->updated = Time::now();
                      $scheduleData = $schedulerTable->save($schedule);
                  }
              }

              $token = JWT::encode([
                'sub' => $userData['id'],
                'exp' =>  strtotime(date("Y-m-d H:i:s", strtotime("+30 days"))) //time() + 604800
                ],
                Security::salt());

              $env = getenv("environment");
              $webapp_url = getenv("webapp_url");
              if($env=='local'){
                $webapp_url .= '#/';
              }
              $redirect_url = $webapp_url.'/login/'.$token;
              $redirect_url = preg_replace('/([^:])(\/{2,})/', '$1/', $redirect_url);


              $template_vars = [
                  [ 'name' => 'NAME' , 'content' => $user->name ],
                  [ 'name' => 'EMAIL' , 'content' => $user->email ],
                  [ 'name' => 'PHONE' , 'content' => $user->phone ],
              ];
              $recepients = [
                  [ 'email' => $user->email, 'name' => $user->name , 'type' => 'to' ]
              ];
              $this->Users->sendEmail('tracker-welcome-email', $template_vars, 'Welcome to Browntape Tracker', $recepients, ['tracker','signup']);

              $message = 'User data registered successfully';
              $result = true;
          }
          else{
            $result = false;
            $message = 'Failed to register user data.';
          }

      }else{
          $result = false;
          $message = 'Email id already exists.';
      }



      $this->set('sms_sent', $smsSent);
      $this->set('status', $result);
      $this->set('redirect_url', $redirect_url);
      $this->set('message', $message);

      $this->set('_serialize', ['status','redirect_url','sms_sent','message']);
    }

    public function sendOtpSms($phone,$otp){

      $request =""; //initialise the request variable
      $param['method']= "sendMessage";
      $param['send_to'] = $phone;
      //$param['msg'] = "Your one-time password is ".$otp." for phone number verification. This OTP is valid for 24 hours. Do not share this with anyone for security reasons.";
      $param['msg'] = $otp." is the One Time Password (OTP) to activate your Browntape Tracker account. This OTP is valid for 24 hours.";

      $param['userid'] = "2000172303";
      $param['password'] = "daPNa4Vds";
      $param['v'] = "1.1";
      $param['msg_type'] = "TEXT"; //Can be "FLASH”/"UNICODE_TEXT"/”BINARY”
      $param['auth_scheme'] = "PLAIN";
      //Have to URL encode the values
      foreach($param as $key=>$val) {
      $request.= $key."=".urlencode($val);
      //we have to urlencode the values
      $request.= "&";
      //append the ampersand (&) sign after each parameter/value pair
      }
      $request = substr($request, 0, strlen($request)-1);
      //remove final (&) sign from the request
      $url = "http://enterprise.smsgupshup.com/GatewayAPI/rest?".$request;
      $ch = curl_init($url);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      $result = curl_exec($ch);
      $info=curl_getinfo($ch,CURLINFO_HTTP_CODE);
      curl_close($ch);

      $json_data = json_decode($result, true);

      if(isset($json_data['error']))
      {
          return false;
      }
      else
      {
          return true;
      }

    }


    public function generateOtp()
    {
       $otp = rand(100000,999999);

       $userOtp = $this->Users->find()->where(['otp'=> $otp])->first();

       if(empty($userOtp)){
          $result = $otp;
       }else{
          $result = $this->generateOtp();
       }

       return $result;

    }


    public function verifyPhoneNumber(){
      if (!$this->request->is('post')) {
          throw new BadRequestException('Bad request method!');
      }

      $postData = $this->request->data;
      if(empty($postData)){
        throw new NotAcceptableException('No preference data recieved!');
      }

      $user = $this->Auth->identify();

      $otp =  (isset($postData['otp'])) ? $postData['otp']:'';

      if($otp!="" && $otp== $user['otp']){
        $otpExpiry = $user['otp_expiry'];
        $currentDate = date('Y-m-d H:i:s');
        $datetime1 = new \DateTime($otpExpiry);
        $datetime2 = new \DateTime($currentDate);

        if($datetime2 > $datetime1){
          $status = false;
          $message = 'OTP Exipred';
        }
        else{
          //update users table
          $query = $this->Users->query();
          $query->update()->set(['otp'=>'', 'phone_verified'=>1,'account_verified'=>1])
                        ->where(['id' => $user['id']])
                        ->execute();
          $status = true;
          $message = 'Mobile number successfully verified.';
        }


      }
      else{
        $status = false;
        $message = 'Invalid OTP';
      }

      $this->set('status', $status);
      $this->set('message', $message);

      $this->set('_serialize', ['status','message']);

    }

    public function resendOtp(){
        if (!$this->request->is('post')) {
          throw new BadRequestException('Bad request method!');
        }

        $user = $this->Auth->identify();

        $phone = $user['phone'];
        $otp = $this->generateOtp();
        $otpExpiry = date("Y-m-d H:i:s", strtotime("+1 days"));

        $query = $this->Users->query();
        $query->update()->set(['otp'=> $otp, 'otp_expiry'=>$otpExpiry])
                      ->where(['id' => $user['id']])
                      ->execute();


        if($this->sendOtpSms($phone,$otp)){
          $smsSent = true;
        }
        else{
          $smsSent = false;
        }

        $this->set('sms_sent', $smsSent);
        $this->set('status', true);
        $this->set('message', 'New OTP Updated');

        $this->set('_serialize', ['status','message','sms_sent']);
    }


    public function updatePhoneNumber(){
        if (!$this->request->is('post')) {
          throw new BadRequestException('Bad request method!');
        }

        $postData = $this->request->data;
        if(empty($postData)){
          throw new NotAcceptableException('No preference data recieved!');
        }

        $user = $this->Auth->identify();


        $phone =  (isset($postData['phone'])) ? $postData['phone']:'';
        if($phone !='' && strlen($phone)==10){

          $otp = $this->generateOtp();
          $otpExpiry = date("Y-m-d H:i:s", strtotime("+1 days"));

          $query = $this->Users->query();
          $query->update()->set(['otp'=> $otp, 'phone'=> $phone, 'otp_expiry'=>$otpExpiry])
                        ->where(['id' => $user['id']])
                        ->execute();


          if($this->sendOtpSms($phone,$otp)){
            $smsSent = true;
          }
          else{
            $smsSent = false;
          }

          $message = "User phone number updated and OTP sent";
          $status = true;
        }
        else{
          $smsSent = false;
          $status = false;
          $message = "Invalid phone number";
        }

        $this->set('sms_sent', $smsSent);
        $this->set('status', $status);
        $this->set('message', $message);

        $this->set('_serialize', ['status','message','sms_sent']);
    }


    public function importDummyData(){
       if (!$this->request->is('post')) {
          throw new BadRequestException('Bad request method!');
        }

        $postData = $this->request->data;
        if(empty($postData)){
          throw new NotAcceptableException('No preference data recieved!');
        }

        $user = $this->Auth->identify();

        $marketplaceId = (isset($postData['marketplace_id'])) ? $postData['marketplace_id']:0;
        $categoryId = (isset($postData['category_id'])) ? $postData['category_id']:0;

        $dummyDataTable = TableRegistry::get('DummyData');
        $dummyData = $dummyDataTable->find()->select(["listing_id"])->where(['marketplace_id' => $marketplaceId,'category_id' => $categoryId])->toArray();

        $productIds = [];
        if(!empty($dummyData)){
          $listingIds = [];

          $productsTable = TableRegistry::get('Products');
          $productsToBeTrackedTable = TableRegistry::get('ProductsToBeTracked');

          foreach ($dummyData as $data) {
            $listingId = $data['listing_id'];
            $sellerId = $data['seller_id'];

            $product = $productsTable->newEntity();
            $product->marketplace_id = $marketplaceId;
            $product->seller_id = $sellerId;
            $product->listing_id = $listingId;
            $product->rule_id = $this->mpRule($marketplaceId);
            $product->status = 1;
            $product->user_id = $user['id'];
            $productObj = $productsTable->save($product);

            if($productObj){

              $productId = $productObj['id'];
              $productsToBeTracked = $productsToBeTrackedTable->newEntity();
              $productsToBeTracked->marketplace_id = $marketplaceId;
              $productsToBeTracked->product_id = $productId;
              $productsToBeTracked->listing_id = $listingId;
              $productsToBeTracked->listing_url = '';
              $productsToBeTracked->crawl_status = 'Processed';
              $productsToBeTrackedTable->save($productsToBeTracked);

              $productIds[] = $productId;

            }

          }


          if(!empty($productIds)){
            $this->Crawler->run($productIds,false);
          }

          //add products

          $status = true;
          $message = 'Dummy data successfully added to users account';

          $userPreferenceTable = TableRegistry::get('UserPreferences');

          $userPreferenceTable->updatePreference($user['id'],'dummy_uploaded','1');

        }else{
          $status = false;
          $message = 'No data available for provided market place and category';
        }

        $this->set('status', $status);
        $this->set('message', $message);
        $this->set('_serialize', ['status','message','sms_sent']);

    }

    public function mpRule($marketplaceId)
    {

        if ($marketplaceId == 1)
            $ruleId = 1;
        else
            $ruleId = $marketplaceId + 2;

        return $ruleId;

    }




}
