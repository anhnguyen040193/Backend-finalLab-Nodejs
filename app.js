require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/render/index');
// var usersRouter = require('./routes/users');
var usersRouter = require('./routes/api/user');

var productsRouter = require('./routes/api/product');
const { mongooseData } = require('./mongoose');
const Mongoose  = require('mongoose');
const debug = require('debug')('app');

var app = express();
app.log = debug;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public/uploads'));
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.start = (PORT, MONGO_URL) => {
//   return new Promise((resolve, reject) => {
//       Mongoose
//           .connect(
//               MONGO_URL, { useNewUrlParser: true }
//           )
//           .then(() => {
//               debug(MONGO_URL + ' database connect success');
//               console.log(MONGO_URL + ' database connect success');

//               const server = app.listen(PORT, err => {
//                   if (err) {
//                       return reject(err);
//                   }
//                   console.log('App started and listening on port', PORT);
//                   resolve(server);
//               });
//           })
//           .catch(err => {
//               debug('Database connection error:' + err);
//               reject(err);
//           });
//   });
// };
//mongoose
mongooseData;
module.exports = app;
