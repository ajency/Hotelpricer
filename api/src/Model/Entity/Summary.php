<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Summary Entity
 *
 * @property int $id
 * @property int $group_id
 * @property int $schedular_id
 * @property int $user_id
 * @property int $marketplace_id
 * @property \Cake\I18n\Time $created
 * @property int $total_products
 * @property int $im_only_seller
 * @property int $i_have_buybox
 * @property int $im_lowest
 * @property int $im_not_lowest
 * @property int $im_in_top_10
 * @property int $im_selling
 * @property int $im_not_selling
 * @property int $average_rank
 * @property int $won_buy_box
 * @property int $won_lowest_price
 * @property int $lost_buy_box
 * @property int $lost_lowest_price
 * @property int $competition_changed_price
 * @property int $new_sellers_entered
 * @property int $sellers_stocked_out
 * @property int $sellers_stocked_again
 * @property int $listing_with_changes
 *
 * @property \App\Model\Entity\Group $group
 * @property \App\Model\Entity\Schedular $schedular
 * @property \App\Model\Entity\User $user
 * @property \App\Model\Entity\Marketplace $marketplace
 */
class Summary extends Entity
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
