CREATE TABLE IF NOT EXISTS questions (
  question_id SERIAL NOT NULL PRIMARY KEY,
  product_id INT,
  body INT,
  date_written TEXT,
  asker_name TEXT,
  asker_email TEXT,
  reported BOOLEAN,
  helpful INT
);

CREATE TABLE IF NOT EXISTS answers (
  answer_id SERIAL NOT NULL PRIMARY KEY,
  question_id INT,
  body INT,
  date_written TEXT,
  answerer_name TEXT,
  answerer_email TEXT,
  reported BOOLEAN,
  helpful INT,
  CONSTRAINT questions
    FOREIGN KEY(question_id)
      REFERENCES questions(question_id);
);

CREATE TABLE IF NOT EXISTS answers_photos (
  photo_id SERIAL NOT NULL PRIMARY KEY,
  answer_id INT,
  url TEXT
  CONSTRAINT answers
    FOREIGN KEY answer_id
      REFERENCES answers(answer_id)
);