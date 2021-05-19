const Category = require('../model/category');

module.exports = {
  loadCategory: () => {
    return Category.find({}).then((results) => {
      return results;
    });
  },
};
