require('dotenv').config();

console.log("server 1");

const { ApolloServer} = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

console.log("server 2");

// REFERENCE: https://www.apollographql.com/docs/apollo-server/security/authentication/
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    if (token) {
      try {
        const user = jwt.verify(token, "burnYourCalories");
        return { id: user.id };
      }
      catch(err) {
        console.log(err);
      }
    }
    else {
      return null;
    }
  }
});

console.log("server 3");

const port = process.env.SERVER_PORT || 4000;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbURI = `mongodb+srv://${username}:${password}@burnyourcalories.s52wk.mongodb.net/${dbName}?retryWrites=true&w=majority`;


console.log("server 4");


mongoose
    .connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>
      server.listen(port, '0.0.0.0', () => {
        console.log('Server is listening on ' + port);
      }),
    )
    .catch((err) => console.error('Failed to connect to database.', err));