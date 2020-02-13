const express = require('express');
const router = new express.Router();

let items = require('./fakeDb');

const {
  isValidItem,
  checkItemExists,
  isValidPatch
} = require('./middleware');

/** Routes for items */

router.get('/', function (req, res) {
  // Should render list of shopping items
  return res.json(items);
});

router.post('/', isValidItem, function (req, res) {
  // Should accept JSON data and add it to the shopping list.
  items.push(req.body);
  return res.json({
    added: items
  });
});

router.get('/:name', checkItemExists, function (req, res) {

  // Display a single item’s name and price.
  return res.json(res.locals.item);

});

router.patch('/:name', checkItemExists, isValidPatch, function (req, res) {
  // Modify a single item’s name and/or price.
  let item = items[res.locals.idx];
  if (req.body.name) {
    item.name = req.body.name
    console.log("ITEM NAME", item.name);
    console.log("RESPONSE.LOCALS.NAME", item.name);
  };
  if (req.body.price) {
    item.price = req.body.price;
  };
  items[res.locals.idx] = item;
  return res.json({
    updated: item
  });
});

router.delete('/:name', checkItemExists, function (req, res) {
  // Delete a specific item from the array.
  items.splice(res.locals.idx, 1);
  return res.json({
    message: "Deleted"
  });
});


module.exports = router;