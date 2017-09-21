from repricing.api import sendCrawlData

class ItemsPipeline(object):

    def open_spider(self, spider):
        pass

    def close_spider(self, spider):
        pass

    def process_item(self, item, spider):
        itm = dict(item)
        itm['status'] = 'success'

        # print '##########PIPELINE RESPONSE###########'
        # print itm
        # print '\n'

        sendCrawlData(itm)
        return item
