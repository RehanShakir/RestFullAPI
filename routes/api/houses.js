const express = require("express");
let router = express.Router();
const validateHouse = require("../../middlewares/validateProduct");
var House = require("../../models/house");

//get houses
router.get("/", async (req, res) => {
  let houses = await House.find();
  return res.send(houses);
});
//get a single houses
router.get("/:id", async (req, res) => {
  try {
    let house = await House.findById(req.params.id);
    if (!house)
      return res
        .status(400)
        .send("Product With Given Id Not Found In Database");
    return res.send(house);
  } catch (err) {
    return res.status(400).send("Invalid Id");
  }
});

//update a house details
router.put("/:id", validateHouse, async (req, res) => {
  let house = await House.findById(req.params.id);
  house.demand = req.body.demand;
  house.location = req.body.location;
  house.owner = req.body.owner;
  house.size = req.body.size;
  house.type = req.body.type;

  await house.save();
  return res.send(house);
});

//To detele a Record
router.delete("/:id", async (req, res) => {
  let house = await House.findByIdAndDelete(req.params.id);
  return res.send(house);
});

//To add a New Record
router.post("/", validateHouse, async (req, res) => {
  let house = new House();
  house.demand = req.body.demand;
  house.location = req.body.location;
  house.owner = req.body.owner;
  house.size = req.body.size;
  house.type = req.body.type;

  await house.save();
  return res.send(house);
});
module.exports = router;
