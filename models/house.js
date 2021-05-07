var mongoose = require("mongoose");
const joi = require("@hapi/joi");

var houseSchema = mongoose.Schema({
  demand: String,
  location: String,
  owner: String,
  size: String,
  type: String,
});

var house = mongoose.model("House", houseSchema);

function validateHouse(data) {
  const schema = joi.object({
    demand: joi.string().max(50),
    location: joi.string().max(60).required(),
    owner: joi.string().min(3).max(80),
    size: joi.string().max(80).required(),
    type: joi.string().max(50).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports = house;
module.exports.validate = validateHouse;
