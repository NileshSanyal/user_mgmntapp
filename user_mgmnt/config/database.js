var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/user_mgmntdb', { useNewUrlParser: true })

  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));