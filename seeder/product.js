const fs = require('fs');
var mongoose = require('mongoose');
const Product = require('../model/product');

const getProductData = JSON.parse(fs.readFileSync('./mock-data/product.json', 'utf8'));

async function createProduct(categories) {
  const getData = getProductData.body;
  // getData.forEach((element) => {
  //   const getID = categories
  //     .filter((ele) => ele.name === element.categoryId)
  //     .map((item) => item._id);
  //   const addValues = {
  //     _id: mongoose.Types.ObjectId(),
  //     name: element.name,
  //     image: element.image,
  //     thumbnail: element.thumbnail,
  //     shortDescription: element.shortDescription,
  //     categoryId: getID[0],
  //     salePrice: element.salePrice,
  //     originalPrice: element.originalPrice,
  //     images: element.images,
  //     thumbnails: element.thumbnails,
  //   };
  //   console.log(addValues);
  //   return Product.create(addValues);
  // });
  for (const element of getData) {
    const getID = categories
      .filter((ele) => ele.name === element.categoryId)
      .map((item) => item._id);
    const addValues = {
      _id: mongoose.Types.ObjectId(),
      name: element.name,
      image: element.image,
      thumbnail: element.thumbnail,
      shortDescription: element.shortDescription,
      categoryId: getID[0],
      salePrice: element.salePrice,
      originalPrice: element.originalPrice,
      images: element.images,
      thumbnails: element.thumbnails,
    };
    Product.create(addValues);
  }
}
module.exports = { createProduct };
