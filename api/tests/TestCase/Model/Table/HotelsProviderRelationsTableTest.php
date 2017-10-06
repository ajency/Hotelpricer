<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\HotelsProviderRelationsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\HotelsProviderRelationsTable Test Case
 */
class HotelsProviderRelationsTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\HotelsProviderRelationsTable
     */
    public $HotelsProviderRelations;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.hotels_provider_relations',
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
        'app.hotels_provider_data',
        'app.booking_providers',
        'app.batches',
        'app.searches'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('HotelsProviderRelations') ? [] : ['className' => 'App\Model\Table\HotelsProviderRelationsTable'];
        $this->HotelsProviderRelations = TableRegistry::get('HotelsProviderRelations', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->HotelsProviderRelations);

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
