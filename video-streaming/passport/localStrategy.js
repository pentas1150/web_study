const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../schemas/user');

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pw',
    }, async(id, pw, done) => {
        try {
            const exUser = await User.findOne({ userid: id });
            if(exUser) {
                const result = await bcrypt.compare(pw, exUser.userpw);
                if(result) {
                    console.log('비교결과 비번 맞음.');
                    done(null, exUser);
                } else {
                    console.log('비교결과 비번 틀림.');
                    done(null, false);
                }
            } else {
                console.log('비교결과 없는 유저임.');
                done(null, false);
            }
        } catch(err) {
            console.error(err);
            done(err);
        }
    }));
};