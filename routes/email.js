const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const resJson = require('../utils');

// 添加email
router.post('/add', urlencodedParser, (req, res) => {
  let body = req.body;
  console.log('prop', body.email);
  fs.readFile('./json/emial.json', (err, data) => {
    if (err) {
      res.send(err);
    }

    let jsonData = JSON.parse(data);
    jsonData.push(body.email);

    fs.writeFile('./json/emial.json', JSON.stringify(jsonData), (err) => {
      if (err) return console.log(err);
      res.send(resJson.resJson('添加成功'));
    });
  });
});

router.get('', (req, res) => {
  fs.readFile('./json/emial.json', (err, data) => {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});

module.exports = router;
