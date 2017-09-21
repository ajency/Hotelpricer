<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\PricingRuleOptionsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\PricingRuleOptionsTable Test Case
 */
class PricingRuleOptionsTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\PricingRuleOptionsTable
     */
    public $PricingRuleOptions;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.pricing_rule_options',
        'app.actions'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('PricingRuleOptions') ? [] : ['className' => 'App\Model\Table\PricingRuleOptionsTable'];
        $this->PricingRuleOptions = TableRegistry::get('PricingRuleOptions', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->PricingRuleOptions);

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
