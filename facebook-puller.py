#!/usr/local/bin/python3
import json
from urllib.request import urlopen

def getToken():
    url = 'https://graph.facebook.com/oauth/access_token?' +\
        'client_id=148538191983815' +\
        '&client_secret=a156275a5d2a3a9c018d45dab8a3c78f' +\
        '&grant_type=client_credentials'
    data = urlopen(url)
    return data.readline().decode("utf-8")

def getPics(token):
    url = 'https://graph.facebook.com/134155870026183/photos?' + \
        'fields=name,images&' + token
    response = urlopen(url).readlines()
    loaded = json.loads(''.join([line.decode("utf-8") for line in response]))
    filtered = [{
        'caption': picture["name"], 
        'image': [image['source'] for image in picture['images'] \
                if image['height'] > 1000][0]
        }
        for picture in loaded['data'] if any(
        [image for image in picture['images'] if image["height"] > 1000])]

    return json.dumps(filtered)

def getAlert(token):
    pass
    #get alert here

photo_outfile = open('photo_headlines.json', 'w');
photo_outfile.write(getPics(getToken()))
