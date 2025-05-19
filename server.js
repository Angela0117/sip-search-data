// See https://github.com/typicode/json-server#module
const cors = require('cors');
const jsonServer = require('json-server')
const auth = require("json-server-auth");
const db = require("./db.json");

const server = jsonServer.create()
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

// 啟用 CORS
server.use(cors());
// 應用 json-server 預設中介軟體
server.use(middlewares)
//移除 server.db = router.db;：讓 router 自行管理 db.json，避免衝突。
//server.db = router.db;

//新加入
server.use(jsonServer.bodyParser);

//應用 json-server 路由
server.use(router)
//應用 json-server-auth（必須在 router 之後）
server.use(auth);


//原先設定
server.listen(3000, () => {
  console.log('JSON Server is running')
})

//改為使用環境變數 PORT 0519
// const port = process.env.PORT || 3000;
// server.listen(port, () => {
//   console.log(`JSON Server is running on port ${port}`);
// });

// Export the Server API
module.exports = server
