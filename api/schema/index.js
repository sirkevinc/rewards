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
        description: String
        rewardType: String!
        benefits: [Benefit!]!
    }

    type Benefit {
        id: Int!
        type: String!
        category: String!
        multiplier: Float
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
        allUsersCards (id: Int!): [Card!]!
        benefit(id: Int!): Benefit
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): User!
        updateUser(id: Int!, username: String, email: String, password: String): User!
        destroyUser(id: Int!): UpdateResponse!
        login(email: String!, password: String!): User!

        addUserCard(id: Int!): Card!
        removeUserCard(id: Int!): UpdateResponse!

        createCard(bank: String!, name: String!, description: String, rewardType: String!, benefits: Int): Card!
        updateCard(id: Int!, bank: String, name: String, description: String, rewardType: String, benefits: Int): Card!
        destroyCard(id: Int!): UpdateResponse!

        createBenefit(type: String!, category: String!, multiplier: Float, descriptsion: String): Benefit!
        updateBenefit(id: Int!, type: String, category: String, multiplier: Float, description: String): Benefit!
        destroyBenefit(id: Int!): UpdateResponse!
    }
`

module.exports = typeDefs;