# Start everything

docker-compose up --build

## Start just the database

docker-compose up postgres

## Connect to database

docker exec -it fmrl-postgres psql -U devuser -d fixmyrelationship

## Reset database (careful!)

docker-compose down -v
docker-compose up postgres

## View logs

docker-compose logs postgres

## Backup database

docker exec fmrl-postgres pg_dump -U devuser fixmyrelationship > backup.sql

## Restore database

docker exec -i fmrl-postgres psql -U devuser fixmyrelationship < backup.sql

developer server user/pw: devuser / devpassword
