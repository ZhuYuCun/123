const express = require('express');
const config = require('./config');
const app = express();
const productRouter = require('./routes/product');
const emailRouter = require('./routes/email');
const contactRouter = require('./routes/contact');
const userRouter = require('./routes/user');

app.use('/product', productRouter);
app.use('/email', emailRouter);
app.use('/contact', contactRouter);
app.use('/user', userRouter);

app.use(express.static('./'));
app.listen(config.port, function () {
  console.log(`app runing in ${config.port}`);
});
