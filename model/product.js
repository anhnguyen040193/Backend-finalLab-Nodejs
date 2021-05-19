const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const productSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, require: true },
  image: String,
  thumbnail: String,
  shortDescription: String,
  categoryId: { type: SchemaTypes.String, ref: 'Category' },
  salePrice: Number,
  originalPrice: SchemaTypes.Number,
  images: [SchemaTypes.String],
  thumbnails: [SchemaTypes.String],
});

productSchema.virtual('saleOff').get(function () {
  return this.originalPrice ? (this.originalPrice - this.salePrice) / this.originalPrice : 0;
});

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
