<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\HotelsProviderDataTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\HotelsProviderDataTable Test Case
 */
class HotelsProviderDataTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\HotelsProviderDataTable
     */
    public $HotelsProviderData;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.hotels_provider_data',
        'app.hotels',
        'app.users',
        'app.products',
        'app.products_to_be_tracked',
        'app.marketplaces',
        'app.product_seller_data',
        'app.sellers',
        'app.pricing_rules',
        'app.channels',
        'app.product_statuses',
        'app.user_preferences',
        'app.crawl_status',
        'app.hotels_provider_relations',
        'app.booking_providers',
        'app.batches'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('HotelsProviderData') ? [] : ['className' => 'App\Model\Table\HotelsProviderDataTable'];
        $this->HotelsProviderData = TableRegistry::get('HotelsProviderData', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->HotelsProviderData);

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