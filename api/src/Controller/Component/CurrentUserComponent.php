<?php

namespace App\Controller\Component;
 use Cake\Controller\Component;


use Cake\Network\Request;
use Cake\Utility\Security;
use Firebase\JWT\JWT;
use Cake\ORM\TableRegistry;

 class CurrentUserComponent extends Component{
    public $_config = null;

    public function initialize(array $config){
        parent::initialize($config);
        $this->_config = [
            'header' => 'authorization',
            'prefix' => 'bearer',
            'allowedAlgs' => ['HS256']
        ];
    }


    public function getUserId()
    {
        $payload = $this->getPayload($this->request);
        if (empty($payload)) {
            return false;
        }
        return $payload->sub;
    }


    public function getUser()
    {
        $user_id = $this->getUserId();

        if (!$user_id){
            return false;
        }

        $userTable = TableRegistry::get('Users');
        return $userTable->get_user($user_id);
    }



    public function getPayload(Request $request)
    {
        if (!$request) {
            return false;
        }
        $payload = null;
        $token = $this->getToken($request);
        if ($token) {
            $payload = $this->_decode($token);
        }
        return $payload;
    }


    public function getToken($request = null)
    {
        $config = $this->_config;
        if (!$request) {
            return false;
        }
        $header = $request->header($config['header']);
        if ($header) {
            return str_ireplace($config['prefix'] . ' ', '', $header);
        }else{
          return false;
        }
    }



    protected function _decode($token)
    {
        $config = $this->_config;
        try {
            $payload = JWT::decode($token, $config['key'] ?: Security::salt(), $config['allowedAlgs']);
            return $payload;
        } catch (Exception $e) {            
            return false;
        }
    }


}