from urlparse import urlparse, parse_qs
from repricing import settings

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import os

import time
import datetime

def parsePrice(price):
    return float(price.replace(',',''))


def parseNumber(text):
    num = text.split(None, 1)[0]
    if num != '<span':
        return int(num.replace(',',''))
    else:
        return 0


def parseRating(rating):
    try:
        return float(rating.strip())
    except:
        return 0.0


def remove_prefix(s, prefix):
    return s[len(prefix):] if s.startswith(prefix) else s


def getPhantomDriver():
    headers = { 'Accept':'*/*',
    'Accept-Encoding':'gzip, deflate, sdch',
    'Accept-Language':'en-US,en;q=0.8',
    'Cache-Control':'max-age=0',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36'
    }

    for key, value in enumerate(headers):
        webdriver.DesiredCapabilities.PHANTOMJS['phantomjs.page.customHeaders.{}'.format(key)] = value

    driver_path = settings.PROJECT_ROOT+'/phantomjs'

    service_args = [
        '--disk-cache=false',
        '--load-images=no'
    ]

    driver = webdriver.PhantomJS(executable_path=driver_path,service_args=service_args,service_log_path=os.path.devnull)
    return driver


def getChromeDriver():
    #driver_path = settings.PROJECT_ROOT+'/chromedriver'
    driver_path = 'var/www/chromedriver'
    options = webdriver.ChromeOptions()
    options.add_argument('--allow-running-insecure-content')
    options.add_argument('--disable-web-security')
    options.add_argument('--no-referrers')
    options.add_argument("'chrome.prefs': {'profile.managed_default_content_settings.images': 2}")

    driver = webdriver.Chrome(executable_path=driver_path,chrome_options=options)
    return driver


def getHtmlUnitDriver():
    driver = webdriver.Remote(desired_capabilities=webdriver.DesiredCapabilities.HTMLUNITWITHJS)
    #driver = webdriver.Remote("http://127.0.0.1:4444/wd/hub", webdriver.DesiredCapabilities.HTMLUNITWITHJS)
    return driver


def generateUrl(marketplace,listing_id):
    if marketplace is 'amazon':
        listing_url = 'http://www.amazon.in/dp/'+listing_id
    elif marketplace is 'flipkart':
        listing_url = 'https://www.flipkart.com/item/'+listing_id
    elif marketplace is 'snapdeal':
        listing_url = 'https://www.snapdeal.com/search?keyword='+listing_id
    elif marketplace is 'paytm':
        listing_url = 'https://paytm.com/shop/search?q='+listing_id
    else:
        listing_url = ''
    return listing_url
