const gtfs = require('../')
const config = require('./config.json')
const {Client} = require('pg')

async function test(){
    // client = new Client({database:'avalon'})
    // client.connect()
    // res = await client.query('select * from information_schema.tables;')
    // console.log(res.rows);
    gtfs.import(config)
    client.end()
}
test()


// gtfs.import(config)
// .then(() => {
//     client = new Client({database:'avalon'})
//     // console.log(client);
//     return client.connect()
// //   console.log('Import Successful');
// //   return gtfs.openDb()
// // }).then(db=>{
// //   return db.all('select * from agency;')
// // }).then(ag=>{
// //     console.log(ag);
// }).then(cnxn=>{
//     return client.query('select * from information_schema.tables;')
// }).then(res=>{
//     console.log(res.rows, 'thhe result');
// })
// .catch(err => {
//   console.error(err);
// });

