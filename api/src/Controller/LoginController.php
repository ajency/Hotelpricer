<?php
namespace App\Controller;
use App\Controller\AppController;
use Cake\Core\Configure;
use Cake\Network\Exception\InternalErrorException;
use Cake\Network\Exception\UnauthorizedException;
use Cake\Event\Event;
use Cake\Utility\Text;
use Cake\Utility\Security;
use Cake\ORM\TableRegistry;
use Cake\Auth\DefaultPasswordHasher;
 
/**
 * Login Controller
 *
 * @property \App\Model\Table\LoginTable $Login
 */
class LoginController extends AppController
{
    
    /**
     *  Initialize Controller
     */
     
    public function initialize()
    {          
        $this->loadModel('Users');
        parent::initialize();       
    }
    
    
    public function beforeFilter(Event $event)
    {
        parent::beforeFilter($event);
        $this->Auth->allow(['index', 'logout']);
    }
 
    /**
     * Index Login method  API URL  /api/login method: POST
     * @return json response
     */
    public function index()
    {   
        try {                                    
            if(!isset($this->request->data['username'])){
                throw new UnauthorizedException("Please enter your username");                
            }
             if(!isset($this->request->data['password'])){
                throw new UnauthorizedException("Please enter your password");                
            }
            $username  = $this->request->data['username'];
            $password  = $this->request->data['password'];

            $hasher = new DefaultPasswordHasher();
            /*$password_hash = $hasher->hash($password);

            debug($password_hash);*/
            
            // Check for user credentials
            $usersTable = TableRegistry::get('Users');
            $user = $usersTable->find()->where(['username'=>$username])->first();

            #$user = $this->User->find('login', ['username'=>$username, 'password'=>$password]);
            if(!$user || is_null($user)) {
               throw new UnauthorizedException("Invalid login");     
            }

            //$userdata = $user->toArray();

            if (!$hasher->check($password, $user->password)) {
                throw new UnauthorizedException("Invalid password");
            }
              
              // if everything is OK set Auth session with user data
              $this->Auth->setUser($user);

              //debug($userdata);
              
              // Generate user Auth token
              //$token =  Security::hash($userdata['id'].$userdata['username'], 'sha1', true);
              $token =  Security::hash($user->id.$user->username, 'sha1', true);
              // Add user token into Auth session
              $this->request->session()->write('Auth.User.token', $token);
           
              // return Auth token
              $this->response->header('Authorization', 'Bearer ' . $token);
              
                            
                
        } catch (UnauthorizedException $e) {            
            throw new UnauthorizedException($e->getMessage(),401);   
        }           
        $this->set('user', $this->Auth->user());        
        $this->set('_serialize', ['user']);
    }
     /**
     * Logout user
     * API URL  /api/login method: DELETE
     * @return json response
     */
    public function logout()
    {        
        $this->Auth->logout();
        $this->set('message', 'You were logged out');
        $this->set('_serialize', ['message']);
    }
}