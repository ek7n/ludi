const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
//const LocalStrategy = require('passport-local').Strategy;


//passport.use(new LocalStrategy(User.authenticate()));

passport.use(User.createStrategy());


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

