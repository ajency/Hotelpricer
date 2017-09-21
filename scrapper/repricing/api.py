from repricing.settings import API_URL
from threading import Thread
from urllib2 import urlopen,Request,HTTPError,URLError
from httplib import HTTPException
import json

def sendCrawlData(payload):
    apiUrl = API_URL+"/crawlResponse/save"
    Thread(target=sendResponseCall, args=[apiUrl,payload]).start()

def sendResponseCall(url,payload):

    print '##########SENDING TO API###########'
    print json.dumps(payload)
    print '\n'

    headers = {'content-type': "application/json",'accept': "application/json"}
    request = Request(url,json.dumps(payload),headers)
    request.get_method = lambda: 'POST'

    try:
        urlopen(request)
    except HTTPError, e:
        print '###########API ERROR#############'
        print json.dumps(e)
        print '\n'
    except URLError, e:
        print '###########API ERROR#############'
        print json.dumps(e)
        print '\n'
    except HTTPException, e:
        print '###########API ERROR#############'
        print json.dumps(e)
        print '\n'