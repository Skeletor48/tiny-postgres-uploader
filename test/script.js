const uploadCSVRows = require('tiny-postgres-uploader');


const poolData = {
  host: "localhost",
  user: "postgres",
  database: "postgres",
  password: "postgres",
  port: 5432
}

const queryData = {
  tableName: 'random', 
  columnNames: ['random1', 'random2', 'random3', 'random4', 'random5', 'random6', 'random7', 'random8', 'random9', 'random10']
}


uploadCSVRows('./random2.csv', poolData, queryData);