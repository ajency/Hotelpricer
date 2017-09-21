<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\SummaryTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\SummaryTable Test Case
 */
class SummaryTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\SummaryTable
     */
    public $Summary;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.summary',
        'app.groups',
        'app.schedulars',
        'app.users',
        'app.products',
        'app.products_to_be_tracked',
        'app.marketplaces',
        'app.product_seller_data',
        'app.sellers',
        'app.pricing_rules',
        'app.channels',
        'app.product_statuses',
        'app.user_preferences'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('Summary') ? [] : ['className' => 'App\Model\Table\SummaryTable'];
        $this->Summary = TableRegistry::get('Summary', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Summary);

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
