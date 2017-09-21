<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\ProductsToBeTrackedTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\ProductsToBeTrackedTable Test Case
 */
class ProductsToBeTrackedTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\ProductsToBeTrackedTable
     */
    public $ProductsToBeTracked;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.products_to_be_tracked',
        'app.products',
        'app.rules',
        'app.users',
        'app.product_seller_data',
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('ProductsToBeTracked') ? [] : ['className' => 'App\Model\Table\ProductsToBeTrackedTable'];
        $this->ProductsToBeTracked = TableRegistry::get('ProductsToBeTracked', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->ProductsToBeTracked);

        parent::tearDown();
    }

    /**
     * Test initialize method
     *
     * @return void
     */
    public function testInitialize()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test validationDefault method
     *
     * @return void
     */
    public function testValidationDefault()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test buildRules method
     *
     * @return void
     */
    public function testBuildRules()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
