const router = require('express').Router();
const Ingredient = require('../models/ingredient.js');

// INDEX (GET)
router.get("/", (req, res) => {
  Ingredient.find({}, (error, allIngredients) => {
    res.render("ingredients/index.ejs", {
      ingredients: allIngredients,
    });
  });
});

// NEW INGREDIENT FORM
router.get('/new', (req, res) => {
  res.render('ingredients/new.ejs');
});

// CREATE A NEW INGREDIENT
router.post('/', async (req, res) => {
    try {
      let newIngredient = await Ingredient.create(req.body);
      res.redirect(`/ingredients`);
    } catch (error) {
      res.send(error);
    }
  });

module.exports = router;