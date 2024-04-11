const registration = require('../models').registration;
//const { hashSync, compareSync } = require('bcrypt');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
    passport.use("local", new localStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, (req, email, password, done) => {
        const user = registration.findOne({ raw: true, where: { email: email } }).then((user) => {
            if (user == null) {
                return done(null, false);
            } else if (password === user.password) {
                return done(null, user)
            } else {
                return done(null, false);
            }

        })
    }))
    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        const fetchuser = (id) => registration.findByPk(id);
        fetchuser(id).then((user) => {
            return done(null, user);
        })
    });
};