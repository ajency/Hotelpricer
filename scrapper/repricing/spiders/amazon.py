import scrapy, base64, requests, random, json
from repricing.channel_parser.amazon import AmazonParser
from repricing.parser_utility import generateUrl
from repricing.settings import ENABLE_AMAZON_PROXY

from repricing.api import sendCrawlData

from scrapy import signals

from repricing import mailer


class AmazonSpider(scrapy.Spider):
    name = "amazon"

    def __init__(self, products="", group_id=0, batch_id=0, *args, **kwargs):
        super(AmazonSpider, self).__init__(*args, **kwargs)

        prod_data = products.split(',')
        products = []
        for prod in prod_data:
            p_data = {
                'id':int(prod.split('#')[0]),
                'listing_id':prod.split('#')[1],
                'listing_url':generateUrl('amazon',prod.split('#')[1]),
                'group_id':group_id,
                'batch_id':batch_id
            }
            products.append(p_data)
        self.products = products
        self.amazonParser = AmazonParser()



    @classmethod
    def from_crawler(cls, crawler, *args, **kwargs):
        spider = super(AmazonSpider, cls).from_crawler(crawler, *args, **kwargs)
        crawler.signals.connect(spider.spider_error, signal=signals.spider_error)
        return spider

    def spider_error(self, failure, response, spider):

        print '###########SPIDER ERROR#############'
        print failure
        print '\n'

        try:
            mailer.send("Crawl for the listing id "+str(response.meta.get('listing_id'))+" for amazon on repricer.browntape.com fas failed!",product_id=response.meta.get('id'))
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

    def get_proxy(self):
        enable_proxy = ENABLE_AMAZON_PROXY
        if enable_proxy:
            url = "https://api.proxybonanza.com/v1/userpackages/55198.json"
            apiKey = "LLZqQhTgJFnxCkVA701r7hLiPrfwjl7YXLiDDmQ3b63q0qSSa2!45485"
            headers = {"Content-Type": "application/json", "Accept": "application/json", "Authorization": apiKey}
            res = requests.get(url, data={}, headers=headers)
            if res.status_code == 200:
                res = json.loads(res.content)
                use_proxy = {"data": {"ip": random.choice(res['data']['ippacks'])['ip'], "port": random.choice(res['data']['ippacks'])['port_http'], "user": res['data']['login'], "pass": res['data']['password']}, "success": True}
            else:
                use_proxy = {"data": res.content, "success": False}
        else:
            use_proxy = {"data": {}, "success": False}
        return use_proxy

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

            use_proxy = self.get_proxy()
            headers = {}
            product_data['proxy_details'] = use_proxy
            if(use_proxy['success']) :
                product_data['proxy'] = 'https://'+use_proxy['data']['ip'] + ':' + str(use_proxy['data']['port'])
                proxy_user_pass = use_proxy['data']['user']+':'+use_proxy['data']['pass']
                encoded_user_pass = base64.b64encode(proxy_user_pass)
                headers['Proxy-Authorization'] = 'Basic ' + encoded_user_pass
                print '###########Using proxy start_requests###########' + product_data['proxy']

            yield scrapy.Request(url=product['listing_url']+'?th=1&psc=1', callback=self.parse, meta=product_data, headers=headers , dont_filter=True)

    def parse(self, response):
        product_data = self.amazonParser.getProductData(response)

        proxy = ''
        use_proxy = response.meta.get('proxy_details')
        headers = {}
        if(use_proxy['success']) :
            proxy = 'https://'+use_proxy['data']['ip'] + ':' + str(use_proxy['data']['port'])
            proxy_user_pass = use_proxy['data']['user']+':'+use_proxy['data']['pass']
            encoded_user_pass = base64.b64encode(proxy_user_pass)
            headers['Proxy-Authorization'] = 'Basic ' + encoded_user_pass
            print '###########Using proxy parse###########' + proxy
        listing_id = response.meta.get('listing_id')
        seller_listing_url = self.amazonParser.getSellerListingUrl(listing_id)
        yield scrapy.Request(seller_listing_url, meta={'product_data': product_data , 'proxy' : proxy , 'proxy_details' : use_proxy } , callback=self.parse_sellers, dont_filter=True, headers=headers)


    def parse_sellers(self, response):
        product_data = response.meta.get('product_data')
        #product_data['group_id'] = self.group_id
        sellers_data = self.amazonParser.getSellerData(response)

        seller_next_page = self.amazonParser.getSellerPaginationLink(response)

        if seller_next_page:
            proxy = ''
            use_proxy = response.meta.get('proxy_details')
            headers = {}
            if(use_proxy['success']):
                proxy_user_pass = use_proxy['data']['user']+':'+use_proxy['data']['pass']
                encoded_user_pass = base64.b64encode(proxy_user_pass)
                headers['Proxy-Authorization'] = 'Basic ' + encoded_user_pass
                proxy = 'https://'+use_proxy['data']['ip'] + ':' + str(use_proxy['data']['port'])
                print '###########Using proxy parse_sellers###########' + proxy
            yield scrapy.Request(seller_next_page, meta={'product_data': product_data, 'sellers_data': sellers_data, 'proxy' : proxy , 'proxy_details' : use_proxy }  , headers=headers ,  callback=self.parse_sellers, dont_filter=True)
        else:
            yield {
                'product':product_data,
                'sellers':sellers_data
            }
