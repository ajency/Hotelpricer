import scrapy

import json
import requests

class FlipkartParser():

    pincode = '400001'


    def getProductResponseData(self,listing_id,product_id):
        url = "https://www.flipkart.com/api/3/page/dynamic/product-sellers"
        payload = {"requestContext":{"productId":listing_id},"locationContext":{"pincode":self.pincode}}
        headers = {
        'x-user-agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36 FKUA/website/41/website/Desktop",
        'content-type': "application/json",
        'cache-control': "no-cache"
        }
        response = requests.request("POST", url, data=json.dumps(payload), headers=headers)
        response_data =  json.loads(response.content)
        if response_data['STATUS_CODE'] in [400,403,500]:
            return False

        try:
            seller_response = response_data['RESPONSE']['data']['product_seller_detail_1']['data']
        except:
            setStockOut(product_id)
            seller_response = []

        product_response = response_data['RESPONSE']['data']
        product_response['productStatus'] = response_data['RESPONSE']['pageContext']['trackingDataV2']['productStatus']

        return {
            'product_response': product_response,
            'seller_response': seller_response
        }


    def getFlipSellerData(self,response):
        sellers = []
        for seller in response:
            seller_info = seller['value']['sellerInfo']['value']
            seller_url = 'https//www.flipkart.com'+seller['action']['url']
            delivery = seller['value']['pricing']['value']['deliveryCharge']['value']
            price = seller['value']['pricing']['value']['finalPrice']['value']
            buy_box = seller['value']['metadata']['selected']
            faAvailable = seller['value']['metadata']['faAvailable']

            if 'rating' in seller_info:
                rating = seller_info['rating']['average']
                rating_count = seller_info['rating']['count']
            else:
                rating = 0
                rating_count = 0


            seller_data = {
                'seller_id':seller_info['id'],
                'seller_name':seller_info['name'],
                'price':price,
                'rating':rating,
                'rating_count':rating_count,
                'delivery': delivery,
                'covered_under_loyalty':faAvailable,
                'seller_url':seller_url,
                'fullfilled_by_marketplace':faAvailable,
                'buy_box':buy_box,
                'condition':'New',
                'pincode': self.pincode
            }
            sellers.append(seller_data)
        return sellers



    def getFlipProductData(self,apiResponse,response):

        try:
            seller_data = apiResponse['product_seller_detail_1']['data'][0]
            seller_info = seller_data['value']['sellerInfo']['value']
            seller_id = seller_info['id']
        except:
            seller_id = 0


        summary_data = apiResponse['product_summary_1']['data'][0]
        price = summary_data['value']['pricing']['finalPrice']['value']
        image_url_pattern = summary_data['value']['imageUrl']
        product_image = image_url_pattern.replace('{@width}', '100').replace('{@height}', '200').replace('{@quality}', '70');
        #product_title = summary_data['value']['title']+" ("+summary_data['value']['subTitle']+")"
        product_title = summary_data['value']['title']

        #print '=======PRODUCT STATUS======='
        if apiResponse['productStatus'] == 'Out of Stock':
            is_stock = False
        else:
            is_stock = True

        mrp = price
        prices = summary_data['value']['pricing']['prices']
        for pr in prices:
            #if pr.get('strikeOff'):
            if pr.get('name') == 'MRP':
                mrp = pr.get('value')


        product = {
            'product_id':response.meta.get('id'),
            'listing_id':response.meta.get('listing_id'),
            'group_id':response.meta.get('group_id'),
            'batch_id':response.meta.get('batch_id'),
            'title':product_title,
            'image':product_image,
            'price':price,
            'mrp': mrp,
            'seller_id':seller_info['id'],
            'is_stock':is_stock,
            'channel':'flipkart'
        }
        return product
