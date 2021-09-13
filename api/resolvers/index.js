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
        testQuery: async(_, { id }, { models }) => {
            const result = await models.User.findByPk(id, {
                include: [
                    {
                        model: models.Card,
                        as: "cards"
                    }
                ]
            })
            console.log(result)
            return result;
        },
    },
    Mutation: {
        createUser: async (_, { username, email, password }, { models }) => {
            const newUser = { username, email, password };
            return await models.User.create(newUser);
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
        },

        addUserToCard: async(_, { cardid, userid }, { models }) => {
            try {
                const card = await models.Card.findByPk(cardid);
                if (!card) {
                    console.error("Card not found");
                }
                const user = await models.User.findByPk(userid);
                if (!user) {
                    console.error("User not found");
                }
                await card.addUser(user);
                console.log(`added User id=${user.id} to Card id=${card.id}`);
                return card;
                
            } catch(err) {
                console.error(err);
            }
        },

        createCard: async(_, { bank, name, description, rewardType }, { models }) => {
            try { 
                const newCard = { bank, name, description, rewardType };
                
                return await models.Card.create(newCard);

            } catch(err) {
                console.error(err);
            }
        }
    }
}

module.exports = resolvers;

// https://www.apollographql.com/blog/backend/schema-design/modularizing-your-graphql-schema-code/