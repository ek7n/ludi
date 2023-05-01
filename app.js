const express = require("express");
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const routes = require("./src/routes/index");
const flash = require("connect-flash");
const passport = require("passport");
const promisify = require("es6-promisify");
require("./connection");
const cookieParser = require("cookie-parser");
const customErrorHandlers = require("./src/middlewares/errors/customErrorHandlers");
require("./src/handlers/passport.js");
const expressValidator = require("express-validator");
const helmet = require("helmet");

const compression = require("compression");
const app = express();
app.use(cors(
  {
    origin: /* process.env.ORIGIN_DOMAIN */ /* 'https://www.ludi.care' */ "http://localhost:8080",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: true,
    optionsSuccessStatus: 200,
    credentials:true
  }));

app.use(helmet()); 
app.use(expressValidator()); 
app.use(
  compression({
    level: 6,
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(flash());
app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_LOCAL,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/uploads", express.static("uploads"));
app.use((req, res, next) => {
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});
app.use("/", routes);
app.use(customErrorHandlers);

module.exports = app;
