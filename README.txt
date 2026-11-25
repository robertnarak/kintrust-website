KINTRUST WEBSITE
================

Static site. English and Korean are both on the home page.
Use the EN / 한국어 switch in the header. The choice is saved in the browser.

RUN LOCALLY
-----------
1. Open a terminal in this folder (the folder with index.html).
2. With Python 3:

   Windows:
     py -m http.server 8000 --bind 127.0.0.1

   macOS / Linux:
     python3 -m http.server 8000 --bind 127.0.0.1

3. Open http://127.0.0.1:8000/
   Korean: http://127.0.0.1:8000/?lang=ko
   English: http://127.0.0.1:8000/?lang=en

4. Press Ctrl+C to stop the server.

Serve this folder as the site root. Root-relative links (/images, /styles.css)
need a local server. Opening index.html as a file will not load them.

HOSTING
-------
Upload the contents of this folder as the website root, including images.
There is no server-side code or API key. Phone, email, and WhatsApp links use
the public contacts printed on the page.

Set canonical URLs once the public domain is confirmed. This copy does not
invent one.
