const Users = require('./models/users');
// require packages


// invoke express


// add middleware

const users = new Users();



app.get('/', (req, res) => {
  res.send('Smoke test');
});

// add routes


module.exports = app;
