const express = require('express');

const router = express.Router();
router.get('/', (req, res, next) => res.status(200).json({ message: 'SDC IS FUN!!!' }));
module.exports = router;
