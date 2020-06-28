const User = require('./User');
const jwt = require('../../utils/jwt')
const { cookie } = require('../../config/config')

module.exports = {
    get: {
        login(req, res, next) {
            res.render('users/login.hbs');
        },

        register(req, res, next) {
            res.render('users/register.hbs');
        },

        logout(req,res,next){
            req.user=null;
            res.clearCookie(cookie).redirect('/home');
        }
    },

    post: {
        login(req, res, next) {
            const { email, password } = req.body;

            User.findOne({ email })
                .then((user) => {
                    return Promise.all([
                        user.passwordsMatch(password),
                        user
                    ])

                })
                .then(([passwordMatch, user]) => {
                    if (!passwordMatch) { return next(err) }//TODO Add VALIDATOR

                    const token = jwt.createToken(user);

                    res
                        .status(201)
                        .cookie(cookie, token, { maxAge: 7200000 })
                        .redirect('/home')
                })
                .catch((err) => {
                    console.log(err);
                })
        },

        register(req, res, next) {
            const { email, password, rePassword } = req.body;

            User.create({ email, password }).then((createdUser) => {

                res.redirect('/user/login');
            })
        }
    }

};