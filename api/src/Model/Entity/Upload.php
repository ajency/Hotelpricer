<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Upload Entity
 *
 * @property int $id
 * @property int $user_id
 * @property string $file_name
 * @property string $file_path
 * @property string $status
 * @property int $no_of_listing
 * @property int $no_of_rows
 * @property string $details
 * @property \Cake\I18n\Time $created
 *
 * @property \App\Model\Entity\User $user
 */
class Upload extends Entity
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
