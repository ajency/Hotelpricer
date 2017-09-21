import scrapy

import json
import requests

class PaytmParser():

    pincode = '403001'

    def getProductData(self,response,data):
        shipping_data = self.getShippingData(data.get('product_id'))
        return {
            'product_id':response.meta.get('id'),
            'listing_id':response.meta.get('listing_id'),
            'title':data.get('name'),
            'image':data.get('thumbnail'),
            'price':data.get('offer_price'),
            'mrp':data.get('actual_price'),
            'seller_id':data.get('merchant').get('merchant_id'),
            'is_stock':True,
            'channel':'paytm',
            'delivery': shipping_data.get('shipping_charges')
        }


    def getMerchantIds(self,data):
        ids = [str(data.get('merchant').get('merchant_id'))]
        for seller in data.get('other_sellers').get('values'):
            ids.append(str(seller.get('id')))

        return ",".join(ids)


    def findReviewDataByKey(self,review_data,merchant_id,key):
        count = 0
        for data in review_data:
            if merchant_id == data.get('merchant_id'):
                count = data.get(key)
        return count


    def getCurrentSellerData(self,product_data,review_data,data):
        # seller_review_url = 'https://paytm.com/frr/merchant/review?channel=web&child_site_id=1&site_id=1&version=2&merchant_id='+str(product_data.get('seller_id'))

        rating = self.findReviewDataByKey(review_data,product_data.get('seller_id'),'rating')
        rating_count = self.findReviewDataByKey(review_data,product_data.get('seller_id'),'sample_count')

        seller_url = 'https://paytm.com/shop/search?merchant='+str(product_data.get('seller_id'))
        seller_data = {
            'seller_id':product_data.get('seller_id'),
            'seller_name':data.get('merchant').get('merchant_name'),
            'price':float(product_data.get('price')),
            'rating':rating,
            'rating_count':rating_count,
            'delivery': product_data.get('delivery'),
            'covered_under_loyalty':False,
            'seller_url':seller_url,
            'fullfilled_by_marketplace':False,
            'buy_box': True,
            'condition':'New',
            'pincode': self.pincode
        }
        return seller_data



    def getShippingData(self,product_id):
        shipping_api_url = 'https://cart.paytm.com/v1/checkavailability/?channel=web&child_site_id=1&site_id=1&version=2&code='+self.pincode+'&product_id='+str(product_id)
        shipping_result = requests.get(shipping_api_url)
        shipping_data =  json.loads(shipping_result.content)
        return shipping_data


    def getReviewData(self,data):
        merchant_ids = self.getMerchantIds(data)
        review_api_url = 'https://paytm.com/frr/merchant/review?channel=web&child_site_id=1&site_id=1&version=2&merchant_id='+merchant_ids
        review_result = requests.get(review_api_url)
        review_data =  json.loads(review_result.content)
        return review_data


    def getSellersData(self,product_data,data):
        review_data = self.getReviewData(data)

        sellers = []
        current_seller_data = self.getCurrentSellerData(product_data,review_data,data)
        sellers.append(current_seller_data)
        for seller in data.get('other_sellers').get('values'):
            seller_url = 'https://paytm.com/shop/search?merchant='+str(seller.get('id'))

            rating = self.findReviewDataByKey(review_data,seller.get('id'),'rating')
            rating_count = self.findReviewDataByKey(review_data,seller.get('id'),'sample_count')

            if product_data.get('seller_id') is seller.get('id'):
                buy_box = True
            else:
                buy_box = False

            seller_data = {
                'seller_id':seller.get('id'),
                'seller_name':seller.get('name'),
                'price':float(seller.get('offer_price')),
                'rating':rating,
                'rating_count':rating_count,
                'delivery': product_data.get('delivery'),
                'covered_under_loyalty':False,
                'seller_url':seller_url,
                'fullfilled_by_marketplace':False,
                'buy_box': buy_box,
                'condition':'New',
                'pincode':self.pincode
            }
            sellers.append(seller_data)
        return sellers
