const LoggerJS = (req, res, next) => {
  console.log("From logger!");
  next();
};

module.exports = LoggerJS;
