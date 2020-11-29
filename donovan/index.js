const gtfs = require('../')
const config = require('./config.json')
const {Client} = require('pg')
const {DateTime} = require('luxon')

async function test(){
    // client = new Client({database:'avalon'})
    // client.connect()
    // res = await client.query('select * from information_schema.tables;')
    // console.log(res.rows);
    gtfs.import(config)
    await client.end()
}

async function foo(){
    const db = await gtfs.openDb(config);
    const dt = DateTime.local().setZone('America/New_York')
    const xday = dt.weekdayLong.toLowerCase()
    const ymd = dt.toFormat('yyyyLLdd')

    const routequery = `select distinct routes.route_short_name, routes.route_long_name, routes.route_color, routes.route_text_color from stops left join stop_times on stops.stop_id = stop_times.stop_id left join trips on stop_times.trip_id = trips.trip_id  left join calendar on calendar.service_id = trips.service_id left join routes on trips.route_id = routes.route_id where ((calendar.${xday}=1 and ${ymd} between calendar.start_date and calendar.end_date and not exists(select * from calendar_dates where calendar_dates.service_id = calendar.service_id and calendar_dates.exception_type = 2)) or exists (select * from calendar_dates where calendar_dates.service_id = calendar.service_id and calendar_dates.exception_type = 1 and date = ${ymd}));`

    const shortRoutequery = `select routes.route_short_name, routes.route_long_name, routes.route_color, routes.route_text_color from routes;`

    const query83 = `select distinct stops.*, calendar.* from stops left join stop_times on stops.stop_id = stop_times.stop_id left join trips on stop_times.trip_id = trips.trip_id  left join calendar on calendar.service_id = trips.service_id left join routes on trips.route_id = routes.route_id where routes.route_id = '83' and ((calendar.${xday}=1 and ${ymd} between calendar.start_date and calendar.end_date and not exists(select * from calendar_dates where calendar_dates.service_id = calendar.service_id and calendar_dates.exception_type = 2)) or exists (select * from calendar_dates where calendar_dates.service_id = calendar.service_id and calendar_dates.exception_type = 1 and date = ${ymd}));`

    const query83dests = `select distinct deststops.*, calendar.* from stops left join stop_times on stops.stop_id = stop_times.stop_id left join trips on stop_times.trip_id = trips.trip_id left join stop_times as desttimes on desttimes.trip_id = trips.trip_id and stop_times.stop_sequence < desttimes.stop_sequence left join stops as deststops on desttimes.stop_id = deststops.stop_id left join calendar on calendar.service_id = trips.service_id left join routes on trips.route_id = routes.route_id where routes.route_id = '83' and stops.stop_id = '2621' and ((calendar.${xday}=1 and ${ymd} between calendar.start_date and calendar.end_date and not exists(select * from calendar_dates where calendar_dates.service_id = calendar.service_id and calendar_dates.exception_type = 2)) or exists (select * from calendar_dates where calendar_dates.service_id = calendar.service_id and calendar_dates.exception_type = 1 and date = ${ymd}));`

    const query83deparch = `select distinct stop_times.departure_time,stop_times.departure_timestamp, stops.stop_id, stops.stop_code, stops.stop_name, stops.stop_desc, deststops.stop_id, deststops.stop_code, deststops.stop_name, deststops.stop_desc, routes.route_short_name, routes.route_long_name, routes.route_color, routes.route_text_color, ${ymd} as date from stops left join stop_times on stops.stop_id = stop_times.stop_id left join trips on stop_times.trip_id = trips.trip_id left join stop_times as desttimes on desttimes.trip_id = trips.trip_id and stop_times.stop_sequence < desttimes.stop_sequence left join stops as deststops on desttimes.stop_id = deststops.stop_id left join calendar on calendar.service_id = trips.service_id left join routes on trips.route_id = routes.route_id where routes.route_id = '83' and stops.stop_id = '2621' and deststops.stop_id = '2463' and ((calendar.${xday}=1 and ${ymd} between calendar.start_date and calendar.end_date and not exists(select * from calendar_dates where calendar_dates.service_id = calendar.service_id and calendar_dates.exception_type = 2)) or exists (select * from calendar_dates where calendar_dates.service_id = calendar.service_id and calendar_dates.exception_type = 1 and date = ${ymd}));`

    // const stops = await db.query(query83)
    const stops = await db.query(query83deparch)
    console.log(stops.rows);
    await db.end()
}

foo()

// test()


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

