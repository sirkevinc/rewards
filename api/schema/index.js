const { gql } = require('apollo-server')

const typeDefs = gql`
    type User {
        id: Int!
        username: String!
        email: String!
        password: String!
        cards: [Card!]!
    }

    type Card {
        id: Int!
        bank: String!
        name: String!
        summary: String!
        description: String!
        rewardType: String!
        benefits: [Benefit!]!
    }

    type Benefit {
        id: Int!
        cardid: Int!
        type: String!
        category: String!
        multiplier: Float
        summary: String!
        description: String!
    }

    type UpdateResponse {
        success: Boolean!
        message: String
    }

    type Query {
        user(id: Int!): User
        allUsers: [User!]!
        card(id: Int!): Card
        allCards: [Card!]!
        benefit(id: Int!): Benefit
        allBenefits: [Benefit!]!
        
        testQuery: UpdateResponse
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): User!
        updateUser(id: Int!, username: String, email: String, password: String): User!
        destroyUser(id: Int!): UpdateResponse!
        login(email: String!, password: String!): User!

        addUserToCard(cardid: Int!, userid: Int!): Card!
        removeUserFromCard(cardid: Int!, userid: Int!): UpdateResponse!

        createCard(bank: String!, name: String!, summary: String!, description: String!, rewardType: String!): Card!
        updateCard(id: Int!, bank: String, name: String, summary: String, description: String, rewardType: String): Card!
        destroyCard(id: Int!): UpdateResponse!

        createBenefit(cardid: Int!, type: String!, category: String!, multiplier: Float!, summary: String!, description: String!): Benefit!
        updateBenefit(id: Int!, cardid: Int, type: String, category: String, multiplier: Float, summary: String!, description: String): Benefit!
        destroyBenefit(id: Int!): UpdateResponse!
    }
`

module.exports = typeDefs;