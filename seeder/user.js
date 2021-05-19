const fs = require('fs');
var mongoose = require('mongoose');
const User = require('../model/user');

const getUsersData = JSON.parse(fs.readFileSync('./mock-data/users.json', 'utf8'));

function createUser() {
  const getData = getUsersData.body;
  // getData.forEach((element) => {
  //   const addValues = {
  //     _id: mongoose.Types.ObjectId(),
  //     avatar: element.avatar,
  //     firstName: element.firstName,
  //     lastName: element.lastName,
  //     dob: element.dob,
  //     gender: element.gender,
  //     email: element.email,
  //     isEmailValidate: element.emailVerified,
  //     roles: element.role,
  //     username: element.username,
  //     zipcode: element.zipcode,
  //     phoneNumber: element.phoneNumber,
  //     country: element.country,
  //   };
  //   return User.create(addValues);
  // });
  for (const element of getData) {
    const addValues = {
      _id: mongoose.Types.ObjectId(),
      avatar: element.avatar,
      firstName: element.firstName,
      lastName: element.lastName,
      dob: element.dob,
      gender: element.gender,
      email: element.email,
      isEmailValidate: element.emailVerified,
      roles: element.role,
      username: element.username,
      zipcode: element.zipcode,
      phoneNumber: element.phoneNumber,
      country: element.country,
    };
    User.create(addValues);
  }
}
module.exports = { createUser };
