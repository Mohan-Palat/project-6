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

// NEW (GET)
router.get('/new', async (req, res) => {
    let allIngredients = await Ingredient.find({});
    res.render('cocktails/new.ejs', { ingredients: allIngredients });
  });

// RANDOM (GET)
router.get('/random', async (req, res) => {
  res.render('cocktails/random.ejs', {});
});

// SHOW (GET)
router.get('/:id', async (req, res) => {
  let allIngredients = await Ingredient.find({});
  let foundCocktail = await Cocktail.findById(req.params.id).populate({
    path: 'ingredients',
    options: { sort: { ['name']: 1 } },
  });

  let ingredientsForChecklist = allIngredients.filter((ingredient) => {
    if (!foundCocktail.ingredients.map((cocktail) => cocktail.id).includes(ingredient.id)) {
      return ingredient;
    }
  });

  res.render('cocktails/show.ejs', {
    cocktail: foundCocktail,
    ingredients: ingredientsForChecklist,
  });
});

// CREATE (POST)
router.post('/', async (req, res) => {
    console.log(req.body);
  let cocktail = await Cocktail.create(req.body);
  res.redirect(`/cocktails/${cocktail.id}`);
});

// DELETE (DELETE)
router.delete('/:id', (req, res)=>{
  Cocktail.findByIdAndRemove(req.params.id, (err, data)=>{
      res.redirect('/cocktails');//redirect back to fruits index
  });
});

// UPDATE (PUT) : Ingredients
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
  res.redirect(`/cocktails/${foundCocktail.id}`);
});

// UPDATE (PUT) : Name and Description
router.put('/:cocktailID', (req, res) => {
  const cocktailID = req.params.cocktailID;
  Cocktail.findById(cocktailID, (err, foundCocktail) => {
    foundCocktail.name = req.body.name;
    foundCocktail.instructions = req.body.instructions;
    foundCocktail.save((err,savedCocktail) => {
      res.redirect(`/cocktails/${foundCocktail.id}`);
    });
});
});

// EDIT (GET) : Show cocktail edit form
router.get('/:id/edit', (req, res) => {
  Cocktail.findById(req.params.id, (error, cocktail) => {
    res.render('cocktails/edit.ejs', { cocktail });
  });
});

module.exports = router;