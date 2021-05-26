var express = require("express");
var mongoose = require("mongoose");
const Products = require("../../model/product");
var router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, "public-images");
    } else {
      cb(new Error("not image"), null);
    }
  },
  filename: function (req, file, cb) {
    cb(null, "myImage_" + Date.now() + ".jpg");
  },
});
//
const upload = multer({ storage, limits: { fileSize: 2000000 } });

router.get("/", async function (req, res, next) {
  if (req.query.filter) {
    const queryReq = JSON.parse(req.query.filter);
    let query = {};
    if (queryReq.where.salePrice) {
      query.salePrice = queryReq.where.salePrice;
    }
    await Products.find(query, function (err, docs) {
      if (err) return res.json(err);
      if (docs.length > 0) {
        res.send({
          message: "success get products",
          response: docs,
          totalLength: docs.length,
        });
      } else {
        res.send({
          message: "not found",
        });
      }
    }).limit(parseInt(req.query.limit));
  } else {
    await Products.find({}, function (err, docs) {
      if (err) return res.json(err);
      if (docs.length > 0) {
        res.send({
          message: "success get all products",
          response: docs,
          totalLength: docs.length,
        });
      } else {
        res.send({
          message: "not found",
        });
      }
    });
  }
});
router.get("/:id", async function (req, res, next) {
  try {
    const getOneProduct = await Products.find({ _id: req.params.id });
    res.send({
      message: "success get product",
      response: getOneProduct,
    });
  } catch (error) {
    res.send({
      error,
    });
  }
});
router.post("/add", async function (req, res, next) {
  try {
    const data = req.body.params;
    const addValues = {
      _id: mongoose.Types.ObjectId(),
      name: data.name,
      // image: data.image,
      // thumbnail: data.thumbnail,
      shortDescription: data.shortDescription,
      categoryId: data.categoryId,
      salePrice: data.salePrice,
      originalPrice: data.originalPrice,
      // images: data.images,
      // thumbnails: data.thumbnails,
    };
    await Products.create(addValues);
    res.send({ message: "Add successful product" });
  } catch (error) {
    res.send({ error });
  }
});

router.patch("/update", async function (req, res, next) {
  try {
    const data = req.body.params;
    const addValues = {
      name: data.name,
      // image: data.image,
      // thumbnail: data.thumbnail,
      shortDescription: data.shortDescription,
      categoryId: data.categoryId,
      salePrice: data.salePrice,
      originalPrice: data.originalPrice,
      // images: data.images,
      // thumbnails: data.thumbnails,
    };
    await Products.updateOne({ _id: req.body.params._id }, { $set: addValues });
    res.send({ message: "update successful" });
  } catch (error) {
    return res.json(error);
  }
});

router.post(
  "/uploadImage",
  upload.single("my-avatar"),
  async function (req, res, next) {
    const product = req.body;
    const file = req.file;
    const { filename, path: filePath } = file;
    const fs = require("fs");
    fs.copyFileSync(filePath, `public-images/${filename}`);
    if (!file) {
      const error = new Error("Please upload a File");
      error.httpStatusCode = 400;
      return next(error);
    }
    await Products.updateOne(
      { _id: product.id },
      {
        image: `http://${req.headers.host}/images/${req.file.filename}`,
      }
    )
      .then(() => {
        res.send({
          msg: "File uploaded",
          file: `http://${req.headers.host}/images/${req.file.filename}`,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }
);

module.exports = router;
