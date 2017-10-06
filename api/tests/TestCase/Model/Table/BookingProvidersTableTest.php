<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\BookingProvidersTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\BookingProvidersTable Test Case
 */
class BookingProvidersTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\BookingProvidersTable
     */
    public $BookingProviders;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.booking_providers',
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
        'app.searches',
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
        $config = TableRegistry::exists('BookingProviders') ? [] : ['className' => 'App\Model\Table\BookingProvidersTable'];
        $this->BookingProviders = TableRegistry::get('BookingProviders', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->BookingProviders);

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
