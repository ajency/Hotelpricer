<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\PricingRuleActionsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\PricingRuleActionsTable Test Case
 */
class PricingRuleActionsTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\PricingRuleActionsTable
     */
    public $PricingRuleActions;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.pricing_rule_actions',
        'app.channels'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('PricingRuleActions') ? [] : ['className' => 'App\Model\Table\PricingRuleActionsTable'];
        $this->PricingRuleActions = TableRegistry::get('PricingRuleActions', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->PricingRuleActions);

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
