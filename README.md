






# Tiny Postgres Downloader

#### Table of contents

- [Installation](#installation)
- [About the package](#about-the-package)
- [How to use](#how-to-use)
- [Notes](#notes)
  
### Installation

Just go to your project folder and use the good old:
```sh
$ npm i tiny-postgres-uploader
```
Then require it in your app:
```js
const tpc = require('tiny-postgres-uploader’)
```


### About the package

The purpose of the package is to spare a few line of codes and make it easier to upload rows from a CSV file to a PostgreSQL database. 
#### What it does actually

Basically it opens a Postgres pool, creates a client and then specifies a query dynamically based on the setup objects what it has been called with. We have an option to use in silent mode or make it verbose, then it will log every added row to the terminal. 
 
### How to use

Basic usage:

```js
const tpul = require('tiny-postgres-uploader');


const poolData = {
  host: < localhost AS STRING>,
  user: < user AS STRING>,
  database: <  database name AS STRING>,
  password: < password AS STRING>,
  port: < port number AS INTEGER>,
}

const queryData = {
  tableName: < name of the table in your database AS STRING>,,
  columnNames: [ <list of the column names in the proper order AS STRING> ],
  delimiter: <delimiter AS STRING eg. ‘,’ or ‘;’ >
}


tpul(<‘path to the csv file as a string for example ‘./random.csv’>, poolData, queryData, true);  // that last param is to set if we want log the added rows or not  
```



### Notes

- At the moment you have to create the table first before you use the uploader!!!
- This little package has a few dependencies pls keep it in mind 
- Feel free to contact me on skltr@gmail.com

