const fs = require('fs');
const getStream = require('get-stream');
const csv = require('csv');
const Pool = require('pg').Pool;
const loadingSpinner = require('loading-spinner');



async function uploadCSVRows(filePath, poolData, queryData, isLoggingRows) {

  const pool = new Pool({
    host: poolData.host,
    user: poolData.user,
    database: poolData.database,
    password: poolData.password,
    port: poolData.port,
  });

  const values = Array.from({
    length: queryData.columnNames.length
  }, (v, i) => `$${i+1}`);

  const parseStream = csv.parse({
    delimiter: queryData.delimiter
  });
  const csvData = await getStream.array(fs.createReadStream(filePath).pipe(parseStream));
  csvData.shift();

  const client = await pool.connect();
  if (!isLoggingRows) loadingSpinner.start(100, {
      clearChar: true
    });
  let rowCount = 0;

  try {
    
    for (const row of csvData) {
      if (isLoggingRows) console.log(row);
      const query = `INSERT INTO ${queryData.tableName} (${queryData.columnNames}) VALUES (${values})`;
      const res = await client.query(query, row);
      rowCount += 1;
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    if (!isLoggingRows) loadingSpinner.stop();
    console.log(`${rowCount} row added`);
    await client.release();
    await pool.end()
    console.log('Pool has been closed')
  }
}

module.exports = uploadCSVRows;
