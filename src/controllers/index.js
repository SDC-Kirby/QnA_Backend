const { pool } = require('../../db/index');

exports.getAll = (req, res) => {
  // db.getClient((err => console.log(err)));
  const product = req.params.product_id;
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
      ) AS answers FROM answers WHERE questions.question_id = answers.question_id AND answers.reported = 'f')
      FROM questions where questions.product_id = 888999 AND questions.reported = 'f') questions
    )) object`, [ product ])
    .then((response) => {
      // console.log(response.rows[0].object);
      res.status(200).send(response.rows[0].object.results);
    }).catch((err) => {
      console.log(err.message);
    });
};
