#Barter

### Local dev environment setup

#### database
have a postgresql database running at `localhost:5432`

with username `postgres` and trust (no password) authentication

the database should have a database named `barter`

#### S3
**note:** you only really need to do this if you want to:
- deploy front-end code to s3 for production or `env` testing
- have avatar uploads working locally.

create or modify the file `~/.aws/credentials` to include the lines

```
[barter]
aws_access_key_id = <contact-repo-owner>
aws_secret_access_key = <contact-repo-owner>
```
necessary for avatar uploads to work locally ^

also create the file `~/.aws/credentials.json` and include the lines
```json
{
  "barter": {
    "aws_access_key_id": "<contact-repo-owner>",
    "aws_secret_access_key": "<contact-repo-owner>"
  }
}
```
necessary for deploying front-end code ^

contact the owner of this repo to get the s3 keys

#### install dependencies
`npm install`

#### run back-end server
`node server/server.js`

after running the front-end server (see below) the app will be available at http://localhost:5000

provide the command line argument `reload-data` to reload the database with test data, this must be done at least once so there is some data in your test database

#### run front-end server
`gulp dev`

webpack-dev-server will run. assets will be watched and automatically "recompiled"

#### deploy front-end
```sh
# production, be careful what you deploy
$ gulp deploy --target=production
# custom env
$ gulp deploy --target=myenv
```

an `env` can be used to test features in a production-like environment. visit an en env by appending `?env=myenv` to the url


#### tests
`npm test`

#### compile icon font file
**note:** you only need to do this if you want to add or modify an icon

1. place you new or modified svg file in `client/app/icons/vectors`

2. make sure you have the [gulp-fontcustom](https://www.npmjs.com/package/gulp-fontcustom) dependencies installed

  ```sh
  $ brew install fontforge eot-utils
  $ gem install fontcustom
  ```
3. then run:
  ```sh
  gulp iconfont
  ```

view `client/app/styles/fonts/barter-icons-preview.html` to see your new icon
