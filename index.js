const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();
//use morgan development version that will log sufficient information
app.use(morgan('dev'));
//implement bodyParse that is a middleware to parse the body of the message and populates the req.body property
app.use(bodyParser.json());

// mounting the router, any request from /dishes endpoint will be handled by dishRouter
app.use('/dishes', dishRouter); 
app.use('/dishes/:dishId', dishRouter);
app.use('/promotions', promoRouter); 
app.use('/promotions/:promoId', promoRouter);
app.use('/leaders', leaderRouter); 
app.use('/leaders/:leaderId', leaderRouter);

//tells express to serve up the static files from specified directory
app.use(express.static(__dirname + '/public'));

//default endpoint and render endpoint message if not found any endpoints that give response
app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

//Creates server
const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});