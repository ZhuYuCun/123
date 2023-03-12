const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const resJson = require('../utils');

var multer = require('multer');
var uploading = multer({
  dest: './video/',
  // 设定限制，每次最多上传1个文件，文件大小不超过1MB
  limits: { fileSize: 5000000, files: 1 },
});

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

router.post('/video/:id', uploading.single('file'), (request, response) => {
  let productId = request.params.id;

  var file = request.file;
  let oldPath = file.destination + file.filename;
  let arr = file.originalname.split('.');
  let newName = Date.now() + '.' + file.originalname.split('.')[arr.length - 1];
  let newPath = './video/' + newName;
  fs.rename(oldPath, newPath, function (err) {
    if (err) {
      response.send(resJson.resJson('error'));
      throw err;
    }
    updateProductVideo(productId, newName);
    response.send(resJson.resJson('ok'));
  });
});

function updateProductVideo(productId, newName) {
  fs.readFile('./json/product.json', (err, data) => {
    if (productId) {
      let jsonData = JSON.parse(data);
      jsonData.data.forEach((item) => {
        if (item.id == productId) {
          item.video = newName;
        }
      });

      fs.writeFile('./json/product.json', JSON.stringify(jsonData), (err) => {
        if (err) return console.log(err);
      });
    }
  });
}

module.exports = router;
