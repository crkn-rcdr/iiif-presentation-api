
#pgadmin
http://localhost:5050/login?next=%2F
postgresql://postgres:postgres@postgresqlserver:5432
CREATE INDEX idxurl ON manifests ((manifest_json->>'id'));


#api
docker-compose build
http://localhost:8080/

TODO:
GET /iiif/<collection_id>/collection
GET /iiif/<manifest_id>/manifest
GET /iiif/<manifest_id>/canvas/<canvas_id_1>/<canvas_id_2>
GET /iiif/<manifest_id>/annotationpage/<canvas_id_1>/<canvas_id_2>/<annotationpage_id>
GET /iiif/<manifest_id>/annotation/<canvas_id_1>/<canvas_id_2>/<annotationpage_id>/<annotation_id>
PUT, POST, DELETE http://localhost:8080/manifest
