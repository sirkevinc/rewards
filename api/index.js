const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const models = require('./models');

const jwt = require('express-jwt');
require('dotenv').config()


const app = express();

app.use(cors());

const auth = jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false,
    algorithms: ['HS256']
})

app.use('/', express.json(), auth);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        user: req.user || "",
        models: models,
    })
});

server.start().then(res => {
    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    });
});
