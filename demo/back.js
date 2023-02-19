const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const resJson = require('./utils');
const bodyParser = require('body-parser');
var dayjs = require('dayjs');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const upload = multer({
  dest: './upload',
});
app.use(upload.any());
var urlencodedParser = bodyParser.urlencoded({ extended: false });
let db = null;
function connectDb() {
  db = new sqlite3.Database('/Users/zhuyucun/Test1.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });
}
// 列表数据查询
async function runAllSql(sql) {
  let resData = null;
  await connectDb();
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      resData = rows;
      db.close();
      resolve(resData);
    });
  });
}

// 获取数据
async function getMaxId() {
  let maxId = 0;
  await connectDb();
  return new Promise((resolve, reject) => {
    let sql = `SELECT MAX(id) from product`;

    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      maxId = rows[0]['MAX(id)'];
      db.close();
      resolve(maxId);
    });
  });
}

// 测试接口
app.get('/test', async function (req, res) {
  // let sql = `SELECT * FROM product`;
  // let resData = await runAllSql(sql);
  let resData = await getMaxId();

  res.send(resJson.resJson(resData));
});

// 查询产品列表
app.get('/list', async function (req, res) {
  let sql = `SELECT p.*, c.url FROM product AS p LEFT JOIN picture AS c ON p.id=c.productId`;
  let resData = await runAllSql(sql);
  let resArr = [];
  resData.forEach((item) => {
    let exist = resArr.find((child) => child.id == item.id);
    if (exist) {
      exist.pictures.push(item.url);
    } else {
      item.pictures = [];
      if (item.url) {
        item.pictures.push(item.url);
        delete item.url;
      }
      resArr.push(item);
    }
  });

  res.send(resJson.resJson(resArr));
});

// 新增产品
app.post('/add', urlencodedParser, async function (req, res) {
  let maxId = await getMaxId();
  console.log('数据', req.body);

  const currect = dayjs().format('YYYY-MM-DD hh:mm:ss');

  let sql = `INSERT INTO product (id, title, cover, describe, sub, sort, popular, updateTime) VALUES ('${maxId + 1}', '${req.body.title}', '${req.body.cover}', '${req.body.describe}', '${
    req.body.sub
  }',  '${req.body.sort}',  '${req.body.popular}', '${currect}')`;

  let resData = await runAllSql(sql);
  res.send(resJson.resJson(resData));
});

// 删除产品
app.delete('/del', async function (req, res) {
  let id = req.query.id;
  let sql = `DELETE FROM product WHERE id=${id}`;
  let resData = await runAllSql(sql);
  console.log('resData', resData);
  res.send(resJson.resJson(resData));
});

// 上传文件
app.post('/upload', async function (req, res) {
  console.log(req.files);
  let id = req.query.id;

  let name = uuidv4() + path.extname(req.files[0].originalname);
  console.log('name', name);

  let oldFile = __dirname + '/upload/' + req.files[0].filename;
  let newFile = __dirname + '/upload/' + name;

  fs.rename(oldFile, newFile, async function (err) {
    if (err) {
      console.log('修改失败', err);
      res.send(resJson.resJson('修改失败'));
    } else {
      let data = await updateCoverById(id, `/upload/${name}`);
      res.send(resJson.resJson(data));
    }
  });
});

async function updateCoverById(id, covrt) {
  let sql = `UPDATE product SET cover='${covrt}' WHERE id=${id}`;
  return new Promise(async (resolve, reject) => {
    let resData = await runAllSql(sql);
    resolve(resData);
  });
}
