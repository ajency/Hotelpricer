<?php
namespace App\Shell;

use App\Controller\Api\SellersController;
use App\Model\Table\ProductsTable;
use App\Model\Table\QueueTable;
use App\Model\Table\UsersTable;
use Cake\Console\Shell;
use Cake\ORM\TableRegistry;

class TestqShell extends Shell
{

    public function initialize()
    {
        parent::initialize();
        $this->loadModel('ProductsToBeTracked');
        $this->loadModel('Scheduler');
    }

    public function main()
    {
        $this->out('Hello world.');
        //Send a message to queue
        $queueTable = TableRegistry::get('Queue');
        $job = $queueTable->newEntity();

        $products = $this->ProductsToBeTracked->getTrackableProducs(['marketplace_id' => 1]);

        $job->message = serialize($products);
        $job->ref_id = 2;

        if ($queueTable->save($job)) {
            // The $article entity contains the id now
            echo $job->id;
        }
    }

    public function sendemail() {
        $user = new UsersTable();
        $template_vars = [
            [ 'name' => 'NAME' , 'content' => 'Antonio Furtado' ],
            [ 'name' => 'EMAIL' , 'content' => 'antonio@ajency.in' ],
            [ 'name' => 'PHONE' , 'content' => '9900190516' ],
        ];

        $recepients = [
            [ 'email' => 'antonio+tessst@ajency.in', 'name' => 'Antonio', 'type' => 'to' ]
            ];
        print_r($user->sendEmail('tracker-welcome-email', $template_vars, 'Welcome to Browntape Tracker', $recepients, ['tracker','signup']));

      /*  $products = new ProductsTable();
        $check_sheet = $products->excelToArray($file,true,$marketplace_id,true);
        if($check_sheet['success']) {
            $uploads = TableRegistry::get('Uploads');
            $upload_id = $uploads->saveUploadData($file, $file_name, $user_id, $check_sheet['row_count'], $check_sheet['listing_ids_count'] , []);
            print "Started after ".(time() - $start)."seconds"."\n";
            $products->importProducts($file, $user_id, $upload_id, 'import', $marketplace_id, $seller_id);
        } else {
            print_r($check_sheet);
        }*/
    }



    public function importcomptest()
    {
        $file = '/home/ajantoniof/Downloads/compet.xlsx';
        $user_id = rand(1, 100);
        $file_name = 'asdasdasd.xls';
        $seller_id = uniqid();


        $products = new ProductsTable();
        $check_sheet = $products->excelToArray($file, true, 'custom', true);
        if ($check_sheet['success']) {
            $message = [];
            $uploads = TableRegistry::get('Uploads');
            $upload_id = $uploads->saveUploadData($file, $file_name, $user_id, $check_sheet['row_count'], $check_sheet['listing_ids_count'], []);

            $message['user_id'] = $user_id;
            $message['marketplace'] = 'custom';
            $message['seller_id'] = $seller_id;
            $message['import_type'] = 'import';
            $message['file_path'] = $file;
            $message['file_name'] = $file_name;
            $message['upload_id'] = $upload_id;

            $queueTable = TableRegistry::get('Queue');
            $job = $queueTable->newEntity();
            $job->message = serialize($message);
            $job->ref_id = $user_id;
            $job->group_id = 0;
            $job->type = QueueTable::TYPE_IMPORT;
            $queueTable->save($job);
        }
    }

