<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\PricingRuleActionGroupTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\PricingRuleActionGroupTable Test Case
 */
class PricingRuleActionGroupTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\PricingRuleActionGroupTable
     */
    public $PricingRuleActionGroup;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.pricing_rule_action_group'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('PricingRuleActionGroup') ? [] : ['className' => 'App\Model\Table\PricingRuleActionGroupTable'];
        $this->PricingRuleActionGroup = TableRegistry::get('PricingRuleActionGroup', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->PricingRuleActionGroup);

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
