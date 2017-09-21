<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * ProductsToBeTracked Entity
 *
 * @property int $id
 * @property int $product_id
 * @property int $marketplace_id
 * @property string $listing_id
 * @property \Cake\I18n\Time $last_updated
 * @property \Cake\I18n\Time $created_at
 * @property int $bt_cat_id
 * @property string $listing_url
 *
 * @property \App\Model\Entity\Product $product
 * @property \App\Model\Entity\Marketplace $marketplace
 * @property \App\Model\Entity\Listing $listing
 * @property \App\Model\Entity\BtCat $bt_cat
 */
class ProductsToBeTracked extends Entity
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
