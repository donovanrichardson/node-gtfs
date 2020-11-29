const sqlString = require('sqlstring');

const { getDb } = require('../db');

const {
  formatOrderByClause,
  formatSelectClause,
  formatWhereClauses
} = require('../utils');
const pathwaysModel = require('../../models/gtfs/pathways');

/*
 * Returns an array of all pathways that match the query parameters.
 */
exports.getPathways = async (query = {}, fields = [], orderBy = []) => {
  const db = await getDb();
  const tableName = sqlString.escape(pathwaysModel.filenameBase);
  const selectClause = formatSelectClause(fields);
  const whereClause = formatWhereClauses(query);
  const orderByClause = formatOrderByClause(orderBy);

  const res = await db.query(`${selectClause} FROM ${tableName} ${whereClause} ${orderByClause};`);
  return res.rows;
};
