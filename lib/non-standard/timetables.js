const sqlString = require('sqlstring');

const { getDb } = require('../db');

const {
  formatOrderByClause,
  formatSelectClause,
  formatWhereClauses
} = require('../utils');
const timetablesModel = require('../../models/non-standard/timetables');

/*
 * Returns an array of all timetables that match the query parameters.
 */
exports.getTimetables = async (query = {}, fields = [], orderBy = []) => {
  const db = await getDb();
  const tableName = sqlString.escape(timetablesModel.filenameBase);
  const selectClause = formatSelectClause(fields);
  const whereClause = formatWhereClauses(query);
  const orderByClause = formatOrderByClause(orderBy);

  const res = await db.query(`${selectClause} FROM ${tableName} ${whereClause} ${orderByClause};`);
  return res.rows;
};
