const gtfs = require('../')
const config = require('./config.json')

gtfs.import(config)
.then(() => {
  console.log('Import Successful');
  return gtfs.openDb()
}).then(db=>{
  return db.all('select * from agency;')
}).then(ag=>{
    console.log(ag);
})
.catch(err => {
  console.error(err);
});

