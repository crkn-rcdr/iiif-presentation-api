# Get Started
```
docker-compose build
docker compose up
```

# PostgreSQL
postgresql://postgres:postgres@postgresqlserver:5432
PostgreSQL is a powerful, open source object-relational database system with over 35 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.
[Documentation](https://www.postgresql.org/docs/current/)

# pgAdmin
http://localhost:5050/login?next=%2F
pgAdmin is the most popular and feature rich Open Source administration and development platform for PostgreSQL.
[Documentation](https://www.pgadmin.org/docs/pgadmin4/7.6/index.html)

# Fastify API
http://localhost:8080/
Fast and low overhead web framework, for Node.js
[Documentation](https://fastify.dev/docs/latest/)

## Endpoints

### IIIF
http://localhost:8080/:manifestId/manifest
- GET

http://localhost:8080/:manifestId/canvas/:canvasIdPrefix/:canvasIdSuffix
- GET

http://localhost:8080/:manifestId/annotationpage/:canvasIdPrefix/:canvasIdSuffix/:annotationPageName
- GET

http://localhost:8080/:manifestId/annotation/:canvasIdPrefix/:canvasIdSuffix/:annotationPageName/:annotationId
- GET

### Manifest Management
http://localhost:8080/manifest
- PUT
- POST
- DELETE
