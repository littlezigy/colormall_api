const app = require('../app');
const http = require('https');

const port = process.env.PORT || 3001;
app.set("port", port);

let server = http.createServer(app);
server.listen(port);