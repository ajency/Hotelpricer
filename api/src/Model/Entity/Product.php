<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Product Entity
 *
 * @property int $id
 * @property int $marketplace_id
 * @property string $listing_id
 * @property string $sku_code
 * @property int $min
 * @property int $max
 * @property int $rule_id
 * @property int $product_family
 * @property int $status
 * @property int $user_id
 * @property \Cake\I18n\Time $created_at
 * @property \Cake\I18n\Time $last_updated
 *
 * @property \App\Model\Entity\Marketplace $marketplace
 * @property \App\Model\Entity\Listing $listing
 * @property \App\Model\Entity\Rule $rule
 * @property \App\Model\Entity\User $user
 * @property \App\Model\Entity\AttributesValue[] $attributes_value
 * @property \App\Model\Entity\ProductSellerData[] $product_seller_data
 * @property \App\Model\Entity\ProductsToBeTracked[] $products_to_be_tracked
 */
class Product extends Entity
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
