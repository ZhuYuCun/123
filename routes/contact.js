const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const resJson = require('../utils');

// 联系我们
router.post('/add', urlencodedParser, (req, res) => {
  let body = req.body;
  console.log('prop', body.email);
  fs.readFile('./json/contact.json', (err, data) => {
    if (err) {
      res.send(err);
    }

    let jsonData = JSON.parse(data);
    console.log(jsonData);
    jsonData.push({
      name: body.name,
      email: body.email,
      phone: body.phone,
      where: body.where,
      maeeage: body.maeeage,
      time: new Date(),
    });

    fs.writeFile('./json/contact.json', JSON.stringify(jsonData), (err) => {
      if (err) return console.log(err);
      res.send(resJson.resJson('添加成功'));
    });
  });
});

router.get('', (req, res) => {
  fs.readFile('./json/contact.json', (err, data) => {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});
module.exports = router;
