const router = require('express').Router();
const Cocktail = require('../models/cocktail');
const Ingredient = require('../models/ingredient');

// INDEX (GET)
router.get("/", (req, res) => {
    Cocktail.find({}, (error, allCocktails) => {
      res.render("cocktails/index.ejs", {
        cocktails: allCocktails,
      });
    });
  });

router.get('/new', async (req, res) => {
    let allIngredients = await Ingredient.find({});
    res.render('cocktails/new.ejs', { ingredients: allIngredients });
  });

  router.get('/:id', async (req, res) => {
    let allIngredients = await Ingredient.find({});
    let foundCocktail = await Cocktail.findById(req.params.id).populate({
      path: 'ingredients',
      options: { sort: { ['name']: 1 } },
    });
    res.render('cocktails/show.ejs', {
      cocktail: foundCocktail,
      ingredients: allIngredients,
    });
  });

router.post('/', async (req, res) => {
    console.log(req.body);
  let cocktail = await Cocktail.create(req.body);
  res.redirect(`/cocktails/${cocktail.id}`);
});

router.put('/:cocktailId/ingredients', async (req, res) => {
    let foundCocktail = await Cocktail.findByIdAndUpdate(
      req.params.cocktailId,
      {
        $push: {
          ingredients: req.body.ingredients,
        },
      },
      { new: true, upsert: true }
    );
    console.log(foundCocktail);
    res.redirect(`/cocktails/${foundCocktail.id}`);
  });

module.exports = router;