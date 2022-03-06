require('dotenv').config();

const { ApolloServer} = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const port = process.env.SERVER_PORT;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbURI = `mongodb+srv://${username}:${password}@burnyourcalories.s52wk.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
    .connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>
      server.listen(port, '0.0.0.0', () => {
        console.log('Server is listening on ' + port);
      }),
    )
    .catch((err) => console.error('Failed to connect to database.', err));
