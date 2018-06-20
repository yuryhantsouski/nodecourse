const users = [
  {
    id: 1,
    email: 'fake@gmail.com',
    password: '12345'
  }
];

export class Users {
  findOne({ email, password }) {
    // Simulate async call
    return new Promise((res, rej) => {
      process.nextTick(() => {
        const fakeUser = users[0];
        if (email !== fakeUser.email || password !== fakeUser.password) {
          return res(null);
        }
  
       return res(fakeUser);
      });
    })
  }

  findOneById(id) {
    // Simulate async call
    return new Promise((res, rej) => {
      process.nextTick(() => {
        return res(users.find(user => user.id === id));
      });
    });
  }

  findOrCreate({ id }) {
    // Simulate async call
    return new Promise((res, rej) => {
      process.nextTick(() => {
        const user = users.find(user => user.id === id);

        if (!user) {
          const newUser = { id, email: 'Joe@gmail.com', password: '2222222' };
          users.push(newUser);
          return res(newUser);
        }

        return res(user);
      });
    });
  }
}