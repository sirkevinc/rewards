const { UserInputError } = require('apollo-server');

const resolvers = {
    Query: {
        user: async (_, { id }, { models }) => {
            return models.User.findByPk(id);
        },
        allUsers: async (_, __ , { models }) => {
            return models.User.findAll();
        },
        card: async (_, { id }, { models }) => {
            return models.Card.findByPk(id);
        },
        allCards: async(_, __, { models }) => {
            return models.Card.findAll();
        },
        allUsersCards: async(_, { ids }, { models }) => {
            return models.Card
        },
    },
    Mutation: {
        createUser: async (_, { username, email, password }, { models }) => {
            return models.User.create({
                username,
                email,
                password
            });
        },
        updateUser: async(_, { id, username, email, password }, { models }) => {
            const updatedUser = { username, email, password };
            try {
                const result = await models.User.update(
                   updatedUser, 
                   { where: { id: id }}
               );
                if (!result[0]) {
                   throw new UserInputError('Error while updating user');
                }
                const returnUpdatedUser = await models.User.findByPk(id);
                return returnUpdatedUser;
            } catch(err) {
                throw new UserInputError(err);
            }
        },
        destroyUser: async(_, { id }, { models }) => {
            try {
                const deletedUser = await models.User.destroy({ where: { id: id }});
                if (!deletedUser) {
                    const failedResponse = { success: false, message: "User delete failed"};
                    return failedResponse;
                }
                const updateResponse = { success: true, message: "User successfully deleted"};
                return updateResponse;
            } catch(err) {
                throw new UserInputError(err);
            }
        },
        login: async(_, { email, password }, { models }) => {
            try {
                const user = models.User.findAll({
                    limit: 1,
                    where: {
                        email,
                        password
                    }
                })
                if (!user) {
                    throw new UserInputError("Login Failed");
                }
                return user;
            } catch(err) {
                throw new UserInputError(err);
            }
        }
    }
}

module.exports = resolvers;

// https://www.apollographql.com/blog/backend/schema-design/modularizing-your-graphql-schema-code/