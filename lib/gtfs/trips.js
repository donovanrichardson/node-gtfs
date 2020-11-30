const sqlString = require('sqlstring');

const { getDb } = require('../db');

const {
  formatOrderByClause,
  formatSelectClause,
  formatWhereClauses
} = require('../utils');
const tripsModel = require('../../models/gtfs/trips');

/*
 * Returns an array of all trips that match the query parameters.
 */
exports.getTrips = async (query = {}, fields = [], orderBy = []) => {
  const db = await getDb();
  const tableName = sqlString.escape(tripsModel.filenameBase);
  const selectClause = formatSelectClause(fields);
  const whereClause = formatWhereClauses(query);
  const orderByClause = formatOrderByClause(orderBy);

  const res = await db.query(`${selectClause} FROM ${tableName} ${whereClause} ${orderByClause};`);
  return res.rows;
};
