bikenetic-web
=============

Downloading
-----------

    git clone git://github.com/apechimp/bikenetic-web.git
    
Usage
-----

Two purposes are server here, a demo for displaying pictures gotten from the
facebook api and saving pertinent metadata about facebook photos

* To look at photos, try

    ```
    python -m SimpleHTTPServer 4000
    ```

  and navigate to ```localhost:4000```

* To download metadata, first put the facebook client secret into a file called
  client_secret, then try

    ```
    python facebook-puller.py  
    ```
