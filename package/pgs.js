const fs = require('fs');
const getStream = require('get-stream');
const csv = require('csv');
const Pool = require('pg').Pool;



async function uploadCSVRows(filePath, poolData) {

  const pool = new Pool({
    host: poolData.host,
    user: poolData.user,
    database: poolData.database,
    password: poolData.password,
    port: poolData.port,
  });

  const parseStream = csv.parse({ delimiter: ',' });
  const csvData = await getStream.array(fs.createReadStream(filePath).pipe(parseStream));
  csvData.shift();

  pool.connect(async (err, client, done) => {
    if (err) throw err;
    for (const row of csvData) {
      // console.log(row)
      const query = "INSERT INTO random (random1, random2, random3, random4, random5, random6, random7, random8, random9, random10) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
      // console.log(query)
      await client.query(query, row);
    }
  })
}

module.exports = uploadCSVRows;
// readCSVData('random.csv');

