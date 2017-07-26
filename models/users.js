class Users {
  constructor() {
    this.data = [
      {
        id: 1,
        username: 'passport-user',
        password: 'password'
      },
      {
        id: 2,
        username: 'second-user',
        password: 'passwd'
      },
      {
        id: 3,
        username: 'next-user',
        password: 'nextword'
      }
    ];
  }

  findById(id, cb) {
    let user = this.data.find(user => id === user.id);
    if (user) {
      return cb(null, user);
    }
    return cb(null);
  }

  findUser(userObj, cb) {
    let user = this.data.find(user => userObj.username === user.username);
    if (user) {
      return cb(null, user);
    }
    return cb(null);
  }
}

module.exports = Users;
