'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {'Cards', [
    {
      bank: 'Chase',
      name: 'Freedom',
      summary: 'All around cash back',
      descriptions: 'Longer description here blah blah blah',
      rewardType: 'Cash Back'
    },
    {
      bank: 'American Express',
      name: 'Platinum',
      summary: 'Premium Travel',
      descriptions: 'Longer description here blah blah blah',
      rewardType: 'Membership Reward'
    }
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
    return queryInterface.bulkDelete('Cards', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
