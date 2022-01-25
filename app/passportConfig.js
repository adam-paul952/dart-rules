const User = require("./models/user.model");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findUserByUsername(username, async (err, user) => {
        if (err) {
          return done(err, null);
        }
        const passwordCompared = await bcrypt.compare(password, user.password);
        if (!passwordCompared) {
          return done({ kind: `incorrect_password` }, null);
        } else {
          return done(null, user);
        }
      });
    })
  );
  passport.serializeUser((user, cb) => {
    cb(null, { username: user.username, uuid: user.uuid });
  });
  passport.deserializeUser((user, cb) => {
    User.findUserByUsername(user.username, (err, user) => {
      const userInformation = user.uuid;
      if (err) {
        return cb(err);
      }
      cb(null, userInformation);
    });
  });
};
