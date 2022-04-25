const { Pool } = require('pg');

const pool = new Pool({
  user: 'michael',
  host: 'localhost',
  database: 'questions_answers',
  password: '',
  port: '5432'
});
pool.connect(err => console.log(err));
module.exports = {
  pool
};

// module.exports = {
//   query: (text, params) => {
//     const start = Date.now();
//     return pool.query(text, params, (err, res) => {
//       const duration = Date.now() - start;
//       console.log('executed query', { text, duration, rows: res.rowCount });
//     });
//   },
//   getClient: (callback) => {
//     pool.connect((err, client, done) => {
//       // console.log('we have errored:', err, 'here is client:', client);
//       const query = client.query;
//       // monkey patch the query method to keep track of the last query executed
//       // eslint-disable-next-line no-param-reassign
//       client.query = (...args) => {
//         // eslint-disable-next-line no-param-reassign
//         client.lastQuery = args;
//         return query.apply(client, args);
//       };
//       // set a timeout of 5 seconds, after which we will log this client's last query
//       const timeout = setTimeout(() => {
//         console.error('A client has been checked out for more than 5 seconds!');
//         console.error(`The last executed query on this client was: ${client.lastQuery}`);
//       }, 5000);
//       const release = (err) => {
//         // call the actual 'done' method, returning this client to the pool
//         done(err);
//         // clear our timeout
//         clearTimeout(timeout);
//         // set the query method back to its old un-monkey-patched version
//         // eslint-disable-next-line no-param-reassign
//         client.query = query;
//       };
//       callback(err, client, release);
//     });
//   }
// };
