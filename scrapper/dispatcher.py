import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from scrapy.utils.log import configure_logging

from hotelpricer.settings import PROJECT_ROOT

from subprocess import Popen

def dispatch(event, context):
    configure_logging({'LOG_ENABLED': False})
    hotels = event.get('hotels')

    print '###########PAYLOAD#############'
    print hotels
    print '\n'

    settings = get_project_settings()
    process = CrawlerProcess(settings)

    # commnd = PROJECT_ROOT+"/headless_shell --disable-gpu --no-sandbox --remote-debugging-port=9222 --user-data-dir=/tmp/user-data --single-process --data-path=/tmp/data-path --homedir=/tmp --disk-cache-dir=/tmp/cache-dir"
    # Popen(commnd, shell=True)

    for hotel in hotels:
        print hotel['name']
        process.crawl('trivago', hotel=hotel['name'], roomType=hotel['roomType'])
    #process.start(stop_after_crawl=False)
    process.start()
