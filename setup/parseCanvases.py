import json
import ijson

# Pre process cause it's too big
canvasdict = {}
with open('canvasdb.json', 'rb') as c:
  for canvas in ijson.items(c, 'rows.item'):
    canvasdict[canvas["id"]] = canvas["key"]

f = open('./canvascleaned.json', 'w')
canvasdict_str = json.dumps(canvasdict)
f.write(canvasdict_str)
f.close()

