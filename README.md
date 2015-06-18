#Barter

### Set up database
have a postgresql database running at `localhost:5432`

with username `postgres` and trust (no password) authentication

the database should have a database named `barter`

#### Install dependencies
`npm install`

#### Bundle assets
(also rebundles on asset changes)

`gulp watch`

#### Run server
`node --harmony server/server.js`

go to http://localhost:5000
