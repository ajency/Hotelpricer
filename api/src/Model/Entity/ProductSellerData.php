<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * ProductSellerData Entity
 *
 * @property int $id
 * @property int $product_id
 * @property string $seller_id
 * @property \Cake\I18n\Time $updated_on
 * @property float $price
 * @property float $rating
 * @property int $rating_count
 * @property string $delivery
 * @property bool $fullfilled_by_marketplace
 * @property bool $covered_under_loyalty
 *
 * @property \App\Model\Entity\Product $product
 * @property \App\Model\Entity\Seller $seller
 */
class ProductSellerData extends Entity
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
