var localStrategy = require('passport-local').Strategy;
var User = require('./models/userModel');


module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user)
    });
    passport.deserializeUser(function (user, done) {
        done(null, user)
    });

    passport.use(new localStrategy(function (username, password, done) {
        User.findOne({
            username: username
        }, function (err, doc) {
            if (err) {
                done(err)
            } else {
                if (doc) {
                    var valid = doc.comparePassword(password, doc.password);
                    if (valid) {
                        done(null, {
                            username: doc.username,
                            id: doc._id,
                            role: doc.role
                        })
                    } else {
                        done(null, false)
                    }
                } else {
                    done(null, false)
                }
            }
        })
    }))
};