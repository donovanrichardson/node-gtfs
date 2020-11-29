const sqlString = require('sqlstring');

const { getDb } = require('../db');

const {
  formatOrderByClause,
  formatSelectClause,
  formatWhereClauses
} = require('../utils');
const timetablePagesModel = require('../../models/non-standard/timetable-pages');

/*
 * Returns an array of all timetable pages that match the query parameters.
 */
exports.getTimetablePages = async (query = {}, fields = [], orderBy = []) => {
  const db = await getDb();
  const tableName = sqlString.escape(timetablePagesModel.filenameBase);
  const selectClause = formatSelectClause(fields);
  const whereClause = formatWhereClauses(query);
  const orderByClause = formatOrderByClause(orderBy);

  const res = await db.query(`${selectClause} FROM ${tableName} ${whereClause} ${orderByClause};`);
  return res.rows;
};
