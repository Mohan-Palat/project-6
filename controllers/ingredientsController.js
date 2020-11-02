const router = require('express').Router();
const Ingredient = require('../models/ingredient.js');

// NEW INGREDIENT FORM
router.get('/new', (req, res) => {
  res.render('ingredients/new.ejs');
});

// CREATE A NEW INGREDIENT
router.post('/', async (req, res) => {
    try {
      let newIngredient = await Ingredient.create(req.body);
      res.send(newIngredient);
    } catch (error) {
      res.send(error);
    }
  });

module.exports = router;