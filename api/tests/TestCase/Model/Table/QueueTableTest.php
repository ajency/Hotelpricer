<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\QueueTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\QueueTable Test Case
 */
class QueueTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\QueueTable
     */
    public $Queue;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.queue',
        'app.reves'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('Queue') ? [] : ['className' => 'App\Model\Table\QueueTable'];
        $this->Queue = TableRegistry::get('Queue', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Queue);

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
