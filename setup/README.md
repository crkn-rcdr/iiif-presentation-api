# Setup Scripts

These scripts are CRKN specific scripts that will be used to migrate data from our old database to our new database.

````
# Curl download canvases to json
curl -X GET http://<YOURUSER>:<YOURPASSWORD>@<url>:5984/canvas/_all_docs?include_docs=true > ./canvasdb.json

python3 parseCanvases.py

# Curl download access to json
curl -X GET http://<YOURUSER>:<YOURPASSWORD>@<url>:5984/access/_all_docs?include_docs=true > ./accessdb.json

docker-compose up
python3 loadManifestsIntoDB.py
```