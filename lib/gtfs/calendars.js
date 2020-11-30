const sqlString = require('sqlstring');

const { getDb } = require('../db');

const {
  formatOrderByClause,
  formatSelectClause,
  formatWhereClauses
} = require('../utils');
const calendarModel = require('../../models/gtfs/calendar');

/*
 * Returns an array of calendars that match the query parameters.
 */
exports.getCalendars = async (query = {}, fields = [], orderBy = []) => {
  const db = await getDb();
  const tableName = sqlString.escape(calendarModel.filenameBase);
  const selectClause = formatSelectClause(fields);
  const whereClause = formatWhereClauses(query);
  const orderByClause = formatOrderByClause(orderBy);

  const res = await db.query(`${selectClause} FROM ${tableName} ${whereClause} ${orderByClause};`);
  return res.rows;
};
