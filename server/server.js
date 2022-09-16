const express = require('express');
const app = express();
const cors = require("cors");
var path = require('path');
var createError = require('http-errors');
var logger = require('morgan');
const cookieParser = require('cookie-parser');

const authorization = require("./middleware/authorization");

const fileUpload = require('express-fileupload');
app.use(express.static('public'));
app.use(fileUpload());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jsx");
app.engine('jsx', require('express-react-views').createEngine());

var indexRouter = require('./routes/index');
var korisnikRouter = require('./routes/korisnik');
var adminRouter = require('./routes/admin');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/korisnik', korisnikRouter.router);
app.use('/admin', authorization, adminRouter.router);
app.use('/', indexRouter.router);


app.listen(5000, () => {
  console.log("running");
})

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
  // res.status(err.status || 500);
  // res.render('error');
  res.json({ error: err })
});


module.exports = app;