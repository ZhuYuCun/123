// const { v4: uuidv4 } = require('uuid');
// console.log('uuidv4()', uuidv4());

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('/Users/zhuyucun/Test1.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

let sql = `SELECT COUNT(*) from product`;
db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  console.log(rows);
  console.log(rows[0]['COUNT(*)']);
  db.close();
});
