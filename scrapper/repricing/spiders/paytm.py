# import scrapy
# from repricing.models import Product
# from repricing.channel_parser.paytm import PaytmParser
#
# import json
# from repricing.parser_utility import parsePrice,updateCrawlStatus
# import requests
#
#
# class PaytmSpider(scrapy.Spider):
#     name = "paytm"
#
#     def __init__(self, products="", *args, **kwargs):
#         super(PaytmSpider, self).__init__(*args, **kwargs)
#         product_ids = [int(e) for e in products.split(',')]
#         self.products = Product.select().where(Product.id << product_ids,Product.active == True)
#         self.PaytmParser = PaytmParser()
#
#
#     def start_requests(self):
#         for product in self.products:
#             product_data = {
#                 'id':product.id,
#                 'listing_id':product.listing_id,
#                 'listing_url':product.listing_url
#             }
#             updateCrawlStatus(product.id,'Crawling')
#             yield scrapy.Request(url=product.listing_url, callback=self.parse, meta=product_data, dont_filter=True)
#
#
#     def parse(self, response):
#         url_text = response.xpath('//div[(@class = "_2i1r")]/a/@href').extract_first()
#         if not url_text:
#             updateCrawlStatus(response.meta.get('id'),'Failed')
#             exit()
#
#         api_endpoint = url_text.split("/")[-1]
#         api_endpoint = api_endpoint.replace('-pdp','')
#         api_url = 'https://catalog.paytm.com/v1/p/'+api_endpoint
#         yield scrapy.Request(url=api_url, callback=self.parseProductApi, meta=response.meta, dont_filter=True)
#
#
#
#     def parseProductApi(self, response):
#         jsonresponse = json.loads(response.body_as_unicode())
#         if not jsonresponse.get('product_id'):
#             updateCrawlStatus(response.meta.get('id'),'Failed')
#             exit()
#
#
#         product_data = self.PaytmParser.getProductData(response,jsonresponse)
#         sellers_data = self.PaytmParser.getSellersData(product_data,jsonresponse)
#         yield {
#             'product':product_data,
#             'sellers':sellers_data
#         }
