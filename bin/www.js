const app = require('../app');
const http = require('http');

const port = process.env.PORT || 3001;
app.set("port", port);

let httpserver = http.createServer(app);
httpserver.listen(port);
httpserver.timeout = 500000;