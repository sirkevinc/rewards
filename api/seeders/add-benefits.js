'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Benefits', [
      {
        cardid: 1,
        category: 'travel',
        type: 'cashback',
        multiplier: 5,
        summary: 'Cash back on travel purchases',
        description: 'Earn 5% cash back per dollar spent on travel purchased through Chase',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cardid: 1,
        category: 'dining',
        type: 'cashback',
        multiplier: 3,
        summary: 'Cash back on dining purchases',
        description: 'Earn 3% cash back per dollar spent on dining including takeout and drugstores',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cardid: 1,
        category: 'other',
        type: 'cashback',
        multiplier: 1,
        summary: 'Cash back on all purchases',
        description: 'Earn 1% cash back per dollar spent on all other purchases',
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
