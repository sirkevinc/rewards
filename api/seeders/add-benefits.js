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
        description: 'Earn 3% cash back per dollar spent on dining including takeout',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cardid: 1,
        category: 'other',
        type: 'cashback',
        multiplier: 3,
        summary: 'Cash back on drugstore purchases',
        description: 'Earn 3% cash back per dollar spent on drugstore purchases',
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
      {
        cardid: 2,
        category: 'travel',
        type: 'cashback',
        multiplier: 5,
        summary: 'Cash back on travel purchases',
        description: 'Earn 5% cash back per dollar spent on travel purchased through Chase',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cardid: 2,
        category: 'dining',
        type: 'cashback',
        multiplier: 3,
        summary: 'Cash back on dining purchases',
        description: 'Earn 3% cash back per dollar spent on dining including takeout',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cardid: 2,
        category: 'other',
        type: 'cashback',
        multiplier: 3,
        summary: 'Cash back on drugstore purchases',
        description: 'Earn 3% cash back per dollar spent on drugstore purchases',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cardid: 2,
        category: 'other',
        type: 'cashback',
        multiplier: 1,
        summary: 'Cash back on all purchases',
        description: 'Earn 1% cash back per dollar spent on all other purchases',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cardid: 2,
        category: 'shopping',
        type: 'cashback',
        multiplier: 5,
        summary: 'Bonus category for Q4 2021: Walmart and Paypal',
        description: 'Earn 5% cash back at Walmart and on spending via PayPal upon activation (up to $1,500 in purchases, then 1%)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cardid: 4,
        category: 'hotel',
        type: 'credit',
        multiplier: 0,
        summary: 'Up to $50 in statement credits for hotel stays',
        description: 'Earn up to $50 in statement credits each account anniversary year for hotel stays purchased through Chase Ultimate Rewards',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cardid: 4,
        category: 'travel',
        type: 'points',
        multiplier: 5,
        summary: '5x bonus points on travel purchases through Chase',
        description: 'Earn 5x points per dollar spent on travel purchased through Chase',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cardid: 4,
        category: 'travel',
        type: 'points',
        multiplier: 2,
        summary: '2x bonus points on all travel purchases',
        description: 'Earn 2x points per dollar spent on travel purchases',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cardid: 4,
        category: 'dining',
        type: 'points',
        multiplier: 3,
        summary: '3x bonus points on all dining purchases',
        description: 'Earn 3x points on dining, including eligible delivery services, takeout and dining out',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cardid: 4,
        category: 'groceries',
        type: 'points',
        multiplier: 3,
        summary: '3x bonus points on online grocery purchases',
        description: 'Earn 3x points on online grocery purchases (excluding Target, Walmart and wholesale clubs)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cardid: 4,
        category: 'other',
        type: 'points',
        multiplier: 3,
        summary: '3x bonus points on select streaming services',
        description: 'Earn 3x points on select streaming services including: Disney+, Hulu, ESPN+, Netflix, Sling, Vudu, Fubo TV, Apple Music, SiriusXM, Pandora, Spotify and Youtube TV',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cardid: 4,
        category: 'other',
        type: 'points',
        multiplier: 1,
        summary: 'Earn points on all purchases',
        description: 'Earn 1x points per dollar spent on all other purchases',
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
