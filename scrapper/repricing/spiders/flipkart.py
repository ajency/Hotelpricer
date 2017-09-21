import scrapy
from repricing.channel_parser.flipkart import FlipkartParser
from repricing.parser_utility import generateUrl

from repricing.api import sendCrawlData

from scrapy import signals

from repricing import mailer

class FlipkartSpider(scrapy.Spider):
    name = "flipkart"

    def __init__(self, products="", group_id=0, batch_id=0, *args, **kwargs):
        super(FlipkartSpider, self).__init__(*args, **kwargs)
        prod_data = products.split(',')
        products = []
        for prod in prod_data:
            p_data = {
                'id':int(prod.split('#')[0]),
                'listing_id':prod.split('#')[1],
                'listing_url':generateUrl('flipkart',prod.split('#')[1]),
                'group_id':group_id,
                'batch_id':batch_id
            }
            products.append(p_data)
        self.products = products
        self.group_id = group_id
        self.flipkartParser = FlipkartParser()




    @classmethod
    def from_crawler(cls, crawler, *args, **kwargs):
        spider = super(FlipkartSpider, cls).from_crawler(crawler, *args, **kwargs)
        crawler.signals.connect(spider.spider_error, signal=signals.spider_error)
        return spider

    def spider_error(self, failure, response, spider):

        print '###########SPIDER ERROR#############'
        print failure
        print '\n'

        try:
            mailer.send("Crawl for the listing id "+str(response.meta.get('listing_id'))+" for flipkart on repricer.browntape.com fas failed!",product_id=response.meta.get('id'))
        except:
            pass

        payload = {
        'status':"failed",
        'product':{
            'product_id':response.meta.get('id')
            }
        }
        sendCrawlData(payload)
        spider.logger.info('Spider failed due to error!!: %s', spider.name)




    def start_requests(self):
        for product in self.products:
            product_data = {
                'id':product['id'],
                'listing_id':product['listing_id'],
                'listing_url':product['listing_url'],
                'group_id':product['group_id'],
                'batch_id':product['batch_id']
            }

            print '\n'+'###########ITEM#############'
            print product_data
            print '\n'

            yield scrapy.Request(url=product['listing_url'], callback=self.parse, meta=product_data, dont_filter=True)


    def parse(self, response):

        apiResponseData = self.flipkartParser.getProductResponseData(response.meta.get('listing_id'),response.meta.get('id'))

        product_response = apiResponseData.get('product_response')

        seller_response = apiResponseData.get('seller_response')

        product_data = self.flipkartParser.getFlipProductData(product_response,response)

        if len(seller_response) > 0:
            sellers_data = self.flipkartParser.getFlipSellerData(seller_response)
        else:
            sellers_data = []

        yield {
                'product':product_data,
                'sellers':sellers_data
            }



    def errback_httpbin(self, failure):
        # log all errback failures,
        # in case you want to do something special for some errors,
        # you may need the failure's type
        self.logger.error(repr(failure))
