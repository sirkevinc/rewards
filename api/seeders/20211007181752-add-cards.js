'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cards', [
    {
      bank: 'Chase',
      name: 'Freedom Unlimited',
      image: 'chase_freedom_unlimited',
      summary: 'Cash back on every purchase',
      description: 'Earn cash back for every purchase. Earn 5% cash back on travel purchased through Chase, 3% on dining including takeout and drugstores, and 1.5% on all other purchases.',
      rewardType: 'cashback',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      bank: 'American Express',
      name: 'Platinum',
      image: 'amex_platinum',
      summary: 'Premium travel charge card',
      description: 'Enjoy benefits across travel, entertainment, and dining.',
      rewardType: 'membership reward',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});
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
    return queryInterface.bulkDelete('Cards', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
