const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const resJson = require('../utils');

// 所有产品列表
router.get('/', function (req, res) {
  let id = req.query.id;
  fs.readFile('./json/product.json', (err, data) => {
    if (err) {
      res.send(err);
    }

    if (id) {
      let jsonData = JSON.parse(data);
      let detail = jsonData.data.find((item) => item.id == id);
      res.send(detail);
      return;
    }
    res.send(data);
  });
});

router.post('/update', urlencodedParser, (req, res) => {
  let body = req.body;
  console.log('prop', body.prop);
  console.log('value', body.value);
  console.log('id', body.id);
  fs.readFile('./json/product.json', (err, data) => {
    if (err) {
      res.send(err);
    }

    if (body.id) {
      let jsonData = JSON.parse(data);
      jsonData.data.forEach((item) => {
        if (item.id == body.id) {
          item[body.prop] = body.value;
        }
      });

      fs.writeFile('./json/product.json', JSON.stringify(jsonData), (err) => {
        if (err) return console.log(err);
        res.send(resJson.resJson('更新成功'));
      });
    }
  });
});

module.exports = router;