    public function data($import = null)
    {
        $file1 = '/var/www/repricer-alpha/api/tmp/uploads/product-sheets/amazon1000_07-26-2017_0636pm.xlsx';
        $file2 = '/var/www/repricer-alpha/api/tmp/uploads/product-sheets/competitors.xls';
        $file7 = '/var/www/repricer-alpha/api/tmp/uploads/product-sheets/custom1.xls';
        $file3 = '/var/www/repricer-alpha/api/tmp/uploads/product-sheets/Roots_active_listings (1)_08-01-2017_0810pm.csv';
        $file4 = '/var/www/repricer-alpha/api/tmp/uploads/product-sheets/kn67ssuzhwbiaxsj-kids_t_shirt-catalog-REQEVRZ4T4AV7-feed_08-03-2017_1252pm.xls';
        $file5 = '/var/www/repricer-alpha/api/tmp/uploads/product-sheets/amazon_07-26-2017_0339pm.xlsx';
        $file50 = '/var/www/repricer-alpha/api/tmp/uploads/product-sheets/a1.xlsx';
        $file51 = '/var/www/repricer-alpha/api/tmp/uploads/product-sheets/f1.xls';

        $user_id = rand(1, 100);
        $file_name = 'asdasdasd.xls';
        $seller_id = uniqid();

        if ($import == null) {
            $import = [
                [0 => '/var/www/repricer-alpha/api/tmp/uploads/product-sheets/f1.xls', 1 => 2],
                [0 => '/var/www/repricer-alpha/api/tmp/uploads/product-sheets/a1.xlsx', 1 => 1],
                [0 => '/var/www/repricer-alpha/api/tmp/uploads/product-sheets/f1.xls', 1 => 2],
                [0 => '/var/www/repricer-alpha/api/tmp/uploads/product-sheets/a1.xlsx', 1 => 1],
                [0 => '/var/www/repricer-alpha/api/tmp/uploads/product-sheets/f1.xls', 1 => 2],
            ];
        } else {

            $i = explode(',', $import);
            foreach ($i as $k) {
                $iz[] = explode('|', $k);
            }
            $import = $iz;
        }

        print_r($import);

        for ($i = 0; $i < count($import); $i++) {
            $products = new ProductsTable();
            $check_sheet = $products->excelToArray($import[$i][0], true, $import[$i][1], true);

            if ($check_sheet['success']) {
                $message = [];
                $uploads = TableRegistry::get('Uploads');
                $upload_id = $uploads->saveUploadData($import[$i][0], $file_name, $user_id, $check_sheet['row_count'], $check_sheet['listing_ids_count'], []);

                $message['user_id'] = $user_id;
                $message['marketplace'] = $import[$i][1];
                $message['seller_id'] = $seller_id;
                $message['import_type'] = 'import';
                $message['file_path'] = $import[$i][0];
                $message['file_name'] = $file_name;
                $message['upload_id'] = $upload_id;

                $queueTable = TableRegistry::get('Queue');
                $job = $queueTable->newEntity();
                $job->message = serialize($message);
                $job->ref_id = $user_id;
                $job->group_id = 0;
                $job->type = QueueTable::TYPE_IMPORT;
                $queueTable->save($job);
            }
        }
    }

    public function testschid() {
        $query = $this->Scheduler->find('all', [
            'conditions' => ['Scheduler.user_id' => 1, 'Scheduler.marketplace_id' => 1]
        ]);
        $ref_id = $query->first();
        print_r($ref_id->id);
    }

    public function testemail() {
        $recipient_email_user_ids[20][12][] = 1;
        $recipient_email_user_ids[20][12][] = -1;
        $recipient_email_user_ids[20][13][] = 1;
        $recipient_email_user_ids[20][13][] = -1;
        $usersTable = TableRegistry::get('Users');
        print_r($usersTable->sendCrawlCompleteEmail($recipient_email_user_ids));
    }

    public function batchId() {
        $users = [123,124,123,22,33,99999,123];
        $global_batch_id = md5(uniqid(rand(), true));
        $this->out($global_batch_id);
        foreach($users as $user_id) {
            $id = substr(base_convert($global_batch_id, 16, 10) , -(14 - strlen($user_id))).$user_id;
            $this->out($id);
        }
    }

    public function testtca() {
        $s = TableRegistry::get('Summary');
        print_r($s->getTrendChartData2(1,'30d'));
    }

