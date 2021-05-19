const fs = require('fs');
var mongoose = require('mongoose');
const Category = require('../model/category');

const getCategoryData = JSON.parse(fs.readFileSync('./mock-data/categories.json', 'utf8'));

async function createCategory() {
  const getData = getCategoryData.body;
  // getData.forEach((element) => {
  //   const addValues = {
  //     _id: mongoose.Types.ObjectId(),
  //     name: element.name,
  //     descriptions: element.description,
  //   };
  //   return Category.create(addValues);
  // });
  const tasks = getData.map(async (element) => {
    const addValues = {
      _id: mongoose.Types.ObjectId(),
      name: element.name,
      descriptions: element.description,
    };
    await Category.create(addValues);
    return addValues;
  });

  const results = await Promise.all(tasks);

  return results;
}
module.exports = { createCategory };
