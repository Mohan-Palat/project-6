const mongoose = require('mongoose');
const cocktailSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
  },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
    },
  ],
  instructions: {
    type: String,
    default: '',
  },
});
module.exports = mongoose.model('Cocktail', cocktailSchema);