var express = require("express");
const Category = require("../../model/category");
var router = express.Router();

router.get("/", async function (req, res, next) {
  const category = await Category.find({});
  res.send({
    message: "success get all category",
    respone: category,
    length: category.length,
  });
});

module.exports = router;
