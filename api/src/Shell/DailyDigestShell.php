<?php
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link      http://cakephp.org CakePHP(tm) Project
 * @since     3.0.0
 * @license   http://www.opensource.org/licenses/mit-license.php MIT License
 */
namespace App\Shell;

use Cake\I18n\Date;
use Cake\Console\ConsoleOptionParser;
use Cake\Console\Shell;
use Cake\Datasource\ConnectionManager;
use Cake\I18n\Time;
use Cake\Log\Log;
use Cake\ORM\TableRegistry;
use Psy\Shell as PsyShell;

/**
 * Simple console wrapper around Psy\Shell.
 */
class DailyDigestShell extends Shell
{

    /**
     * Start the shell and interactive console.
     *
     * @return int|null
     */
    public function send()
    {
        $connection = ConnectionManager::get('default');
        $usersQuery = 'select distinct(u.email), u.name, u.id from users u inner join products p on u.id = p.user_id and p.status = 1 left join user_preferences up on up.user_id = u.id and up.meta_key = "unsub_daily_digest" and up.meta_value = 1 where up.user_id IS NULL';
        $users = $connection->execute($usersQuery)->fetchAll('assoc');
        foreach($users as $user) {
            $productsTable = TableRegistry::get('Products');
            $data = $productsTable->getTopMetrics($user['id'],[]);
            $template_name = 'daily-digest';
            $template_vars =
                [
                    [ 'name' => 'DATE' , 'content' => date('g:i A l, d M Y') ],
                    [ 'name' => 'NAME' , 'content' => $user['name'] ],
                    [ 'name' => 'TOTALPRODUCTS' , 'content' => $data['product_count']],
                    [ 'name' => 'SELLING' , 'content' => $data['im_selling' ]],
                    [ 'name' => 'BUYBOX' , 'content' => $data['i_have_buybox' ]],
                    [ 'name' => 'LOWEST' , 'content' => $data['im_lowest' ]],
                    [ 'name' => 'RANK' , 'content' => $data['my_avg_rank' ]],
                    [ 'name' => 'NOTLOWEST' , 'content' => $data['im_not_lowest' ]],
                    [ 'name' => 'ONLYSELLER' , 'content' => $data['im_only_seller' ]],
                    [ 'name' => 'NOTSELLING' , 'content' => $data['im_not_selling' ]],
                    [ 'name' => 'TOP' , 'content' => $data['im_in_top_ten' ]],
                ];

            $this->out("Sending email to ".$user['email']." | ".json_encode($template_vars));
            $subject = 'Competition Tracker: Daily Digest - '.date('d M Y ');
            $tags = ['tracker','daily-digest'];
            $recepients = [
                [ 'email' => $user['email'], 'name' => $user['name'] , 'type' => 'to' ]
            ];
            $usersTable = TableRegistry::get('Users');
            $usersTable->sendEmail($template_name, $template_vars, $subject, $recepients, $tags);
        }
    }
}
