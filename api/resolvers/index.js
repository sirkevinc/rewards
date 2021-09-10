const resolvers = {
    Query: {
        async allUsers(_, __ , { models }) {
            return models.User.findAll();
        },
    },
    Mutation: {
        async createUser(_, { username, email, password }, { models }) {
            return models.User.create({
                username,
                email,
                password
            });
        }
    }
}

module.exports = resolvers;