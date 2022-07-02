const express = require('express');
const axios = require('axios');
const app = express();

// app.use(express.static(__dirname + '/public'));
// app.set('view engine', 'pug');

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

const get = async ({ rid, day }) => {
  let result = await axios.get(
    `http://api.bilibili.com/x/web-interface/ranking/region?rid=${rid}&day=${day}`
  );
  return result.data.data;
};

app.get('/', async (req, res) => {
  let { rid, day } = req.query;
  let result = await get({ rid, day });
  res.json(result);
});

app.listen(7777, () => {
  console.log('server listening on port 7777');
});
