#!/usr/local/bin/python3
import json
import time
import re
from urllib.request import urlopen

def getToken():
    client_secret = open('client_secret', 'r').readline()
    url = 'https://graph.facebook.com/oauth/access_token?' +\
        'client_id=148538191983815' +\
        '&client_secret=' + client_secret +\
        '&grant_type=client_credentials'
    data = urlopen(url)
    return data.readline().decode("utf-8")

def getJsonFromFacebook(url):
    response = urlopen(url).readlines()
    return json.loads(''.join([line.decode("utf-8") for line in response]))

def getPics(token):
    url = 'https://graph.facebook.com/134155870026183/photos?' + \
        'fields=name,images&' + token
    loaded = getJsonFromFacebook(url)
    filtered = [{
        'caption': picture["name"], 
        'image': [image['source'] for image in picture['images'] \
                if image['height'] > 1000][0]
        }
        for picture in loaded['data'] if any(
        [image for image in picture['images'] if image["height"] > 1000])]

    return json.dumps(filtered)

def getTodaysMessages(token):
    url = 'https://graph.facebook.com/109198659188571/posts?' + \
        'fields=message&since=yesterday&' + token
    return getJsonFromFacebook(url)

def getAlert(token):
    todaysMessages = getTodaysMessages(token)
    alerts = [ message for message in todaysMessages['data'] \
            if re.match('#alert', message['message']) ]
    if any(alerts):
        return json.dumps(alerts[0])
    else:
        return '{}'

token = getToken()

photo_outfile = open('photo_headlines.json', 'w');
photo_outfile.write(getPics(token))

alert_outfile = open('alert.json', 'w');
alert_outfile.write(getAlert(token))
