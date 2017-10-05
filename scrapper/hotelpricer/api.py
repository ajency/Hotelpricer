from hotelpricer.settings import API_URL
from threading import Thread
from urllib2 import urlopen,Request,HTTPError,URLError
from httplib import HTTPException
import json
from termcolor import colored

def sendCrawlData(payload):
    apiUrl = API_URL+"/crawlResponse/save"
    Thread(target=sendResponseCall, args=[apiUrl,payload]).start()

def sendResponseCall(url,payload):

    print colored('##########SENDING TO API###########','green')
    print json.dumps(payload)
    print '\n'

    headers = {'content-type': "application/json",'accept': "application/json"}
    request = Request(url,json.dumps(payload),headers)
    request.get_method = lambda: 'POST'

    try:
        urlopen(request)
    except HTTPError, e:
        print colored('###########API ERROR#############','red')
        print e
        print '\n'
    except URLError, e:
        print colored('###########API ERROR#############','red')
        print e
        print '\n'
    except HTTPException, e:
        print colored('###########API ERROR#############','red')
        print e
        print '\n'
