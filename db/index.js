const { Pool } = require('pg');
// eslint-disable-next-line import/extensions
const config = require('../config.js');

const pool = new Pool({
  user: 'postgres',
  host: '34.220.148.47',
  password: `${config.PGPASS}`,
  database: 'questions_answers',
  port: '5432',
});
pool.connect(err => console.log(err));
module.exports = {
  pool
};
