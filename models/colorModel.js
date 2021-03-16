const mongoose = require('mongoose')

const colorSchema = new mongoose.Schema({

  colorName: { type: String, required: true },
 
  colorUrl: { type: String, required: true }
});

module.exports = mongoose.model('Color', colorSchema);

