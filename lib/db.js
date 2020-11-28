const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const {Client} = require('pg')
let db;

//todo this is what has to be fixed for postgres
exports.openDb = async config => {
  if (!db) {
    db = new Client(config.connection);
    await db.connect()
  }

  return db;
};

exports.closeDb = async () => {
  await db.end();
  db = undefined;
};

exports.getDb = () => {
  if (db) {
    return db;
  }

  throw new Error('No database connection. Call `gtfs.openDb(config)` before using any methods.');
};
