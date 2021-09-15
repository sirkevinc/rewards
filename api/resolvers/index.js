const { UserInputError } = require('apollo-server');

const resolvers = {
    Query: {
        user: async (_, { id }, { models }) => {
            const result = await models.User.findByPk(id, {
                include: [
                    {
                        model: models.Card,
                        as: "cards"
                    }
                ]
            })
            return result;
        },
        allUsers: async (_, __ , { models }) => {
            return await models.User.findAll({ include: ["cards"] });
        },
        card: async (_, { id }, { models }) => {
            const result = await models.Card.findByPk(id, {
                include: [
                    {
                        model: models.Benefit,
                        as: "benefits"
                    }
                ]
            })
            return result;
        },
        allCards: async(_, __, { models }) => {
            const cards = await models.Card.findAll({
                include: [
                    {
                        model: models.Benefit,
                        as: "benefits"
                    }
                ]
            });
            return cards;
        },
        benefit: async (_, { id }, { models }) => {
            const result = await models.Benefit.findByPk(id);
            return result;
        },
        allBenefits: async(_, ___, { models }) => {
            const benefits = await models.Benefit.findAll();
            return benefits;
        },

        testQuery: async(root, args, context) => {
            console.log('root', root);
            console.log('args', args);
            console.log('context', context);
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
        removeUserFromCard: async(_, { cardid, userid }, { models }) => {
            try {
                const card = await models.Card.findByPk(cardid);
                if (!card) {
                    console.error("Card not found");
                }
                const user = await models.User.findByPk(userid);
                if (!user) {
                    console.error("User not found");
                }
                const result = await card.removeUser(user);
                if (!result) {
                    const message = { success: false, message: "Could not remove card from user"};
                    return message;
                }
                console.log(`removed User id=${user.id} from Card id=${card.id}`);
                const message = { success: true, message: `removed User id=${user.id} from Card id=${card.id}` };
                return message;
            } catch(err) {
                console.error(err);
            }
        },

        createCard: async(_, { bank, name, summary, description, rewardType }, { models }) => {
            try { 
                const newCard = { bank, name, summary, description, rewardType };
                
                return await models.Card.create(newCard);

            } catch(err) {
                console.error(err);
            }
        },
        updateCard: async(_, { id, bank, name, summary, description, rewardType }, { models }) => {
            const updatedCard = { bank, name, summary, description, rewardType };
            try {
                const result = await models.Card.update(
                   updatedCard, 
                   { where: { id: id }}
               );
                if (!result[0]) {
                   throw new UserInputError('Error while updating user');
                }
                return await models.User.findByPk(id); 
            } catch(err) {
                throw new UserInputError(err);
            }
        },
        destroyCard: async(_, { id }, { models }) => {
            try {
                const deletedCard = await models.User.destroy({ where: { id: id } });
                if (!deletedCard) {
                    const failedResponse = { success: false, message: "Card delete failed"};
                    return failedResponse;
                }
                const updateResponse = { success: true, message: "Card successfully deleted"};
                return updateResponse;
            } catch(err) {
                throw new UserInputError(err);
            }
        },

        createBenefit: async(_, { cardid, type, category, multiplier, summary, description }, { models }) => {
            try {
                const newBenefit = ({
                    cardid,
                    type,
                    category,
                    multiplier,
                    summary,
                    description,
                });
                return await models.Benefit.create(newBenefit);
            } catch (err) {
                console.error(err);
            }
        },
        updateBenefit: async(_, { id, cardid, type, category, multiplier, summary, description }, { models }) => {
            try {
                const updatedBenefit = { cardid, type, category, multiplier, summary, description };
                const result = await models.Benefit.update(
                    updatedBenefit,
                    { where: { id: id }}
                );
                if (!result[0]) {
                    throw new UserInputError('Error while updating benefit');
                }
                return await models.Benefit.findByPk(id);
            } catch(err) {
                console.error(err);
            }
        },
        destroyBenefit: async(_, { id }, { models }) => {
            try {
                const deletedCard = await models.Benefit.destroy({ where: { id: id } });
                if (!deletedCard) {
                    const failedResponse = { success: false, message: "Benefit delete failed"};
                    return failedResponse;
                }
                const updateResponse = { success: true, message: "Benefit successfully deleted"};
                return updateResponse;
            } catch(err) {
                console.error(err);
            }
        }
    }
}

module.exports = resolvers;

// https://www.apollographql.com/blog/backend/schema-design/modularizing-your-graphql-schema-code/