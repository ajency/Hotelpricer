<?php
namespace App\Controller\Api;
use Cake\Event\Event;
use Cake\Network\Exception\UnauthorizedException;
use Cake\Utility\Security;
use Firebase\JWT\JWT;

use Cake\Network\Exception\NotAcceptableException;
use Cake\Network\Exception\BadRequestException;

use Cake\ORM\TableRegistry;
use Cake\Utility\Text;


class MicrositeController extends AppController
{
    public function initialize()
    {
        parent::initialize();
        $this->Auth->allow(['register']);
    }


    public function register()
    {
 
    }
 

}
