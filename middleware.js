const ExpressError = require('./errors');

// Check if item we are posting is avlid
function isValidItem(req, res, next) {
  let newItem = req.body;
  let hasName = newItem.name;
  let hasPrice = newItem.price;
  let correctNumProps = Object.keys(newItem).length === 2;

  try {
    if (!hasName || !hasPrice || !correctNumProps) {
      throw new ExpressError("Please input valid item", 400);
    }
    return next();

  } catch {
    return next(err);
  }
}

// Check if item exists 
function checkItemExists(req, res, next) {
  try {
    let idx = 0;
    for (let item of items) {
      if (item.name === req.params.name) {
        res.locals.idx = idx;
        res.locals.item = item;
        return next();
      }
      idx++;
    }

    throw new ExpressError("Please input valid item", 400);
  } catch {
    return next(err)
  }
}

// Check if input is valid for patching
function isValidPatch(req, res, next) {
  let updatedProps = req.body;
  let hasName = updatedProps.name;
  let hasPrice = updatedProps.price;
  let hasNameOrPrice = (hasName || hasPrice)
  let invalidKey = false;

  for (let key in updatedProps) {
    if (key !== "name" || key !== "price") {
      invalidKey = true;
    }
  }

  try {
    if (!hasNameOrPrice || invalidKey) {
      throw new ExpressError("Please input valid update", 400);
    }
    return next();

  } catch {
    return next(err);
  }
}