const { pool } = require('../../db/index');
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => res.status(200).json({ message: 'SDC IS FUN!!!' }));

router.get('/qa/questions/:product_id/:page/:count', (req, res) => {
  // db.getClient((err => console.log(err)));
  const product = req.params.product_id;
  const {page, count} = req.params;
  console.log(product, page, count);
  pool.query(
    `SELECT json_build_object(
      'results', (SELECT json_agg(row_to_json(questions))q FROM ( SELECT question_id AS id, body AS question_body, helpful AS question_helpfulness,
      (SELECT json_object_agg(
              answers.answer_id, json_build_object(
                'id', answers.answer_id,
                'body', answers.body,
                'answerer_name', answers.answerer_name,
                'helpfulness', answers.helpful,
                'photos', (SELECT array_agg(row_to_json(answers_photos))photos
                FROM (SELECT url FROM answers_photos WHERE answer_id = answers.answer_id) answers_photos)
              )
      ) AS answers FROM answers WHERE questions.question_id = answers.question_id)
      FROM questions where questions.product_id = $1) questions
    )) object`, [ product ])
    .then((response) => {
      // console.log(response.rows[0].object);
      res.status(200).send(response.rows[0].object.results);
    }).catch((err) => {
      console.log(err.message);
    });
});

router.post('/qa/questions', (req, res) => {
  const product = req.body.product_id;
  const { body, name, email } = req.body;
  // console.log(product, body, Date.now(), name, email);
  pool.query(`INSERT INTO questions (product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES (${product},
  ${body}, ${Date.now()}, ${name}, ${email}, false, ${0})`)
    .then(res.sendStatus(201))
    .catch(err => console.log(err));
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
