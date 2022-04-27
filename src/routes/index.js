const { pool } = require('../../db/index');
const express = require('express');
const { getAll } = require('../controllers/index.js');

const router = express.Router();

router.get('/', (req, res, next) => res.status(200).json({ message: 'SDC IS FUN!!!' }));

router.get('/qa/questions/:product_id/:page/:count', getAll);

router.post('/qa/questions', (req, res) => {
  const product = req.body.product_id;
  const { body, name, email } = req.body;
  // console.log(product, body, Date.now(), name, email);
  pool.query(`INSERT INTO questions (product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES (${product},
  ${body}, ${Date.now()}, ${name}, ${email}, false, ${0})`)
    .then(res.sendStatus(201))
    .catch(err => console.log(err));
});

router.get('/loaderio-bd92bd88f528fda8847c589daa6972a0.txt', (req, res) => {
  res.status(200).send('loaderio-bd92bd88f528fda8847c589daa6972a0');
});

router.put('/qa/questions/:question_id/helpful', (req, res) => {
  pool.query(`UPDATE questions SET helpful = helpful + 1  WHERE question_id = ${req.params.question_id} `)
    .then(res.sendStatus(200))
    .catch(err => console.log(err));
});

router.put('/qa/questions/:question_id/report', (req, res) => {
  pool.query(`UPDATE questions SET reported = true WHERE question_id = ${req.params.question_id}`)
    .then(res.sendStatus(200))
    .catch(err => console.log(err));
});

//
router.post('/qa/questions/:question_id/answers', (req, res) => {
  console.log(req.body);
  const question = req.body.question_id;
  const { body, name, email } = req.body;
  pool.query(`INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES (${question},
    ${body}, ${Date.now()}, ${name}, ${email}, false, 0)`)
    .then(() => {
      res.sendStatus(200);
    }).catch(err => console.log(err));
});

router.get('/qa/questions/:question_id/answers/:page/:count', (req, res) => {
  const question = req.params.question_id;
  const {page, count} = req.params;
  pool.query('SELECT answer_id, body, to_timestamp(date_written), answerer_name, helpful FROM answers WHERE question_id = $1 AND reported != true LIMIT $2', [ question, count ])
    .then((response) => {
    res.status(201).send(response.rows);
  });
});

router.put('/qa/answers/:answer_id/helpful', (req, res) => {
  pool.query(`UPDATE answers SET helpful = helpful + 1 WHERE answer_id = ${req.params.answer_id}`)
    .then(res.sendStatus(200))
    .catch(err => console.log(err));
});

router.put('/qa/answers/:answer_id/report', (req, res) => {
  pool.query(`UPDATE answers SET reported = true WHERE answer_id = ${req.params.answer_id}`)
    .then(res.sendStatus(200))
    .catch(err => console.log(err));
});
module.exports = router;
