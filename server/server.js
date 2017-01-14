const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { join } = require('path');
const PATHS = {
  build: join(__dirname, '../public'),
  indexHTML: join(__dirname, '../index.html')
}
const app = express();

if (process.env.NODE_ENV !== 'production')
  require('dotenv').load();

// Initiate socket.io server
const server = require('http').createServer(app)  // for hook-in to socket.io
const io = require('socket.io')(server)  // socket.io hooked-in
io.on('connection', (socket) => {
  console.log('socket connected')
});

// logging middleware
app.use(morgan('dev'));
app.use('/public', express.static(PATHS.build));
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

// request any page and receive index.html
app.use('/api', require('./routes'));
app.get('/*', (req, res) => res.sendFile(PATHS.indexHTML));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// server listening!
server.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on port', 3000);
});
