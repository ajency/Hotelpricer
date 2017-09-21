<?php

use Phinx\Migration\AbstractMigration;
use Cake\ORM\TableRegistry;

class PricingRulesSeeder extends AbstractMigration
{
    
    public function up()
    {
        $rule1 = [
    [
        'action'=>1,
        'option'=>2,
        'operator'=>'+',
        'unit_type'=>'fixed',
        'unit'=>10
    ],
    [
        'action'=>2,
        'option'=>6,
        'operator'=>'-',
        'unit_type'=>'fixed',
        'unit'=>10
    ],
    [
        'action'=>3,
        'option'=>9,
        'operator'=>'+',
        'unit_type'=>'fixed',
        'unit'=>5
    ],
    [
        'action'=>4,
        'option'=>12,
        'operator'=>'+',
        'unit_type'=>'percent',
        'unit'=>5
    ],
    [
        'action'=>4,
        'option'=>12,
        'operator'=>'+',
        'unit_type'=>'percent',
        'unit'=>5
    ],
    [
        'action'=>5,
        'option'=>14
    ],
    [
        'action'=>6,
        'option'=>17,
        'operator'=>'+',
        'unit_type'=>'fixed',
        'unit'=>5
    ],
    [
        'action'=>7,
        'option'=>21,
        'operator'=>'+',
        'unit_type'=>'fixed',
        'unit'=>5
    ],
    [
        'action'=>8,
        'option'=>22
    ],
];



$rule2 = [
    [
        'action'=>1,
        'option'=>2,
        'operator'=>'+',
        'unit_type'=>'fixed',
        'unit'=>10
    ],
    [
        'action'=>2,
        'option'=>6,
        'operator'=>'-',
        'unit_type'=>'fixed',
        'unit'=>10
    ],
    [
        'action'=>3,
        'option'=>9,
        'operator'=>'+',
        'unit_type'=>'fixed',
        'unit'=>5
    ],
    [
        'action'=>4,
        'option'=>12,
        'operator'=>'+',
        'unit_type'=>'percent',
        'unit'=>5
    ],
    [
        'action'=>4,
        'option'=>12,
        'operator'=>'+',
        'unit_type'=>'percent',
        'unit'=>5
    ],
    [
        'action'=>5,
        'option'=>15
    ],
    [
        'action'=>6,
        'option'=>17,
        'operator'=>'+',
        'unit_type'=>'fixed',
        'unit'=>5
    ],
    [
        'action'=>7,
        'option'=>21,
        'operator'=>'+',
        'unit_type'=>'fixed',
        'unit'=>5
    ],
    [
        'action'=>8,
        'option'=>22
    ],
];



        $data = [
            [
                'channel_id'=>1,
                'title'=>"Amazon Default with Free Shipping",
                'rule'=>serialize($rule1),
                'rule_type'=>"default"
            ],
            [
                'channel_id'=>1,
                'title'=>"Amazon with Buy Box Reprice",
                'rule'=>serialize($rule2),
                'rule_type'=>"default"
            ]
        ];

        $table = TableRegistry::get('PricingRules');
        $entities = $table->newEntities($data);
        $table->saveMany($entities);

    }
}
