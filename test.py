#!/usr/bin/env python

print "Content-Type: text/html"
print

print('<html>')
import cgi
form = cgi.FieldStorage()
for k in form.keys():
	print "<p><b>",k,"</b>",form[k].value,"</p>"
print('</html>')