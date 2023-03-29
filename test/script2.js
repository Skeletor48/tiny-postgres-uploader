const tpul = require('tiny-postgres-uploader');


const poolData = {
  host: "localhost",
  user: "postgres",
  database: "postgres",
  password: "postgres",
  port: 5432
}

const queryData = {
  tableName: 'upload_demo', 
  columnNames: ['id','num1', 'letter1', 'num2', 'letter2'],
  delimiter: ';'
}


tpul('./random_csv.csv', poolData, queryData, true);
