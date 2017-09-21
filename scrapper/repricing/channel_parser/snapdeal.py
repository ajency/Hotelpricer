import scrapy
from w3lib.html import remove_tags
from urlparse import urlparse, parse_qs
import re
from repricing.parser_utility import *

class SnapdealParser():

    def getPrice(self,response):
        price = response.xpath('//*[contains(concat( " ", @class, " " ), concat( " ", "pdp-final-price", " " ))]/span/text()').extract_first()
        return parsePrice(price)

    def getMrp(self,response):
        mrp_xpath = '//*[contains(concat( " ", @class, " " ), concat( " ", "pdpCutPrice", " " ))]/text()'
        if response.xpath(mrp_xpath):
            mrp_data = response.xpath(mrp_xpath).extract_first()
            mrp = parsePrice(re.sub("\D", "", mrp_data))
        else:
            mrp = self.getPrice(response)
        return mrp



    def getProductData(self,response):
        product_title = response.xpath('//*[contains(concat( " ", @class, " " ), concat( " ", "pdp-e-i-head", " " ))]/@title').extract_first()
        product_image = response.xpath('//*[contains(concat( " ", @class, " " ), concat( " ", "tileImages", " " ))]/img/@data-src').extract_first()
        price = self.getPrice(response)
        mrp = self.getMrp(response)
        seller_id = self.getCurrentSellerId(response)
        return {
            'product_id':response.meta.get('id'),
            'listing_id':response.meta.get('listing_id'),
            'title':product_title,
            'image':product_image,
            'price':price,
            'mrp':mrp,
            'seller_id':seller_id,
            'is_stock':True,
            'channel':'snapdeal'
        }



    def getCurrentSellerId(self,response):
        seller_url = response.xpath('//*[contains(concat( " ", @class, " " ), concat( " ", "pdp-e-seller-info-name", " " ))]/@href').extract_first()
        seller_id = seller_url.split("/")[-1]
        return seller_id



    def getSellerData(self,response):
        if response.meta.get('sellers_data'):
            sellers_data = response.meta.get('sellers_data')
        else:
            sellers_data = []

        product_data = response.meta.get('product_data')

        sellers_xpath = '//*[contains(concat( " ", @class, " " ), concat( " ", "seller-dtls", " " ))]'
        seller_blocks = response.xpath(sellers_xpath)

        for seller in seller_blocks:
            seller_name = seller.xpath('.//div[contains(concat(" ", @class, " "), "seller-nm")]/a/text()').extract_first()
            seller_name = seller_name.strip()
            seller_url = seller.xpath('.//div[contains(concat(" ", @class, " "), "seller-nm")]/a/@href').extract_first()
            seller_id = seller_url.split("/")[-1]
            seller_url = 'https://www.snapdeal.com'+str(seller_url)

            price_block = seller.xpath('.//p[contains(concat(" ", @class, " "), "pdp-e-i-FINAL")]/text()').extract_first()
            offer_price =  self.filterPrice(price_block)

            loyalty_block = seller.xpath('.//li[contains(concat(" ", @class, " "), "filterSDPlus")]').extract_first()
            shipping_block = seller.xpath('.//span[contains(concat(" ", @class, " "), "delivery-charges")]/text()').extract_first()
            seller_rating_block = seller.xpath('.//span[contains(concat(" ", @class, " "), "seller-rating-count")]/text()').extract_first()            #

            if seller_rating_block:
                rating = re.sub('[()]', '', seller_rating_block)
                rating = float(rating.split("/")[0])
            else:
                rating = 0;


            if shipping_block:
                delivery = shipping_block.split(" ")[-1].capitalize()
            else:
                delivery = 'Free'


            if loyalty_block:
                covered_under_loyalty = True
                fullfilled_by_marketplace = True
            else:
                covered_under_loyalty = False
                fullfilled_by_marketplace = False

            if seller_id == product_data['seller_id']:
                buy_box = True
            else:
                buy_box = False

            offer_data = {
                'seller_id':seller_id,
                'seller_name':seller_name,
                'price':offer_price,
                'rating':rating,
                'rating_count':0,
                'delivery': delivery,
                'covered_under_loyalty':covered_under_loyalty,
                'seller_url':seller_url,
                'fullfilled_by_marketplace':fullfilled_by_marketplace,
                'buy_box': buy_box,
                'condition':'New'
            }
            sellers_data.append(offer_data)
        return sellers_data



    def getSellerPaginationLink(self,response):
        next_link = response.xpath('//li[contains(concat(" ", @class, " "), "a-last")]/a/@href').extract_first()
        if next_link:
            seller_next_page = 'http://amazon.in'+str(next_link)
        else:
            seller_next_page = None
        return seller_next_page


    def getSellerListingUrl(self,listing_url):
        product_slug = listing_url.split("/")[-2]
        listing_id = listing_url.split("/")[-1]
        seller_listing_url = 'https://www.snapdeal.com/viewAllSellers/product/'+str(product_slug)+'/'+str(listing_id)
        return seller_listing_url


    def filterPrice(self,price):
        price =  price.encode("utf-8").strip()
        price = remove_prefix(price, 'Rs.').strip()
        price = price.rstrip('/-')
        price = price.replace(',','')
        price = re.sub(r'[^\x00-\x7F]+','', price)
        return float(price)
