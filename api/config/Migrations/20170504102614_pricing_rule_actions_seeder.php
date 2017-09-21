<?php

use Phinx\Migration\AbstractMigration;
use Cake\ORM\TableRegistry;

class PricingRuleActionsSeeder extends AbstractMigration
{
    public function up() {

        $data = [
            [
            'channel_id'=>1,
            'title'=>"I'm the Only Seller",
            'slug'=>"im_the_only_seller",
            'allow_price_input'=>true,
            'operators'=>json_encode(['+','-'])
            ],
            [
            'channel_id'=>1,
            'title'=>"Amazon is lowest",
            'slug'=>"amazon_is_lowest",
            'allow_price_input'=>true,
            'operators'=>json_encode(['+','-'])
            ],
            [
            'channel_id'=>1,
            'title'=>"Another Seller is lowest",
            'slug'=>"another_seller_is_lowest",
            'allow_price_input'=>true,
            'operators'=>json_encode(['+','-'])
            ],
            [
            'channel_id'=>1,
            'title'=>"An FBA Listing is lowest",
            'slug'=>"fba_listing_is_lowest",
            'allow_price_input'=>true,
            'operators'=>json_encode(['+','-'])
            ],
            [
            'channel_id'=>1,
            'title'=>"If winning Buy Box",
            'slug'=>"if_winning_buy_box",
            'allow_price_input'=>false
            ],
            [
            'channel_id'=>1,
            'title'=>"Min Price Limit",
            'slug'=>"min_price_limit",
            'allow_price_input'=>true,
            'operators'=>json_encode(['+','-'])
            ],
            [
            'channel_id'=>1,
            'title'=>"Max Price Limit",
            'slug'=>"max_price_limit",
            'allow_price_input'=>true,
            'operators'=>json_encode(['+','-'])
            ],
            [
            'channel_id'=>1,
            'title'=>"Shipping",
            'slug'=>"shipping",
            'allow_price_input'=>false
            ],
        ];

        $table = TableRegistry::get('PricingRuleActions');
        $entities = $table->newEntities($data);
        $table->saveMany($entities);
    }

}
