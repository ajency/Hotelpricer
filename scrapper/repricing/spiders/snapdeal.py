# import scrapy
# from repricing.models import Product
# from repricing.channel_parser.snapdeal import SnapdealParser
# from repricing.parser_utility import updateCrawlStatus
#
#
# class SnapdealSpider(scrapy.Spider):
#     name = "snapdeal"
#
#     def __init__(self, products="", *args, **kwargs):
#         super(SnapdealSpider, self).__init__(*args, **kwargs)
#         product_ids = [int(e) for e in products.split(',')]
#         self.products = Product.select().where(Product.id << product_ids,Product.active == True)
#         self.snapdealParser = SnapdealParser()
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
#         product_url = response.xpath('//div[(@class = "product-tuple-image ")]/a/@href').extract_first()
#         if not product_url:
#             updateCrawlStatus(response.meta.get('id'),'Failed')
#             exit()
#         yield scrapy.Request(url=product_url, meta=response.meta, callback=self.parseProduct, dont_filter=True)
#
#
#
#
#     def parseProduct(self, response):
#         product_data = self.snapdealParser.getProductData(response)
#         #listing_url = response.meta.get('listing_url')
#         seller_listing_url = self.snapdealParser.getSellerListingUrl(response.url)
#         #yield product_data
#         yield scrapy.Request(url=seller_listing_url, meta={'product_data': product_data}, callback=self.parse_sellers, dont_filter=True)
#
#
#
#     def parse_sellers(self, response):
#         product_data = response.meta.get('product_data')
#         sellers_data = self.snapdealParser.getSellerData(response)
#         # seller_next_page = self.snapdealParser.getSellerPaginationLink(response)
#         seller_next_page = None
#         #
#         if seller_next_page:
#             yield scrapy.Request(seller_next_page, meta={'product_data': product_data, 'sellers_data': sellers_data}, callback=self.parse_sellers, dont_filter=True)
#         else:
#             yield {
#                 'product':product_data,
#                 'sellers':sellers_data
#             }
