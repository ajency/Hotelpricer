<?php
namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * HotelsProviderDataFixture
 *
 */
class HotelsProviderDataFixture extends TestFixture
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
        'room_type' => ['type' => 'string', 'length' => 32, 'null' => false, 'default' => null, 'collate' => 'latin1_swedish_ci', 'comment' => '', 'precision' => null, 'fixed' => null],
        'search_engine_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => true, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'created' => ['type' => 'timestamp', 'length' => null, 'null' => false, 'default' => 'CURRENT_TIMESTAMP', 'comment' => '', 'precision' => null],
        'rate' => ['type' => 'decimal', 'length' => 10, 'precision' => 2, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => ''],
        'booking_url' => ['type' => 'text', 'length' => null, 'null' => true, 'default' => null, 'collate' => 'latin1_swedish_ci', 'comment' => '', 'precision' => null],
        'batch_id' => ['type' => 'string', 'length' => 100, 'null' => false, 'default' => null, 'collate' => 'latin1_swedish_ci', 'comment' => '', 'precision' => null, 'fixed' => null],
        '_indexes' => [
            'hotel_id' => ['type' => 'index', 'columns' => ['hotel_id', 'booking_provider_id', 'room_type'], 'length' => []],
            'provider_id' => ['type' => 'index', 'columns' => ['booking_provider_id'], 'length' => []],
            'room_type_id' => ['type' => 'index', 'columns' => ['room_type'], 'length' => []],
            'search_engine_id' => ['type' => 'index', 'columns' => ['search_engine_id'], 'length' => []],
            'room_type_id_2' => ['type' => 'index', 'columns' => ['room_type'], 'length' => []],
        ],
        '_constraints' => [
            'primary' => ['type' => 'primary', 'columns' => ['id'], 'length' => []],
            'hotels_provider_data_ibfk_1' => ['type' => 'foreign', 'columns' => ['hotel_id'], 'references' => ['hotels', 'id'], 'update' => 'noAction', 'delete' => 'noAction', 'length' => []],
            'hotels_provider_data_ibfk_2' => ['type' => 'foreign', 'columns' => ['booking_provider_id'], 'references' => ['booking_providers', 'id'], 'update' => 'noAction', 'delete' => 'noAction', 'length' => []],
            'hotels_provider_data_ibfk_4' => ['type' => 'foreign', 'columns' => ['search_engine_id'], 'references' => ['booking_providers', 'id'], 'update' => 'noAction', 'delete' => 'noAction', 'length' => []],
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
            'room_type' => 'Lorem ipsum dolor sit amet',
            'search_engine_id' => 1,
            'created' => 1507295519,
            'rate' => 1.5,
            'booking_url' => 'Lorem ipsum dolor sit amet, aliquet feugiat. Convallis morbi fringilla gravida, phasellus feugiat dapibus velit nunc, pulvinar eget sollicitudin venenatis cum nullam, vivamus ut a sed, mollitia lectus. Nulla vestibulum massa neque ut et, id hendrerit sit, feugiat in taciti enim proin nibh, tempor dignissim, rhoncus duis vestibulum nunc mattis convallis.',
            'batch_id' => 'Lorem ipsum dolor sit amet'
        ],
    ];
}
