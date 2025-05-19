// See https://github.com/typicode/json-server#module
const cors = require('cors');
const jsonServer = require('json-server')
const auth = require("json-server-auth");
const db = require("./db.json");

// 建立 JSON Server 伺服器
const server = jsonServer.create()

// 載入資料庫
const router = jsonServer.router(db);

//預設中介軟體（例如靜態檔案支援、日誌）
const middlewares = jsonServer.defaults();

// 啟用 CORS
server.use(cors());

// 允許 JSON POST body
server.use(jsonServer.bodyParser);

// 應用 json-server 預設中介軟體
server.use(middlewares)

//重要！將 router.db 暴露給 auth 使用
server.db = router.db;


//應用 json-server-auth
server.use(auth);

//應用 json-server 路由
server.use(router)



//原先設定
// server.listen(3000, () => {
//   console.log('JSON Server is running')
// })

//啟動伺服器，改為使用環境變數 PORT 
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

// Export the Server API
module.exports = server
