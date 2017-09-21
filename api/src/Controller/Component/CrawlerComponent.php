<?php

namespace App\Controller\Component;
 use Cake\Controller\Component;


use Cake\Network\Request;
use Cake\Utility\Security;

use Aws\Lambda\LambdaClient;

error_reporting(0);

 class CrawlerComponent extends Component{
    public $_config = null;

    public function initialize(array $config){
        parent::initialize($config);
        $this->_config = [
            'env' => getenv("environment"),
            'aws_key' => getenv("aws_key"),
            'aws_secret' => getenv("aws_secret"),
            'aws_region' => getenv("aws_region"),
            'lambda_function' => getenv("lambda_function")
        ];
    }



    public function run($products,$wait = false, $group_id = null){
      $config = $this->_config;

      if ($config['env'] == 'local' || $config['env'] == 'dev'){
        $response = $this->runLocalCrawler($products,$wait,$group_id);
      }
      if($config['env'] == 'staging' || $config['env'] == 'production'){
        $response = $this->runLambdaCrawler($products,$wait,$group_id);
      }
      return $response;
    }


    public function runLocalCrawler($products,$wait,$group_id)
    {
      $output = '';

      foreach(array_values($products)[0] as $key => $value) {
          $out[] = "$key#$value";
      }

      $marketplace = array_keys($products)[0];
      $product_ids = implode(',',$out);
      $batch_id = $products['batch_id'];

      if($wait){
        $result = exec(ROOT."/crawl_start.sh ".$marketplace." ".$product_ids." ".$group_id." ".$batch_id." 2>&1", $output);
      }else{
        $result = exec(ROOT."/crawl_start.sh ".$marketplace." ".$product_ids." ".$group_id." ".$batch_id." > /dev/null 2>&1 &");
      }
      return $output;
    }


    public function runLambdaCrawler($products,$wait,$group_id)
    {
        $out = array();

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


      $config = $this->_config;
      $lambdaClient = LambdaClient::factory(array(
      'credentials' => array(
          'key'    => $config['aws_key'],
          'secret' => $config['aws_secret'],
          ),
      'region'  => $config['aws_region'],
      'version' => 'latest'
      ));

        if($wait){
          $output = $lambdaClient->invoke([
            'FunctionName' => $config['lambda_function'],
            'InvocationType' => 'RequestResponse',
            'Payload' => json_encode(array('products'=>$products,'group_id'=>$group_id, 'batch_id'=>$batch_id)),
            'LogType' => 'Tail'
            ]);
            return $output;
        }else{
          $output = $lambdaClient->invoke([
            'FunctionName' => $config['lambda_function'],
            'InvocationType' => 'Event',
            'Payload' => json_encode(array('products'=>$products,'group_id'=>$group_id, 'batch_id'=>$batch_id)),
            ]);
        }

        //$promise = $lambdaclient->invokeAsync([
        //           'FunctionName' => $functionName,
        //           'Payload' => json_encode($payload),
        //           ]);

        return $output;
    }


}
