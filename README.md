
#pgadmin
http://localhost:5050/login?next=%2F
postgresql://postgres:postgres@postgresqlserver:5432
CREATE INDEX idxurl ON manifests ((manifest_json->>'id'));
SELECT * FROM manifests WHERE manifest_json->>'id' = 'http://10.5.0.5:5000/iiif/oocihm.lac_reel_c8128/manifest'; 
Postgres Query complete 00:00:00.357
Couchdb: way too long (timeout)

#api
docker-compose build
http://localhost:8080/

docker cp ./services/iiif.js fastify-iiif-presentation-api_apiserver_1:/app/services/iiif.js
docker container restart fastify-iiif-presentation-api_apiserver_1
docker logs fastify-iiif-presentation-api_apiserver_1 --follow


TODO:
GET /iiif/<collection_id>/collection
GET /iiif/<manifest_id>/manifest
GET /iiif/<manifest_id>/canvas/<canvas_id_1>/<canvas_id_2>
GET /iiif/<manifest_id>/annotationpage/<canvas_id_1>/<canvas_id_2>/<annotationpage_id>
GET /iiif/<manifest_id>/annotation/<canvas_id_1>/<canvas_id_2>/<annotationpage_id>/<annotation_id>
PUT, POST, DELETE http://localhost:8080/manifest
