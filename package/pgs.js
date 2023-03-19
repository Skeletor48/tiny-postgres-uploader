const fs = require('fs');
const getStream = require('get-stream');
const csv = require('csv');
const Pool = require('pg').Pool;



async function uploadCSVRows(filePath, poolData, queryData) {

  const pool = new Pool({
    host: poolData.host,
    user: poolData.user,
    database: poolData.database,
    password: poolData.password,
    port: poolData.port,
  });

  const values = Array.from({length:queryData.columnNames.length}, (v, i) => `$${i+1}`);

  const parseStream = csv.parse({ delimiter: ',' });
  const csvData = await getStream.array(fs.createReadStream(filePath).pipe(parseStream));
  csvData.shift();

  pool.connect(async (err, client, done) => {
    if (err) throw err;
    for (const row of csvData) {
      // console.log(row)
      const query = `INSERT INTO ${queryData.tableName} (${queryData.columnNames}) VALUES (${values})`;
      // console.log(query)
      await client.query(query, row);
    }
  })
}

module.exports = uploadCSVRows;
// readCSVData('random.csv');

