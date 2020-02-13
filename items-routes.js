const express = require('express');
const ExpressError = require('./errors');
const router = new express.Router();

let items = require('./fakeDb');

/** Routes for items */

router.get('/', function (req, res) {
  // Should render list of shopping items
  return res.json(items);
});

router.post('/', function (req, res) {
  // Should accept JSON data and add it to the shopping list.
  items.push(req.body);
  return res.json({
    added: items
  });
});

router.get('/:name', function (req, res) {

  // Display a single item’s name and price.
  return res.json(res.locals.item);

});

router.patch('/:name', function (req, res) {
  // Modify a single item’s name and/or price.
  if (req.body.name) {
    item.name = req.locals.item.name
  };
  if (req.body.price) {
    item.price = req.locals.item.price
  };
  return res.json({
    updated: item
  });
});

router.delete('/:name', function (req, res) {
  // Delete a specific item from the array.
      items.splice(res.locals.idx, 1);
      return res.json({
        message: "Deleted"
      });
});


module.exports = router;