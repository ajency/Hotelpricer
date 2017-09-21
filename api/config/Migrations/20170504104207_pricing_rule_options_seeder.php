<?php

use Phinx\Migration\AbstractMigration;
use Cake\ORM\TableRegistry;

class PricingRuleOptionsSeeder extends AbstractMigration
{
    public function up()
    {
        $data = [
            [
                'action_id'=>1,
                'title'=>"Selling Price",
                'slug'=>"selling_price"
            ],
            [
                'action_id'=>1,
                'title'=>"Cost Price",
                'slug'=>"cost_price"
            ],
            [
                'action_id'=>1,
                'title'=>"Max Price",
                'slug'=>"max_price"
            ],
            [
                'action_id'=>1,
                'title'=>"MRP",
                'slug'=>"mrp"
            ],
            [
                'action_id'=>1,
                'title'=>"Ignore (Don't compete)",
                'slug'=>"dont_compete"
            ],


            [
                'action_id'=>2,
                'title'=>"Amazon Price",
                'slug'=>"amazon_price"
            ],
            [
                'action_id'=>2,
                'title'=>"Selling Price",
                'slug'=>"selling_price"
            ],
            [
                'action_id'=>2,
                'title'=>"Ignore (Don't compete)",
                'slug'=>"dont_compete"
            ],

            [
                'action_id'=>3,
                'title'=>"Seller Price",
                'slug'=>"seller_price"
            ],
            [
                'action_id'=>3,
                'title'=>"Selling Price",
                'slug'=>"selling_price"
            ],
            [
                'action_id'=>3,
                'title'=>"Ignore (Don't compete)",
                'slug'=>"dont_compete"
            ],



            [
                'action_id'=>4,
                'title'=>"FBA Seller Price",
                'slug'=>"fba_seller_price"
            ],
            [
                'action_id'=>4,
                'title'=>"Ignore (Don't compete)",
                'slug'=>"dont_compete"
            ],

            [
                'action_id'=>5,
                'title'=>"Don't reprice further",
                'slug'=>"dont_reprice_further"
            ],
            [
                'action_id'=>5,
                'title'=>"Continue to reprice as normal",
                'slug'=>"continue_to_reprice"
            ],


            [
                'action_id'=>6,
                'title'=>"Min Price",
                'slug'=>"min_price"
            ],
            [
                'action_id'=>6,
                'title'=>"Cost Price",
                'slug'=>"cost_price"
            ],
            [
                'action_id'=>6,
                'title'=>"Max Price",
                'slug'=>"max_price"
            ],


            [
                'action_id'=>7,
                'title'=>"Min Price",
                'slug'=>"min_price"
            ],
            [
                'action_id'=>7,
                'title'=>"Cost Price",
                'slug'=>"cost_price"
            ],
            [
                'action_id'=>7,
                'title'=>"Max Price",
                'slug'=>"max_price"
            ],

            [
                'action_id'=>8,
                'title'=>"Free",
                'slug'=>"free"
            ],
        ];

        $table = TableRegistry::get('PricingRuleOptions');
        $entities = $table->newEntities($data);
        $table->saveMany($entities);

    }
}
