<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * BookingProvider Entity
 *
 * @property int $id
 * @property string $title
 * @property string $url
 * @property bool $is_search_engine
 *
 * @property \App\Model\Entity\HotelsProviderData[] $hotels_provider_data
 * @property \App\Model\Entity\HotelsProviderRelation[] $hotels_provider_relations
 */
class BookingProvider extends Entity
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
