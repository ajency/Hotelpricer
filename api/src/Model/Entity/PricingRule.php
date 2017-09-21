<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * PricingRule Entity
 *
 * @property int $id
 * @property int $channel_id
 * @property string $title
 * @property \Cake\I18n\Time $created
 * @property \Cake\I18n\Time $modified
 * @property string $description
 * @property string $type
 * @property string $compete_with
 * @property string $scenario
 * @property string $min_max
 * @property string $include_sellers
 * @property string $exclude_sellers
 * @property string $additional_settings
 *
 * @property \App\Model\Entity\Channel $channel
 */
class PricingRule extends Entity
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
