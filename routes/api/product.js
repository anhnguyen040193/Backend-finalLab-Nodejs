var express = require('express');
var mongoose = require('mongoose');
const Products = require('../../model/product');
var router = express.Router();

router.get('/', function (req, res, next) {
  const queryReq = JSON.parse(req.query.filter);
  let query = {};
  if (queryReq.where.salePrice) {
    query.salePrice = queryReq.where.salePrice;
  }
  Products.find(query, function (err, docs) {
    if (err) return res.json(err);
    if (docs.length > 0) {
      res.send({
        message: 'success get products',
        response: docs,
        totalLength: docs.length,
      });
    } else {
      res.send({
        message: 'not found',
      });
    }
  }).limit(parseInt(req.query.limit));
});

router.post('/add/', function (req, res, next) {
  const addValues = {
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    // image: req.body.image,
    // thumbnail: req.body.thumbnail,
    shortDescription: req.body.shortDescription,
    categoryId: req.body.categoryId,
    salePrice: req.body.salePrice,
    originalPrice: req.body.originalPrice,
    // images: req.body.images,
    // thumbnails: req.body.thumbnails,
  };
  Products.create(addValues);
  res.redirect(`/admin/products/${addValues._id}`);
});

router.post('/update/', async function (req, res, next) {
  // console.log(req.body);
  // Products.find({ _id: req.body._id }, function (err, docs) {
  //   if (err) return res.json(err);
  //   console.log('docs', docs);
  // });
  const addValues = {
    _id: req.body._id,
    name: req.body.name,
    // image: req.body.image,
    // thumbnail: req.body.thumbnail,
    shortDescription: req.body.shortDescription,
    // categoryId: req.body.categoryId,
    salePrice: req.body.salePrice,
    originalPrice: req.body.originalPrice,
    // images: req.body.images,
    // thumbnails: req.body.thumbnails,
  };
  await Products.updateOne(
    { _id: req.body._id },
    {
      $set: addValues,
    },
    function (err, docs) {
      if (err) return res.json(err);
      res.redirect(`/admin/products/${addValues._id}`);
    }
  );
});

module.exports = router;
