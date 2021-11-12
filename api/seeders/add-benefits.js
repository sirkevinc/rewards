'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Benefits', [
      {
        cardid: 1,
        category: 'travel',
        type: 'points',
        multiplier: 5,
        summary: 'Hotel purchases',
        description: 'Earn 5 Ultimate Rewards points per dollar spent on hotels',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {})
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
    return queryInterface.bulkDelete('Benefits', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
