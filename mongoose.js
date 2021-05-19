//mongoose
const mongoose = require('mongoose');
const { createCategory } = require('./seeder/category');
const { createProduct } = require('./seeder/product');
const { createUser } = require('./seeder/user');
const { loadCategory } = require('./test-case/loadCategory');
const { URLdb = 'mongodb://anhnguyen:123@localhost:27017/nordic?authSource=admin' } = process.env;

const mongooseData = mongoose
  .connect(URLdb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connect category');
    // return createCategory();
    return loadCategory();
  })
  .then((categories) => {
    // console.log('categories', categories);
    // return createProduct(categories);
  })
  .then(() => {
    // return createUser();
  })
  .catch((err) => {
    // connect error
    console.log(err);
  });
module.exports = { mongooseData };
