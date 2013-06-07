#!/usr/local/bin/python3
import http.server
import socketserver
from urllib.request import urlopen

def getToken():
    url = 'https://graph.facebook.com/oauth/access_token?' +\
        'client_id=148538191983815' +\
        '&client_secret=a156275a5d2a3a9c018d45dab8a3c78f' +\
        '&grant_type=client_credentials'
    data = urlopen(url)
    return data.readline().decode("utf-8")

tokenfile = open('access-token.js', 'w')
tokenfile.write("BIKENETIC = {token:\"%s\"}" % getToken())
tokenfile.close()

PORT = 80

Handler = http.server.SimpleHTTPRequestHandler

httpd = socketserver.TCPServer(("", PORT), Handler)

httpd.serve_forever()
