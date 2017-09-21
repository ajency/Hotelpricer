<?php

use Phinx\Migration\AbstractMigration;
use Cake\ORM\TableRegistry;

class AmazonUrlSeed extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-abstractmigration-class
     *
     * The following commands can be used in this method and Phinx will
     * automatically reverse them when rolling back:
     *
     *    createTable
     *    renameTable
     *    addColumn
     *    renameColumn
     *    addIndex
     *    addForeignKey
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function up()
    {

        $data = [
            [
                "product"=>[
                    "marketplace_id"=>1,
                    "seller_id"=>"AT95IG9ONZD7S",
                    "listing_id"=>"B06X3WR2P4",
                    "sku_code"=>null,
                    "min"=>22000,
                    "max"=>55000,
                    "rule_id"=>1,
                    "product_family"=>345,
                    "status"=>1,
                    "user_id"=>1
                ],        
                "urls"=>[
                    "http://www.amazon.in/dp/B06X3WR2P4",
                    "http://www.amazon.in/Dell-Inspiron-3162-11-6-inch-Celeron/dp/B01LZSUA6P",
                    "http://www.amazon.in/Lenovo-ideapad110-15-6-inch-i3-6006U-Integrated/dp/B01N9VDYA5",
                    "http://www.amazon.in/HP-15-BE001TU-15-6-inch-Integrated-Graphics/dp/B01KLIWFV2",
                    "http://www.amazon.in/HP-15-bg007AU-15-6-inch-Integrated-Sparkling/dp/B071RDMPZF",
                    "http://www.amazon.in/Lenovo-15-6-inch-A8-7410-Integrated-Graphics/dp/B01KO18NGW",
                    "http://www.amazon.in/Micromax-L1160-11-6-inch-Integrated-Graphics/dp/B01ERHNUY4",
                    "http://www.amazon.in/iBall-CompBook-Excelance-Laptop-Original/dp/B06XF57KYB",
                    "http://www.amazon.in/dp/B06WLLY4VL",
                    "http://www.amazon.in/HP-15-BE002TU-15-6-inch-Integrated-Graphics/dp/B01GRFC3E2",
                    "http://www.amazon.in/Acer-ES1-523-49C0-NX-GKYSI-002-Notebook-Midnight/dp/B06X3VRNZV",
                    "http://www.amazon.in/Asus-X540LA-XX596D-15-6-inch-i3-5005U-Graphics/dp/B01KLZQ1N8",
                    "http://www.amazon.in/HP-245-G5-Notebook-Warranty/dp/B01JOTIAN6",
                    "http://www.amazon.in/Dell-Inspiron-3162-11-6-inch-Celeron%C2%AE/dp/B01M0FPFXZ",
                    "http://www.amazon.in/Dell-Inspiron-5559-15-6-inch-Integrated/dp/B01N6OYSZR",
                    "http://www.amazon.in/Lenovo-G50-80-80E502Q3IH-15-6-inch-Graphics/dp/B018JXCMN2",
                    "http://www.amazon.in/Lenovo-110-15ISK-80UD013KIH-Integrated-Graphics/dp/B01MUDZBWQ",
                    "http://www.amazon.in/Lenovo-Ideapad-80TJ00BNIH-15-6-inch-Graphics/dp/B01K1TTZSM",
                    "http://www.amazon.in/Dell-Inspiron-3558-Notebook-Ubuntu/dp/B01GHGLL2G",
                    "http://www.amazon.in/Acer-SW3-016-10-1-inch-x5-Z8300-Integrated/dp/B01MQ0B8H0",
                    "http://www.amazon.in/iBall-Compbook-11-6-Inch-Touchscreen-Integrated/dp/B01M1VT0FZ"
                ]
            ],
            [
                "product"=>[
                    "marketplace_id"=>1,
                    "seller_id"=>"AT95IG9ONZD7S",
                    "listing_id"=>"B00VT61IKA",
                    "sku_code"=>null,
                    "min"=>26000,
                    "max"=>60000,
                    "rule_id"=>1,
                    "product_family"=>554,
                    "status"=>1,
                    "user_id"=>1
                ],        
                "urls"=>[
                    "http://www.amazon.in/Canon-EOS-700D-Digital-55-250mm/dp/B00VT61IKA",
                    "http://www.amazon.in/Nikon-D3300-Digital-18-55mm-3-5-5-6G/dp/B00JM4WAPS",
                    "http://www.amazon.in/Nikon-24-2MP-Digital-18-55mm-3-5-5-6g/dp/B00JM4VE0A",
                    "http://www.amazon.in/Canon-Digital-Camera-18-55mm-55-250mm/dp/B00JB0IZHU",
                    "http://www.amazon.in/Nikon-D5200-24-1MP-Digital-Camera/dp/B00JM4VAC2",
                    "http://www.amazon.in/Canon-EOS-24-2MP-Digital-Camera/dp/B00W3ABT7I",
                    "http://www.amazon.in/Nikon-D3200-Digital-Camera-18-55mm/dp/B00JXEL4YA",
                    "http://www.amazon.in/Canon-EOS-700D-DZ-Pulse-S505/dp/B01M062UBC",
                    "http://www.amazon.in/Sony-A6000L-Digital-16-50mm-ILCE-6000L/dp/B00KT69ZNI",
                    "http://www.amazon.in/Nikon-D5200-Digital-Zoom-NIKKOR-55-200mm/dp/B00I4SFXXO",
                    "http://www.amazon.in/Nikon-DX-Format-Digital-18-140mm-Class10/dp/B00RUBJUSK",
                    "http://www.amazon.in/Nikon-DX-format-Digital-18-55mm-CAMERA/dp/B00RUBJKU8",
                    "http://www.amazon.in/Canon-EOS-24-2MP-Digital-Camera/dp/B00W3AD4U8",
                    "http://www.amazon.in/Canon-Digital-Camera-Black-24-105mm/dp/B01KURGS9Y",
                    "http://www.amazon.in/Nikon-D5200-Black-Af-S-18-140Mm/dp/B00OG0LSBU",
                    "http://www.amazon.in/Nikon-D7000-16-2MP-Digital-18-105mm/dp/B00K0D5CVY",
                    "http://www.amazon.in/Nikon-D5300-Digital-18-55mm-55-200mm/dp/B00I4SFZE6",
                    "http://www.amazon.in/Nikon-D5300-24-1MP-Digital-18-140mm/dp/B00K0AUCQ2",
                    "http://www.amazon.in/Canon-EOS-800D-18-55-STM/dp/B06XYNSXY9",
                    "http://www.amazon.in/Nikon-D5200-24-1MP-Digital-18-140mm/dp/B00JM4V77A",
                    "http://www.amazon.in/Canon-EOS-77D-18-55-STM/dp/B06Y2RSYN7",
                    "http://www.amazon.in/Sony-A6300L-Digital-Camera-ILCE-6300L/dp/B01DETNBLS",
                    "http://www.amazon.in/Sony-A6000Y-Digital-55-210mm-ILCE-6000Y/dp/B00XOXFB1I"
                ]
            ],
            [
                "product"=>[
                    "marketplace_id"=>1,
                    "seller_id"=>"APD9WR2IDP8TC",
                    "listing_id"=>"B00I8QV4PS",
                    "sku_code"=>null,
                    "min"=>1200,
                    "max"=>5000,
                    "rule_id"=>1,
                    "product_family"=>987,
                    "status"=>1,
                    "user_id"=>1
                ],        
                "urls"=>[
                    "http://www.amazon.in/HUL-Pureit-Classic-14-Litre-Purifier/dp/B00I8QV4PS",
                    "http://www.amazon.in/Swach-Electric-Smart-15-Litre-Purifier/dp/B008LN5ZWG",
                    "http://www.amazon.in/Swach-Electric-Cristella-18-Litre-Purifier/dp/B008LN5ZNA",
                    "http://www.amazon.in/Kent-Gold-Optima-10-Litre-Purifier/dp/B009DA69W6",
                    "http://www.amazon.in/Kent-Ultra-UV-Water-Purifier/dp/B0073QKROI",
                    "http://www.amazon.in/Blue-Star-BWD3FMRGA-Dispenser-Refrigerator/dp/B00V679BEC",
                    "http://www.amazon.in/HUL-Pureit-Classic-stage-Purifier/dp/B01EVFH6RE",
                    "http://www.amazon.in/HUL-Pureit-Classic-RO-MF/dp/B017SLHZUG",
                    "http://www.amazon.in/dp/B01MQHKZE3"
                ]
            ]
        ];


        $productsTable = TableRegistry::get('Products');
        $productsToBeTrackedTable = TableRegistry::get('ProductsToBeTracked');

        foreach($data as $dt){
            $prodEntity = $productsTable->newEntity();
            $prod = $productsTable->patchEntity($prodEntity,$dt['product']);
            $sprod = $productsTable->save($prod);

            foreach($dt['urls'] as $url){
                $trackData = [
                    "product_id"=>$sprod->id,
                    "marketplace_id"=>$dt['product']['marketplace_id'],
                    "listing_id"=>basename($url),
                    "bt_cat_id"=>$dt['product']['product_family'],
                    "listing_url"=>$url
                ];
                $trckEntity = $productsToBeTrackedTable->newEntity();
                $trck = $productsToBeTrackedTable->patchEntity($trckEntity,$trackData);
                $productsToBeTrackedTable->save($trck);
            }
        }



    }
}
