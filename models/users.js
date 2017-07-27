const users = [
  {
    id: 1,
    username: 'passport-user',
    password: 'password',
    role: 'user'
  },
  {
    id: 2,
    username: 'second-user',
    password: 'passwd',
    role: 'user'
  },
  {
    id: 3,
    username: 'next-user',
    password: 'nextword',
    role: 'user'
  },
  {
    id: 4,
    username: 'admin-user',
    password: 'adminpass',
    role: 'admin'
  }
];

function findById(id, cb) {
  let user = users.find(user => id === user.id);
  if (user) {
    return cb(null, user);
  }
  return cb(null);
}

function findUser(userObj, cb) {
  let user = users.find(user => userObj.username === user.username);
  if (user) {
    return cb(null, user);
  }
  return cb(null);
}

module.exports = {
  findById: findById,
  findUser: findUser
};
