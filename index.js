const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser')
const path = require('path')

const app = express();


//Database setup
const database = require("./services/dbConnection");
database.connect();

  // Passport Config
require('./middleware/passport')(passport);

  // EJS

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));


 //BodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

//Index route
app.use('/', require('./routes/indexRoute'))
// User route
app.use('/users', require('./routes/userRoute'))

//Job Route
const JobRoute = require('./routes/jobRoute')
app.use(JobRoute);

//Apply Route
const applyRoute = require('./routes/applyRoute');
app.use(applyRoute)


// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));