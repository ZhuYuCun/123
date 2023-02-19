const express = require('express');
const productRouter = express.Router();
const fs = require('fs');

productRouter.get('/', function (req, res) {
  console.log(req.query.id);
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

module.exports = productRouter;
