module.exports = {
  filenameBase: 'directions',
  schema: [
    {
      name: 'id',
      type: 'serial',
      primary: true
    },
    {
      name: 'route_id',
      type: 'varchar(255)',
      required: true,
      index: true
    },
    {
      name: 'direction_id',
      type: 'integer',
      min: 0,
      max: 1,
      index: true
    },
    {
      name: 'direction',
      type: 'varchar(255)',
      required: true
    }
  ]
};
