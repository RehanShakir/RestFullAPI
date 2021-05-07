const { validate } = require("../models/house");

function validateHouse(req, res, next) {
  let { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}

module.exports = validateHouse;
