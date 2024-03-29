<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * DummyData Entity
 *
 * @property int $id
 * @property int $marketplace_id
 * @property int $category_id
 * @property int $listing_id
 * @property \Cake\I18n\Time $created
 * @property \Cake\I18n\Time $updated
 *
 * @property \App\Model\Entity\Marketplace $marketplace
 * @property \App\Model\Entity\Category $category
 * @property \App\Model\Entity\Listing $listing
 */
class DummyData extends Entity
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
