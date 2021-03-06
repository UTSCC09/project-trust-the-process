require('dotenv').config();

const { ApolloServer} = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const cors = require('cors');
const path = require("path");
const express = require("express");

const app = express();

app.use(cors({origin: '*'}));

// REFERENCE: https://www.apollographql.com/docs/apollo-server/security/authentication/
const startServer = async() => {
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
  await server.start();

  // REFERENCE: https://www.youtube.com/watch?v=ok6bu-3XRA8 , Traversy Media Apollo GraphQL Heroku Deployment Tutorial
  app.use(express.static(path.join(__dirname, "public")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  });

  server.applyMiddleware({ app });
}

startServer();

const port = process.env.PORT || 5000;
const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, {useUnifiedTopology: true, useNewUrlParser: true}, err => {
  if (err){
    console.error('Failed to connect to MongoDB');
  } else{
    console.log('Successfully connected to MongoDB');
  }
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
