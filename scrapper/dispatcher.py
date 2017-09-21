import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from scrapy.utils.log import configure_logging

def dispatch(event, context):
    #configure_logging({'LOG_ENABLED': False})
    products = event.get('products')
    group_id = event.get('group_id')
    batch_id = event.get('batch_id')

    print '###########PAYLOAD#############'
    print event
    print '\n'

    process = CrawlerProcess(get_project_settings())
    marketplace = list(products.keys())[0]
    print '##########MP#'+marketplace+'#############'
    product_ids = str(products[marketplace])
    process.crawl(marketplace, products=product_ids, group_id=group_id, batch_id=batch_id)
    process.start(stop_after_crawl=False)