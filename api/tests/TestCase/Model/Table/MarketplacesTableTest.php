<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\MarketplacesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\MarketplacesTable Test Case
 */
class MarketplacesTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\MarketplacesTable
     */
    public $Marketplaces;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.marketplaces',
        'app.products',
        'app.products_to_be_tracked',
        'app.product_seller_data',
        'app.sellers',
        'app.rules',
        'app.product_statuses',
        'app.users'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('Marketplaces') ? [] : ['className' => 'App\Model\Table\MarketplacesTable'];
        $this->Marketplaces = TableRegistry::get('Marketplaces', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Marketplaces);

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
