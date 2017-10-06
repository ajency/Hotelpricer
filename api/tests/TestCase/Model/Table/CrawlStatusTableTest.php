<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\CrawlStatusTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\CrawlStatusTable Test Case
 */
class CrawlStatusTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\CrawlStatusTable
     */
    public $CrawlStatus;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.crawl_status',
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
        'app.hotels_provider_data',
        'app.booking_providers',
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
        $config = TableRegistry::exists('CrawlStatus') ? [] : ['className' => 'App\Model\Table\CrawlStatusTable'];
        $this->CrawlStatus = TableRegistry::get('CrawlStatus', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->CrawlStatus);

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
