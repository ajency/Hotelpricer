<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Seller Entity
 *
 * @property int $id
 * @property string $seller_id
 * @property int $channel_id
 * @property string $seller_name
 * @property string $seller_url
 *
 * @property \App\Model\Entity\Seller[] $sellers
 * @property \App\Model\Entity\Channel $channel
 * @property \App\Model\Entity\ProductSellerData[] $product_seller_data
 */
class Seller extends Entity
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
