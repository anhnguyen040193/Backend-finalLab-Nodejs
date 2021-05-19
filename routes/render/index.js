const { format } = require('date-fns');
var express = require('express');
var router = express.Router();
const fs = require('fs');
const multer = require('multer');
const Category = require('../../model/category');
const Product = require('../../model/product');
const User = require('../../model/user');

//set storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     if (
//       file.mimetype === 'image/jpg' ||
//       file.mimetype === 'image/jpeg' ||
//       file.mimetype === 'image/png'
//     ) {
//       cb(null, 'public/uploads');
//     } else {
//       cb(new Error('not image'), null);
//     }
//   },
//   filename: function (req, file, cb) {
//     cb(null, 'myImage_' + Date.now() + '.jpg');
//   },
// });
// //
// const upload = multer({ storage, limits: { fileSize: 2000000 } });

const getUserData = JSON.parse(fs.readFileSync('./mock-data/users.json', 'utf8'));
const getProductData = JSON.parse(fs.readFileSync('./mock-data/product.json', 'utf8'));
const getCategoryData = JSON.parse(fs.readFileSync('./mock-data/categories.json', 'utf8'));

router.get('/', function (req, res, next) {
  res.redirect('/admin');
});
/* GET home page. */
router.get('/admin', async function (req, res, next) {
  let totalProduct;
  let totalCategory;
  let totalUser;
  totalCategory = (await Category.find({})).length;
  totalProduct = (await Product.find({})).length;
  totalUser = (await User.find({})).length;
  res.render('index', {
    totalUser,
    totalProduct,
    totalCategory,
  });
});
//Users

router.get('/admin/users', function (req, res, next) {
  const data = getUserData.body;
  const newData = data.map((values) => {
    const dob = format(new Date(values.dob), 'MM/dd/yyyy');
    delete values.dateUpdated;
    const newObj = { ...values, dob };
    return newObj;
  });
  res.render('user', { user: newData });
});

router.get('/admin/products', async function (req, res, next) {
  let data;
  await Product.find({}, function (err, docs) {
    console.log(docs);
    if (err) return res.json(err);
    return (data = docs);
  });
  res.render('product', {
    product: data,
  });
});

router.get('/admin/categories', function (req, res, next) {
  const data = getCategoryData.body;
  res.render('category', { category: data });
});

router.get('/admin/products/:id', async function (req, res, next) {
  let data;
  await Product.find({ _id: req.params.id }, function (err, docs) {
    console.log(docs);
    if (err) return res.json(err);
    return (data = docs);
  });
  res.render('detailPage', {
    detailProduct: data,
  });
});

router.get('/admin/products/v/create', function (req, res, next) {
  const data = getCategoryData.body;
  res.render('createProductPage', { category: data });
});

// router.post('/admin/uploadImage', upload.single('my-avatar'), function (req, res, next) {
//   const file = req.file;
//   if (!file) {
//     const error = new Error('Please upload a File');
//     error.httpStatusCode = 400;
//     return next(error);
//   }
//   res.send({ msg: 'File uploaded', file: `/uploads/${req.file.filename}`})
//   // res.render('index', { msg: 'File uploaded', file: `/uploads/${req.file.filename}` });
// });

module.exports = router;
