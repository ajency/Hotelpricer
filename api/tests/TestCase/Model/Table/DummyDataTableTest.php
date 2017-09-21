<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\DummyDataTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\DummyDataTable Test Case
 */
class DummyDataTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\DummyDataTable
     */
    public $DummyData;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.dummy_data',
        'app.marketplaces',
        'app.products',
        'app.products_to_be_tracked',
        'app.product_seller_data',
        'app.sellers',
        'app.pricing_rules',
        'app.channels',
        'app.users',
        'app.user_preferences',
        'app.product_statuses',
        'app.categories',
        'app.listings'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('DummyData') ? [] : ['className' => 'App\Model\Table\DummyDataTable'];
        $this->DummyData = TableRegistry::get('DummyData', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->DummyData);

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
