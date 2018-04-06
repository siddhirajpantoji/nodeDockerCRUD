const http = require('http');
const app = require('./app');
const utils = require('./api/utils/utils')

const port =  8080;
const server = http.createServer(app);
server.listen(port)

utils.createTable()
console.log("Server Started ");