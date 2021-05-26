var express = require("express");
const mongoose = require("mongoose");
const User = require("../../model/user");
var router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, "public/uploads");
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
/* GET users listing. */

router.get("/", function (req, res, next) {
  // User.find({}, function (err, docs) {
  //   console.log(docs);
  //   if (err) return res.json(err);
  //   res.send({
  //     message: 'success get all list users',
  //     response: docs,
  //     totalLength: docs.length,
  //   });
  // });
  User.find({})
    .limit(20)
    .then((users) => {
      res.send({
        message: "success get all list users",
        response: users,
        totalLength: users.length,
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/", function (req, res, next) {
  if (!res.status(200)) return;
  const addUsers = {
    _id: mongoose.Types.ObjectId(),
    ...req.body,
  };
  User.create(addUsers);
  res.send({ message: "success create user" });
});

router.get("/:id", function (req, res, next) {
  User.find({ _id: req.body._id }, function (err, docs) {
    if (err) return res.json(err);
    res.send({
      message: "success get user",
      response: docs,
      totalLength: docs.length,
    });
  });
});

router.patch("/:id", function (req, res, next) {
  User.find({ _id: req.body._id }, function (err, docs) {
    if (err) return res.json(err);
    const newDoc = docs.map((item) => {
      return {
        _id: item._id,
        avatar:
          req.body.avatar === undefined || req.body.avatar === null
            ? item.avatar
            : req.body.avatar.trim() === ""
            ? item.avatar
            : req.body.avatar.trim(),
        firstName:
          req.body.firstName === undefined || req.body.firstName === null
            ? item.firstName
            : req.body.firstName.trim() === ""
            ? item.firstName
            : req.body.firstName.trim(),
        lastName:
          req.body.lastName === undefined || req.body.lastName === null
            ? item.lastName
            : req.body.lastName.trim() === ""
            ? item.lastName
            : req.body.lastName.trim(),

        dob:
          req.body.dob === undefined || req.body.dob === null
            ? item.dob
            : req.body.dob.trim() === ""
            ? item.dob
            : req.body.dob.trim(),
        gender:
          req.body.gender === undefined || req.body.gender === null
            ? item.gender
            : req.body.gender.trim() === ""
            ? item.gender
            : req.body.gender.trim(),
        email:
          req.body.email === undefined || req.body.email === null
            ? item.email
            : req.body.email.trim() === ""
            ? item.email
            : req.body.email.trim(),
        isEmailValidate:
          req.body.isEmailValidate === undefined ||
          req.body.isEmailValidate === null
            ? item.isEmailValidate
            : req.body.isEmailValidate.trim() === ""
            ? item.isEmailValidate
            : req.body.isEmailValidate.trim(),
        roles:
          req.body.roles === undefined || req.body.roles === null
            ? item.roles
            : req.body.roles[0].trim() === ""
            ? item.roles
            : req.body.roles,
        username:
          req.body.username === undefined || req.body.username === null
            ? item.username
            : req.body.username.trim() === ""
            ? item.username
            : req.body.username.trim(),

        zipcode:
          req.body.zipcode === undefined || req.body.zipcode === null
            ? item.zipcode
            : req.body.zipcode.trim() === ""
            ? item.zipcode
            : req.body.zipcode.trim(),
        phoneNumber:
          req.body.phoneNumber === undefined || req.body.phoneNumber === null
            ? item.phoneNumber
            : req.body.phoneNumber.trim() === ""
            ? item.phoneNumber
            : req.body.phoneNumber.trim(),
        country:
          req.body.country === undefined || req.body.country === null
            ? item.country
            : req.body.country.trim() === ""
            ? item.country
            : req.body.country.trim(),
      };
    });
    User.updateOne(
      { _id: req.body._id },
      {
        $set: newDoc[0],
      },
      function (err, docs) {
        if (err) return res.json(err);
        res.send({ message: "update success user", response: docs });
      }
    );
  });
});

router.put("/:id", function (req, res, next) {
  try {
    User.replaceOne(
      { _id: req.body._id },
      { firstName: req.body.firstName },
      function (err, docs) {
        if (err) return res.json(err);
        res.send({ message: "replace success user", response: docs });
      }
    );
  } catch (error) {
    res.send({ message: "replace failed", response: error });
  }
});

router.delete("/:id", function (req, res, next) {
  try {
    User.deleteOne({ _id: req.body._id }, function (err, docs) {
      if (err) return res.json(err);
      res.send({ message: "delete success user", response: docs });
    });
  } catch (error) {
    res.send({ message: "delete failed", response: error });
  }
});

router.post(
  "/uploadImage",
  upload.single("my-avatar"),
  function (req, res, next) {
    console.log(req.body.id);
    const file = req.file;
    const { filename, path: filePath } = file;
    const fs = require("fs");
    fs.copyFileSync(filePath, `public-images/${filename}`);
    if (!file) {
      const error = new Error("Please upload a File");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send({ msg: "File uploaded", file: `/images/${req.file.filename}` });
  }
);
module.exports = router;
