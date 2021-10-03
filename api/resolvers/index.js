const { ApolloError, UserInputError } = require('apollo-server');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const resolvers = {
    Query: {
        me: async (_, __, { models, user }) => {
            if (!user) {
                throw new Error ('You are not authenticated!')
            }
            
            const result = await models.User.findByPk(user.id, {
                include: [
                    {
                        model: models.Card,
                        as: "cards"
                    }
                ]
            });
            return result;
        },

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
            const result = await models.User.findAll({ include: ["cards"] });
            return result;
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
            return { success: true, message: "Test" }
        },
    },
    Mutation: {
        createUser: async (_, { username, email, password }, { models }) => {
            const newUser = await models.User.create({ username, email, password: await bcrypt.hash(password, 10) });
            const token = await jsonwebtoken.sign(
                { id: newUser.id, email: newUser.email },
                process.env.JWT_SECRET,
                { expiresIn: '1y' }
            )
            return { token };
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
                // const returnUpdatedUser = await models.User.findByPk(id);
                const updateResponse = { success: true, message: "User successfully updated"}
                return updateResponse;
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
            let user = await models.User.findAll({
                limit: 1,
                where: {
                    email
                }
            });

            user = user[0]

            if (!user) {
                throw new Error ('User not found');
            }

            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                throw new Error('Login Failed. Wrong email or password.');
            }

            const token = await jsonwebtoken.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            )

            return { token, user };
        },

        addUserToCard: async(_, { cardid, userid }, { models, user }) => {
            try {
                if (!user) {
                    throw new Error ('You are not authenticated!')
                }
                userid = user.id;
                const card = await models.Card.findByPk(cardid);
                if (!card) {
                    console.error("Card not found");
                }
                const currentUser = await models.User.findByPk(userid);
                if (!currentUser) {
                    console.error("User not found");
                }
                const result = await card.addUser(currentUser);
                const updateResponse = {};
                if (!result) {
                    // throw new Error('Could not add card');
                    updateResponse.success = false,
                    updateResponse.message = 'Could not add card to user'
                    return updateResponse;
                }
                console.log(`added User id=${user.id} to Card id=${card.id}`);
                updateResponse.success = true;
                updateResponse.message = 'Successfully added card to user'
                return updateResponse;
            } catch(err) {
                console.error(err);
            }
        },
        removeUserFromCard: async(_, { cardid, userid }, { models, user }) => {
            try {
                if (!user) {
                    throw new Error('You are not authenticated!');
                }
                userid = user.id;
                const card = await models.Card.findByPk(cardid);
                if (!card) {
                    console.error("Card not found");
                }
                const currentUser = await models.User.findByPk(userid);
                if (!currentUser) {
                    console.error("User not found");
                }
                const result = await card.removeUser(currentUser);
                if (!result) {
                    const message = { success: false, message: "Could not remove card from user"};
                    return message;
                }
                console.log(`removed User id=${user.id} from Card id=${card.id}`);
                const message = { success: true, message: `Removed User id=${user.id} from Card id=${card.id}` };
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