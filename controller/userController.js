const bcrypt = require('bcryptjs')
const { forwardAuthenticated } = require('../middleware/authentication');
const passport = require('passport')

//Import user model
const User = require('../models/userModel');


// Handle user registration
const userRegistration = (req, res) => {

    const { firstname, lastname, email, password1, password2 } = req.body;
    let errors = [];

    if (!firstname || !lastname || !email || !password1 || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password1 != password2) {
        errors.push({ msg: 'Passwords do not match!' });
    }

    if (password1.length < 8) {
        errors.push({ msg: 'Password must be at least 8 characters' });
    }
    if (errors.length > 0) {
        res.render('auth/register', {
            errors,
            firstname,
            lastname,
            email,
            password1,
            password2
        });
    }
    else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists. Please try another one' });
                res.render('forms/register', {
                    errors,
                    firstname,
                    lastname,
                    email,
                    password1,
                    password2
                });
            } else {
                const newUser = new User({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password1
                });

                console.log(newUser);

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
};





//Handle user logout
const userLogout = (req,res) =>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
}


module.exports = {
    userRegistration,
   //userLogin,
    userLogout

}