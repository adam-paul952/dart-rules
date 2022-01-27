const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).send({ message: `Unauthorized` });
  }
};

module.exports = checkAuthentication;
