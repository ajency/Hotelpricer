<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Airport Entity
 *
 * @property int $id
 * @property string $name
 * @property string $city
 * @property string $country
 * @property string $iata
 * @property string $icao
 * @property int $latitude
 * @property int $longitude
 * @property int $altitude
 * @property int $timezone
 * @property int $dst
 * @property int $tz_timezone
 * @property int $type
 * @property string $source
 */
class Airport extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        '*' => true,
        'id' => false
    ];
}
