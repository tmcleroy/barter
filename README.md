#Barter

#### Set up database
have a postgresql database running at `localhost:5432`

with username `postgres` and trust (no password) authentication

the database should have a database named `barter`

#### Set up S3 credentials
note: you only really need this if you want avatar uploads to work

create or modify the file `~/.aws/credentials` to include the lines

```
[barter]
aws_access_key_id = <contact-repo-owner>
aws_secret_access_key = <contact-repo-owner>
```

contact the owner of this repo to get those values

#### Install dependencies
`npm install`

#### Bundle assets
(also rebundles on asset changes)

`gulp watch`

#### Run server
`node --harmony server/server.js`

the app will be available at http://localhost:5000