    public function dates() {
        $this->out(date('g:i a l, d M Y '));
        $this->out(date('d M Y, g:i a'));
        $this->out(date('d M Y g:i a'));
        $this->out(date('d M Y'));
    }

<<<<<<< HEAD
    public function pdser()
    {
        $data = '{
    "status": "success",
    "product": {
        "image": "https://images-eu.ssl-images-amazon.com/images/I/71w4rp3ByvL._UX395_.jpg",
        "seller_id": "A14GMFI8GBAH8K",
        "is_stock": true,
        "listing_id": "B0152W9E9S",
        "product_id": 99378,
        "title": "ALESTINO Leather Formal Shoes For Men",
        "mrp": 1799,
        "batch_id": "26644688608285",
        "group_id": 15046772404763,
        "price": 499,
        "channel": "amazon"
    },
    "sellers": [
        {
            "rating": 5,
            "buy_box": false,
            "price": 399,
            "seller_url": "http://www.amazon.in/gp/aag/main/ref=olp_merch_name_1?ie=UTF8&asin=B0152W9E9S&isAmazonFulfilled=0&seller=A20LKJQW5UXDTZ",
            "delivery": "79.00",
            "fullfilled_by_marketplace": false,
            "condition": "New",
            "seller_id": "A20LKJQW5UXDTZ",
            "covered_under_loyalty": false,
            "seller_name": "ALVISE",
            "rating_count": 9
        },
        {
            "rating": 5,
            "buy_box": false,
            "price": 399,
            "seller_url": "http://www.amazon.in/gp/aag/main/ref=olp_merch_name_2?ie=UTF8&asin=B0152W9E9S&isAmazonFulfilled=0&seller=A20LKJQW5UXDTZ",
            "delivery": "79.00",
            "fullfilled_by_marketplace": false,
            "condition": "New",
            "seller_id": "A20LKJQW5UXDTZ",
            "covered_under_loyalty": false,
            "seller_name": "ALVISE",
            "rating_count": 9
        },
        {
            "rating": 5,
            "buy_box": false,
            "price": 399,
            "seller_url": "http://www.amazon.in/gp/aag/main/ref=olp_merch_name_3?ie=UTF8&asin=B0152W9E9S&isAmazonFulfilled=0&seller=A20LKJQW5UXDTZ",
            "delivery": "79.00",
            "fullfilled_by_marketplace": false,
            "condition": "New",
            "seller_id": "A20LKJQW5UXDTZ",
            "covered_under_loyalty": false,
            "seller_name": "ALVISE",
            "rating_count": 9
        },
        {
            "rating": 5,
            "buy_box": false,
            "price": 399,
            "seller_url": "http://www.amazon.in/gp/aag/main/ref=olp_merch_name_4?ie=UTF8&asin=B0152W9E9S&isAmazonFulfilled=0&seller=A20LKJQW5UXDTZ",
            "delivery": "79.00",
            "fullfilled_by_marketplace": false,
            "condition": "New",
            "seller_id": "A20LKJQW5UXDTZ",
            "covered_under_loyalty": false,
            "seller_name": "ALVISE",
            "rating_count": 9
        },
        {
            "rating": 5,
            "buy_box": false,
            "price": 399,
            "seller_url": "http://www.amazon.in/gp/aag/main/ref=olp_merch_name_5?ie=UTF8&asin=B0152W9E9S&isAmazonFulfilled=0&seller=A20LKJQW5UXDTZ",
            "delivery": "79.00",
            "fullfilled_by_marketplace": false,
            "condition": "New",
            "seller_id": "A20LKJQW5UXDTZ",
            "covered_under_loyalty": false,
            "seller_name": "ALVISE",
            "rating_count": 9
        },
        {
            "rating": 4.5,
            "buy_box": true,
            "price": 499,
            "seller_url": "http://www.amazon.in/gp/aag/main/ref=olp_merch_name_6?ie=UTF8&asin=B0152W9E9S&isAmazonFulfilled=1&seller=A14GMFI8GBAH8K",
            "delivery": "Free",
            "fullfilled_by_marketplace": true,
            "condition": "New",
            "seller_id": "A14GMFI8GBAH8K",
            "covered_under_loyalty": true,
            "seller_name": "ALESTINO",
            "rating_count": 1512
        },
        {
            "rating": 4.5,
            "buy_box": true,
            "price": 499,
            "seller_url": "http://www.amazon.in/gp/aag/main/ref=olp_merch_name_7?ie=UTF8&asin=B0152W9E9S&isAmazonFulfilled=1&seller=A14GMFI8GBAH8K",
            "delivery": "Free",
            "fullfilled_by_marketplace": true,
            "condition": "New",
            "seller_id": "A14GMFI8GBAH8K",
            "covered_under_loyalty": true,
            "seller_name": "ALESTINO",
            "rating_count": 1512
        },
        {
            "rating": 4.5,
            "buy_box": true,
            "price": 499,
            "seller_url": "http://www.amazon.in/gp/aag/main/ref=olp_merch_name_8?ie=UTF8&asin=B0152W9E9S&isAmazonFulfilled=1&seller=A14GMFI8GBAH8K",
            "delivery": "Free",
            "fullfilled_by_marketplace": true,
            "condition": "New",
            "seller_id": "A14GMFI8GBAH8K",
            "covered_under_loyalty": true,
            "seller_name": "ALESTINO",
            "rating_count": 1512
        },
        {
            "rating": 4.5,
            "buy_box": true,
            "price": 499,
            "seller_url": "http://www.amazon.in/gp/aag/main/ref=olp_merch_name_9?ie=UTF8&asin=B0152W9E9S&isAmazonFulfilled=1&seller=A14GMFI8GBAH8K",
            "delivery": "Free",
            "fullfilled_by_marketplace": true,
            "condition": "New",
            "seller_id": "A14GMFI8GBAH8K",
            "covered_under_loyalty": true,
            "seller_name": "ALESTINO",
            "rating_count": 1512
        },
        {
            "rating": 2.5,
            "buy_box": false,
            "price": 478,
            "seller_url": "http://www.amazon.in/gp/aag/main/ref=olp_merch_name_10?ie=UTF8&asin=B0152W9E9S&isAmazonFulfilled=0&seller=A2CLUE7FRI6L17",
            "delivery": "75.00",
            "fullfilled_by_marketplace": false,
            "condition": "New",
            "seller_id": "A2CLUE7FRI6L17",
            "covered_under_loyalty": false,
            "seller_name": "TurinBox Enterprises",
            "rating_count": 8
        }
    ]
}';
        $data = serialize( \GuzzleHttp\json_decode($data,true));
        print $data;
        /*
                $data = 'a:2:{s:6:"amazon";a:42:{i:65828;s:10:"B01DU4HX6Q";i:65829;s:10:"B01DU4HZ6O";i:65830;s:10:"B01DU4I1DK";i:65831;s:10:"B01DU4I36A";i:65832;s:10:"B01DU4I57M";i:65833;s:10:"B01DU4I73Y";i:65845;s:10:"B01DU77MGO";i:65854;s:10:"B01DU782XG";i:65856;s:10:"B01DU78ABK";i:65857;s:10:"B01DU78BM8";i:65859;s:10:"B01DU78ESE";i:65860;s:10:"B01DU78G4Q";i:65861;s:10:"B01DU78H90";i:65863;s:10:"B01DU79CQM";i:65864;s:10:"B01DU79DS4";i:65865;s:10:"B01DU79EYC";i:65866;s:10:"B01DU79GHM";i:65867;s:10:"B01DU79I1Q";i:65868;s:10:"B01DU79J60";i:65870;s:10:"B01DU79MV2";i:65872;s:10:"B01DU79PQY";i:65873;s:10:"B01DU79QS6";i:65902;s:10:"B01KXN18E0";i:65903;s:10:"B01KXN1AX4";i:65906;s:10:"B01KXN1CAK";i:65917;s:10:"B01KXN1MOQ";i:65918;s:10:"B01KXN1P4I";i:65926;s:10:"B01KXN22K4";i:65928;s:10:"B01KXN2448";i:65930;s:10:"B01KXN26HI";i:65933;s:10:"B01KXN29NY";i:65939;s:10:"B01KXN2EX4";i:65940;s:10:"B01KXN2I0S";i:65942;s:10:"B01KXN2K38";i:65945;s:10:"B01KXN2LRS";i:65947;s:10:"B01KXN2NRG";i:65950;s:10:"B01KXN2SP8";i:65953;s:10:"B01KXN2W7W";i:65955;s:10:"B01KXN2YY8";i:66030;s:10:"B01LWTXCL4";i:66040;s:10:"B01LXT4I7H";i:66060;s:10:"B01M122XA7";}s:8:"batch_id";s:14:"44804080060230";} |
        | 2017-09-05 11:33:10 | a:2:{s:6:"amazon";a:50:{i:65855;s:10:"B01DU786WS";i:65871;s:10:"B01DU79OOM";i:65935;s:10:"B01KXN2BHI";i:65951;s:10:"B01KXN2UEM";i:66042;s:10:"B01LY4TQEI";i:65756;s:10:"B018HTND6S";i:65759;s:10:"B018HTNKTI";i:65770;s:10:"B018HTODEY";i:65786;s:10:"B018HTO344";i:65791;s:10:"B018HTOK0Q";i:65795;s:10:"B018HTQD9M";i:65853;s:10:"B01DU7816E";i:65752;s:10:"B018HTN8J0";i:65753;s:10:"B018HTN9Y4";i:65754;s:10:"B018HTNB1K";i:65755;s:10:"B018HTNC3W";i:65757;s:10:"B018HTNE8U";i:65760;s:10:"B018HTNPCA";i:65761;s:10:"B018HTNSK4";i:65763;s:10:"B018HTNU7U";i:65764;s:10:"B018HTNVBU";i:65765;s:10:"B018HTO7DG";i:65766;s:10:"B018HTO8P8";i:65767;s:10:"B018HTO9YS";i:65768;s:10:"B018HTOAV0";i:65769;s:10:"B018HTOCA4";i:65771;s:10:"B018HTOPPQ";i:65783;s:10:"B018HTNHQ4";i:65784;s:10:"B018HTNYMG";i:65785;s:10:"B018HTO21I";i:65787;s:10:"B018HTO470";i:65788;s:10:"B018HTOGJG";i:65789;s:10:"B018HTOHOK";i:65790;s:10:"B018HTOISA";i:65792;s:10:"B018HTOL2S";i:65793;s:10:"B018HTOMA4";i:65794;s:10:"B018HTQB3A";i:65797;s:10:"B018HTRT86";i:65798;s:10:"B018HTRUGM";i:65799;s:10:"B018HTRVN4";i:65800;s:10:"B018HTRWS8";i:65801;s:10:"B018HTRXWS";i:65802;s:10:"B018HTRZ9Y";i:65821;s:10:"B01DU4HJ1U";i:65822;s:10:"B01DU4HL6S";i:65823;s:10:"B01DU4HN3E";i:65824;s:10:"B01DU4HP28";i:65825;s:10:"B01DU4HQV8";i:65826;s:10:"B01DU4HSPC";i:65827;s:10:"B01DU4HT4W";}s:8:"batch_id";s:14:"44804080060230";}';*/

/*        $products = unserialize($data);

        $batch_id = $products['batch_id'];
        $allowed_keys = ['amazon', 'flipkart', 'snapdeal', 'paytm'];

        foreach($products as $key => $val) {
            if(!in_array($key,$allowed_keys)) {
                unset($products[$key]);
            }
        }

        foreach(array_values($products)[0] as $key => $value) {
            $out[] = "$key#$value";
        }
        $products[array_keys($products)[0]] = implode(',',$out);

        print_r($products);*/
=======
    public function test666() {
        $req = "https://repricer2.ajency.in/api/api/sellers/product/666/seller-price-trend?sids%5B%5D=AT95IG9ONZD7S&sids%5B%5D=AT95IG9ONZD7S&sids%5B%5D=AT95IG9ONZD7S&sids%5B%5D=AT95IG9ONZD7S&sids%5B%5D=AT95IG9ONZD7S&sids%5B%5D=d591418b408940a0&sids%5B%5D=d591418b408940a0&sids%5B%5D=d591418b408940a0&sids%5B%5D=d591418b408940a0&sids%5B%5D=d591418b408940a0&pids%5B%5D=23270&pids%5B%5D=23271&pids%5B%5D=23272&pids%5B%5D=23273&pids%5B%5D=23274&pids%5B%5D=23275&pids%5B%5D=23276&pids%5B%5D=23277&pids%5B%5D=23278&pids%5B%5D=23279&string_ids=true";
#        $req = 'https://repricer2.ajency.in/api/api/sellers/product/23270/seller-price-trend?sids%5B%5D=386&sids%5B%5D=104&sids%5B%5D=1&sids%5B%5D=103&sids%5B%5D=17&sids%5B%5D=122&sids%5B%5D=106&sids%5B%5D=108';
        $parts = parse_url($req);
        parse_str($parts['query'], $query);
        $cont = new SellersController();
        print_r($cont->getSellerPriceTrend(23270,$query));
>>>>>>> develop
    }

    function get24HourMetric() {
        $p = new ProductsTable();
        $p->get24HourMetric();
    }
}