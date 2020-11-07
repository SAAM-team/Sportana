'use strict';
const express = require('express');
const adminCollection = require('../models/users/admin-collection');
const router = express.Router();

// Note add cli here for admin
// Routes
router.get('/buyers', getBuyers);
router.get('/buyers/:page', getBuyers);
router.get('/sellers', getSellers);
router.get('/sellers/:page', getSellers);
router.post('/toggle/:id', activateUser);

// Functions
async function getBuyers(req, res, next) {
  let pageNumber = req.params.page;
  let users;
  if (pageNumber) {
    users = await adminCollection.getBuyers(pageNumber);
  } else {
    pageNumber = 0;
    users = await adminCollection.getBuyers();
  }
  console.log(users);
  res.status(200);
  res.json({
    pageNumber: pageNumber + 1,
    count: users.length,
    result: users,
  });
}
async function getSellers(req, res, next) {
  let pageNumber = req.params.page;
  let users;
  if (pageNumber) {
    users = await adminCollection.getSellers(pageNumber);
  } else {
    pageNumber = 0;
    users = await adminCollection.getSellers();
  }
  res.status(200);
  res.json({
    pageNumber: pageNumber + 1,
    count: users.length,
    result: users,
  });
}

async function activateUser(req, res, next) {
  let userId = req.params.id;
  let activeUser = await adminCollection.toggleUser(userId);
  res.status(200);
  res.json({
    message: `This user now is ${
      activeUser.is_activated ? 'Activated' : 'Deactivated'
    }`,
    user: activeUser,
  });
}
module.exports = router;
