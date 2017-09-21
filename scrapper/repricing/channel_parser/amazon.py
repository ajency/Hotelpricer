import scrapy
from w3lib.html import remove_tags
from urlparse import urlparse, parse_qs
import re
from repricing.parser_utility import *
import json

class AmazonParser():

    def getPrice(self,response):
        sale_price_xpath = '//*[(@id = "priceblock_saleprice")]'
        our_price_xpath = '//*[(@id = "priceblock_ourprice")]'
        mrp_xpath = '//*[contains(concat( " ", @class, " " ), concat( " ", "a-text-strike", " " ))]'

        if response.xpath(sale_price_xpath):
            price_data = response.xpath(sale_price_xpath).extract_first()
        elif response.xpath(our_price_xpath):
            price_data = response.xpath(our_price_xpath).extract_first()
        elif response.xpath(mrp_xpath):
            price_data = response.xpath(mrp_xpath).extract_first()
        else:
            price_data = '0'

        price = remove_tags(price_data).strip()
        return parsePrice(price)


    def getMrp(self,response):
        mrp_xpath = '//*[contains(concat( " ", @class, " " ), concat( " ", "a-text-strike", " " ))]'
        sale_price_xpath = '//*[(@id = "priceblock_saleprice")]'
        our_price_xpath = '//*[(@id = "priceblock_ourprice")]'

        if response.xpath(mrp_xpath):
            price_data = response.xpath(mrp_xpath).extract_first()
        elif response.xpath(our_price_xpath):
            price_data = response.xpath(our_price_xpath).extract_first()
        elif response.xpath(sale_price_xpath):
            price_data = response.xpath(sale_price_xpath).extract_first()
        else:
            price_data = '0'

        price = remove_tags(price_data).strip()
        return parsePrice(price)


    def getProductData(self,response):
        product_title_block = '//*[(@id = "productTitle")]/text()'

        product_title = response.xpath(product_title_block).extract_first().strip()


        availability_block = '//*[(@id = "availability")]/span/text()'
        is_stock = True
        try:
            availability_text = response.xpath(availability_block).extract_first().strip()
            if availability_text == "Currently unavailable.":
                is_stock = False
        except:
            pass


        image_data = response.xpath('//*[(@id = "imgTagWrapperId")]/img/@data-a-dynamic-image').extract_first()
        image_json = json.loads(image_data)
        unsecure_image = next(iter(image_json))
        product_image = urlparse(unsecure_image)
        product_image = product_image._replace(netloc=product_image.netloc.replace(product_image.hostname, 'images-eu.ssl-images-amazon.com')).geturl().replace("http://","https://")

        price = self.getPrice(response)
        mrp = self.getMrp(response)
        seller_id = self.getCurrentSellerId(response)
        return {
            'product_id':response.meta.get('id'),
            'listing_id': response.meta.get('listing_id'),
            'group_id': response.meta.get('group_id'),
            'batch_id': response.meta.get('batch_id'),
            'title':product_title,
            'image':product_image,
            'price':price,
            'mrp': mrp,
            'seller_id':seller_id,
            'is_stock':is_stock,
            'channel':'amazon'
        }



    def getCurrentSellerId(self,response):
        seller_id = response.xpath('//input[(@id = "merchantID")]/@value').extract_first()
        return seller_id



    def getSellerData(self,response):
        if response.meta.get('sellers_data'):
            sellers_data = response.meta.get('sellers_data')
        else:
            sellers_data = []

        product_data = response.meta.get('product_data')

        sellers_xpath = '//*[contains(concat( " ", @class, " " ), concat( " ", "olpOffer", " " ))]'
        seller_blocks = response.xpath(sellers_xpath)

        for seller in seller_blocks:
            seller_name = seller.css('h3.olpSellerName span a::text').extract_first()
            seller_url_string = seller.xpath('.//h3[contains(concat( " ", @class, " " ), concat( " ", "olpSellerName", " " ))]/span/a/@href').extract_first()
            offer_price = seller.xpath('.//span[contains(concat(" ", @class, " "), "olpOfferPrice")]/span/text()').extract_first()
            rating_data = seller.xpath('.//i[contains(concat(" ", @class, " "), "a-icon-star")]/span/text()').extract_first()
            fullfilled_block = seller.xpath('.//a[contains(concat(" ", @class, " "), "olpFbaPopoverTrigger")]').extract_first()
            seller_rating_block = seller.xpath('.//div[contains(concat( " ", @class, " " ), concat( " ", "olpSellerColumn", " " ))]/p').extract_first()
            shipping_block = seller.xpath('.//span[contains(concat(" ", @class, " "), "olpShippingPrice")]/span/text()').extract_first()
            loyalty_block = seller.xpath('.//span[contains(concat(" ", @class, " "), "supersaver")]/i').extract_first()
            condition_block = seller.xpath('.//span[contains(concat(" ", @class, " "), "olpCondition")]/text()').extract_first()

            if condition_block:
                condition = condition_block.strip()
            else:
                condition = "New"

            if seller_rating_block:
                rating_text = re.search(r'\((.*?)\)',seller_rating_block).group(1)
                if rating_text:
                    rating_count = parseNumber(rating_text)
                else:
                    rating_count = 0
            else:
                rating_count = 0;

            if fullfilled_block:
                fullfilled_by_marketplace = True
            else:
                fullfilled_by_marketplace = False

            if rating_data:
                rating = parseRating(rating_data.split(None, 1)[0])
            else:
                rating = 0

            if shipping_block:
                #delivery = parsePrice(shipping_block)
                delivery = shipping_block.replace(',','')
            else:
                delivery = 'Free'

            if loyalty_block:
                convered_under_loyalty = True
            else:
                convered_under_loyalty = False

            seller_url = 'http://www.amazon.in'+seller_url_string
            parsed_url = urlparse(seller_url)
            url_query = parse_qs(parsed_url.query)
            seller_id = url_query.get('seller')[0]

            # if not product_data['seller_id']:
            #     product_data['seller_id'] = seller_id
            #     product_data['price'] = parsePrice(offer_price)


            if seller_id == product_data['seller_id']:
                buy_box = True
            else:
                buy_box = False

            offer_data = {
                'seller_id':seller_id,
                'seller_name':seller_name,
                'price':parsePrice(offer_price),
                'rating':rating,
                'rating_count':rating_count,
                'delivery': delivery,
                'covered_under_loyalty':convered_under_loyalty,
                'seller_url':seller_url,
                'fullfilled_by_marketplace':fullfilled_by_marketplace,
                'buy_box':buy_box,
                'condition':condition
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


    def getSellerListingUrl(self,listing_id):
        seller_listing_url = 'http://www.amazon.in/gp/offer-listing/'+str(listing_id)
        return seller_listing_url
