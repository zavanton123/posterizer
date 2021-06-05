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
- update access policy (everybody can view posts, but only the authors can create/update/delete)
- add validation
- add tests
- use typescript
- use repository pattern
- add pagination
- email confirmation 
- clear references on post/user deletion
- add unique username/email constraints to db schema
- add file uploads
- add web socket (Socket.IO)
- wrap bcrypt in try catch
- pass some param in query (pageNum, etc.)
- use 'populate' (e.g. with Post model)
- add 404 error - post (tag, category, etc.) not found
- add 403 error (e.g. wrong user tries to edit the post)
- add graphql


### Add endpoints
- show posts by tag/category
- show posts by user

