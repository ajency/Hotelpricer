<?php
namespace App\Test\TestCase\Controller\Api;

use App\Controller\ProductsController;
use Cake\TestSuite\IntegrationTestCase;

use Cake\Utility\Security;
use Firebase\JWT\JWT;


/**
 * App\Controller\ProductsController Test Case
 */
class ProductsControllerTest extends IntegrationTestCase
{

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.products',
        'app.rules',
        'app.users'
    ];



    public function testfetchProducts()
    {

        $token = JWT::encode(['sub' => 1], Security::salt());

        $this->configRequest([
            'headers' => [
            'Authorization' => 'Bearer ' . $token,
            'Content-Type'=>'application/json',
            'Accept'=>'application/json'
            ],
            'data' => ['limit'=>2] 
            ]);

        $this->get('/api/products/all');


        //Check the response code
        $this->assertResponseCode(200);

        //Check the content type
        $this->assertHeader('Content-Type', 'application/json; charset=UTF-8');

        //Check if response not empty
        $this->assertResponseNotEmpty();        

        //Check if success is true        
        $this->assertEquals(true, $this->viewVariable('success'));

        $this->assertResponseContains('"data"');
    }





    public function testProductUpdate(){
        $token = JWT::encode(['sub' => 1], Security::salt());

        $this->configRequest([
            'headers' => [
            'Authorization' => 'Bearer ' . $token,
            'Content-Type'=>'application/json',
            'Accept'=>'application/json'
            ],
            'data' => ['limit'=>2] 
            ]);

        $this->post('/api/products/edit/1');

        //Check the response code
        $this->assertResponseOk();
    }




}
