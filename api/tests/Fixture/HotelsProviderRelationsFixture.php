<?php
namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * HotelsProviderRelationsFixture
 *
 */
class HotelsProviderRelationsFixture extends TestFixture
{

    /**
     * Fields
     *
     * @var array
     */
    // @codingStandardsIgnoreStart
    public $fields = [
        'id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'autoIncrement' => true, 'precision' => null],
        'hotel_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'booking_provider_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'search_id' => ['type' => 'string', 'length' => 64, 'null' => false, 'default' => null, 'collate' => 'latin1_swedish_ci', 'comment' => '', 'precision' => null, 'fixed' => null],
        '_indexes' => [
            'hotel_id' => ['type' => 'index', 'columns' => ['hotel_id', 'booking_provider_id'], 'length' => []],
            'booking_provider_id' => ['type' => 'index', 'columns' => ['booking_provider_id'], 'length' => []],
        ],
        '_constraints' => [
            'primary' => ['type' => 'primary', 'columns' => ['id'], 'length' => []],
            'hotels_provider_relations_ibfk_1' => ['type' => 'foreign', 'columns' => ['hotel_id'], 'references' => ['hotels', 'id'], 'update' => 'noAction', 'delete' => 'noAction', 'length' => []],
            'hotels_provider_relations_ibfk_2' => ['type' => 'foreign', 'columns' => ['booking_provider_id'], 'references' => ['booking_providers', 'id'], 'update' => 'noAction', 'delete' => 'noAction', 'length' => []],
        ],
        '_options' => [
            'engine' => 'InnoDB',
            'collation' => 'latin1_swedish_ci'
        ],
    ];
    // @codingStandardsIgnoreEnd

    /**
     * Records
     *
     * @var array
     */
    public $records = [
        [
            'id' => 1,
            'hotel_id' => 1,
            'booking_provider_id' => 1,
            'search_id' => 'Lorem ipsum dolor sit amet'
        ],
    ];
}
