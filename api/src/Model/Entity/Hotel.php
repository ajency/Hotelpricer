<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Hotel Entity
 *
 * @property int $id
 * @property int $user_id
 * @property \Cake\I18n\Time $created
 * @property string $title
 * @property string $address
 * @property int $numbr_of_rooms
 * @property string $type
 * @property bool $active
 * @property \Cake\I18n\Time $last_tracked_on
 * @property int $crawl_status_id
 *
 * @property \App\Model\Entity\User $user
 * @property \App\Model\Entity\CrawlStatus $crawl_status
 * @property \App\Model\Entity\HotelsProviderData[] $hotels_provider_data
 * @property \App\Model\Entity\HotelsProviderRelation[] $hotels_provider_relations
 */
class Hotel extends Entity
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
