const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sm_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = mongoose.connection;