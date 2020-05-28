echo "Run docker lamp container..."
dockerid=$(docker run -d -p "8080:80" -v ${PWD}/:/app mattrayner/lamp:latest-1804)
echo "Waiting for mysql install (has about 3 minutes)..."
sleep 240
echo "execute sql script create_database.sql"
docker exec -it $dockerid sh -c "mysql -uroot < app/server/database/script/create_database.sql" 