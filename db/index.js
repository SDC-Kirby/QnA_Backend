const { Pool } = require('pg');
// eslint-disable-next-line import/extensions
const config = require('../config.js');

const pool = new Pool({
  user: 'postgres',
  host: '52.12.167.107',
  password: `${config.PGPASS}`,
  database: 'questions_answers',
  port: '5432',
});
pool.connect(err => console.log(err));
module.exports = {
  pool
};
