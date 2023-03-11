const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const resJson = require('../utils');

router.post('/login', urlencodedParser, (req, res) => {
  fs.readFile('./json/user.json', (err, data) => {
    if (err) {
      res.send(err);
    }
    let resData = JSON.parse(data);
    console.log('resData:::', resData[0].userName);

    if (req.body.userName == resData[0].userName && req.body.password == resData[0].password) {
      res.send(resJson.resJson('ok'));
    } else {
      res.send(resJson.resJson('error'));
    }
  });
});

module.exports = router;
