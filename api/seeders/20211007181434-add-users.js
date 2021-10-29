'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {'Users',[
    {
      username: 'user1',
      email: 'user1@gmail.com',
      password: 'password',
    },
    {
      username: 'user2',
      email: 'user2@gmail.com',
      password: 'password',
    },
    {
      username: 'user3',
      email: 'user3@gmail.com',
      password: 'password',
    },
    {
      username: 'user4',
      email: 'user4@gmail.com',
      password: 'password',
    },
    {
      username: 'user5',
      email: 'user5@gmail.com',
      password: 'password',
    },
  ]
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
