const uploadCSVRows = require('tiny-postgres-uploader');


const poolData = {
  host: "localhost",
  user: "postgres",
  database: "postgres",
  password: "postgres",
  port: 5432
}


uploadCSVRows('./random2.csv', poolData);