require('dotenv').config();


const { ApolloServer} = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const express = require("express");
const app = require("express")();
const cors = require('cors');
const path = require("path");

app.use(cors({origin: '*'}));

// REFERENCE: https://www.apollographql.com/docs/apollo-server/security/authentication/
const startServer = async() => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      console.log("in context");
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

  app.use(express.static(__dirname + "public"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  });

  server.applyMiddleware({ app });
}

startServer();

const port = process.env.PORT || 5000;
const dbURI = process.env.MONGODB_URI;
console.log(dbURI);

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
