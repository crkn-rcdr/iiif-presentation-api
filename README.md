
#pgadmin
http://localhost:5050/login?next=%2F
postgresql://postgres:postgres@postgresqlserver:5432


#api
docker-compose build
http://localhost:8080/

docker cp ./services/iiif.js fastify-iiif-presentation-api_apiserver_1:/app/services/iiif.js
docker container restart fastify-iiif-presentation-api_apiserver_1
docker logs fastify-iiif-presentation-api_apiserver_1 --follow


TODO:
PUT, POST, DELETE http://localhost:8080/manifest
