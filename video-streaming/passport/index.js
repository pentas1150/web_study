const local = require('./localStrategy');
const User = require('../schemas/user');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.userid);
    });

    passport.deserializeUser(async(id, done) => {
        try {
            const user = await User.find({ userid: id });
            done(null, user);
        } catch(err) {
            done(err);
        }
    });

    local(passport);
}