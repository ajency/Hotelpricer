<?php
namespace App\Event;

use Cake\Event\EventListenerInterface;
use Cake\Log\Log;

class CrawlerListener implements EventListenerInterface {

    public function implementedEvents() {
        return array(
            'Controller.CrawlResponse.crawlDataResponse' => 'saveCrawlData',
        );
    }

    public function saveCrawlData($event, $entity, $options) {
      Log::warning($event->data, ['scope' => ['payload']]);
        //debug($event->data);
    }
}
