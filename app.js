const express = require('express');
const config = require('./config');
const app = express();
const productRouter = require('./routes/product');

app.use('/product', productRouter);
app.use(express.static('./'));
app.listen(config.port, function () {
  console.log(`app runing in ${config.port}`);
});
