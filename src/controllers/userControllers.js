// require user model
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');


const validateRegister = (req,res,next) => {

    req.sanitizeBody('name');
  //req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'That Email is not valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
  //req.checkBody('password-confirm', 'Confirmed Password cannot be blank!').notEmpty();
  //req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('register', { title: 'Register', body: req.body, flashes: req.flash() });
    return; // stop the fn from running
  }
  next(); // there were no errors!

}

const registerUser = async (req,res,next) => {

  const user = new User({ email: req.body.email, name: req.body.name, surname: req.body.surname, role: req.body.role, title: req.body.title  });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  
  return res.status(200).json({
    success:true,
    data: user
})

  next(); // pass to authController.login
    
};






const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(); // carry on! They are logged in!
    return;
  }
  res.redirect('/login');
  };

const loginUser = 

 passport.authenticate('local', {
        failureRedirect:'/login-fail',
        failureFlash: 'Login failed',
        successRedirect:'/login-success',
        successFlash:'Logged in'
        
    }) 
   






const logoutUser = (req, res) => {
    req.logout();
    req.flash('success', 'You are now logged out! 👋');
    res.redirect('/');
  };

  const addPhotoId = async (req,res,next) => {
 
   
   /* console.log( Object.keys(req.body)[0]); */
    const id = req.params.id;
   const photoId = Object.keys(req.body)[0];

    
    
  
    const user = await User.findById(id)
  
    //console.log(user)
  
    user.photoId = photoId
  
    user.save();
  
    console.log(user.photoId)
    
    
    
    res.status(200).json({
      success: true,
      data: user.photoId,
    });
  };


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    validateRegister,
    isLoggedIn,
    addPhotoId

    
}