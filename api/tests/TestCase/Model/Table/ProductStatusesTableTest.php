<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\ProductStatusesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\ProductStatusesTable Test Case
 */
class ProductStatusesTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\ProductStatusesTable
     */
    public $ProductStatuses;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.product_statuses'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('ProductStatuses') ? [] : ['className' => 'App\Model\Table\ProductStatusesTable'];
        $this->ProductStatuses = TableRegistry::get('ProductStatuses', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->ProductStatuses);

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
}
