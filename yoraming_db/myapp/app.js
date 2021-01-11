var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var dbRouter = require("./routes/dbRouter");

//내가 추가한거
const helmet = require("helmet");
const compression = require("compression");
const bodyParser = require("body-parser");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//내가 추가한거
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 파일을 찾을 때 서버에서 찾아야하는데 그 서버 기본 시작 지점이 public 폴더가 됨.
app.use(express.static(path.join(__dirname, "public")));

app.get("/img", (req, res) => {
  res.sendFile(__dirname + "/test.html");
});
app.use("/", indexRouter);
app.use("/db", dbRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
