# Posterizer Project

### How to run a debug build?
Create a file /api/.env
> APP_SECRET=some-secret
>
> DBPORT=27017
>
> DBNAME=posterizer
>


### TODO
- add Dockerfile (dev and prod) to web
- add web to docker-compose (dev and prod)
- run with kubernetes (locally)
- deploy with kubernetes to Google Cloud
- add tests
- use repository pattern
- add pagination
- email confirmation 
- clear references on post/user deletion
- add unique username/email constraints to db schema
- add file uploads
- add web socket (Socket.IO)
- pass some param in query (pageNum, etc.)
- use 'populate' (e.g. with Post model)
- add graphql


### Add endpoints
- show posts by tag/category
- show posts by user

