'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cards', [
    {
      id: 1,
      bank: 'Chase',
      name: 'Freedom Unlimited',
      image: 'chase_freedom_unlimited',
      summary: 'Cash back on every purchase',
      description: 'Earn cash back for every purchase. Earn 5% cash back on travel purchased through Chase, 3% on dining including takeout and drugstores, and 1.5% on all other purchases',
      rewardType: 'cashback',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      bank: 'Chase',
      name: 'Freedom Flex',
      image: 'chase_freedom_flex',
      summary: 'Cash back on every purchase',
      description: 'Earn 5% cash back on up to $1,500 on combined purchases in bonus categories each quarter you activate, Earn 5% cash back on travel purchased through Chase, 3% on dining including takeout and drugstores, and 1% on all other purchases',
      rewardType: 'cashback',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      bank: 'Chase',
      name: 'Slate Edge',
      image: 'chase_slate_edge',
      summary: 'Low interest rates',
      description: 'Lower your interest rate by 2% each year. Get an automatic review for a higher credit limit when you pay on time, and spend $500 in your first six months from account opening',
      rewardType: 'other',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      bank: 'Chase',
      name: 'Sapphire Preferred',
      image: 'chase_sapphire_preferred',
      summary: 'Premium dining and travel rewards',
      description: 'Earn 5x total points on travel purchased through Chase Ultimate Rewards®, excluding hotel purchases that qualify for the $50 Anniversary Hotel Credit. Earn 3x points on dining at restaurants including eligible delivery services, takeout and dining out. Earn 2x on other travel purchases',
      rewardType: 'ultimate rewards',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      bank: 'Chase',
      name: 'Sapphire Reserve',
      image: 'chase_sapphire_reserve',
      summary: 'Premium dining and travel rewards',
      description: 'Earn 5x total points on flights and 10x total points on hotels and car rentals when you purchase travel through Chase Ultimate Rewards® after the first $300 is spent on travel purchases annually',
      rewardType: 'ultimate rewards',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 6,
      bank: 'American Express',
      name: 'Platinum',
      image: 'amex_platinum',
      summary: 'Premium travel charge card',
      description: 'Enjoy benefits across travel, entertainment, and dining',
      rewardType: 'membership reward',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 7,
      bank: 'American Express',
      name: 'Gold',
      image: 'amex_gold',
      summary: 'Premium every day charge card',
      description: 'Enjoy earning extra rewards while making purchases at restaurants and supermarkets',
      rewardType: 'membership reward',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 8,
      bank: 'American Express',
      name: 'Green',
      image: 'amex_green',
      summary: 'Get rewarded for traveling',
      description: 'Reward yourself on travel purchases from flights, hotels, transit, and dining',
      rewardType: 'membership reward',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 9,
      bank: 'American Express',
      name: 'EveryDay Preferred',
      image: 'amex_everyday_preferred',
      summary: 'Reward Your Every Day',
      description: 'Earn extra rewards at supermarkets and gas stations',
      rewardType: 'membership reward',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 10,
      bank: 'American Express',
      name: 'Blue Cash Everyday',
      image: 'amex_blue_cash_everyday',
      summary: 'Simplify cash back',
      description: 'Cash Back on Everyday Categories like U.S. Supermarkets and Gas Stations',
      rewardType: 'cashback',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 11,
      bank: 'Discover',
      brand: 'it',
      name: 'Cash Back',
      image: 'discover_it_cashback',
      summary: 'Cash back on every purchase',
      description: 'Get 5% cash back rewards at select places throughout the year and 1% cash back on all other purchases',
      rewardType: 'cashback',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 12,
      bank: 'Discover',
      brand: 'it',
      name: 'Travel',
      image: 'discover_it_travel',
      summary: 'Earn Miles on every purchase, at home or away',
      description: 'Get 1.5x Miles on every dollar of every purchase',
      rewardType: 'discover miles',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 13,
      bank: 'Bank of America',
      name: 'Customized Cash Rewards',
      image: 'bofa_customized_cash',
      summary: 'Cash back in the category of your choice',
      description: 'Cash back rewards card with customizable bonus categories including: gas, online shopping, dining, travel, drug stores, or home improvement',
      rewardType: 'cashback',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 14,
      bank: 'Bank of America',
      name: 'Unlimited Cash Rewards',
      image: 'bofa_unlimited',
      summary: 'Unlimited cash back on all purchases',
      description: 'Earn unlimited 1.5% cash back on all purchases',
      rewardType: 'cashback',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
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
