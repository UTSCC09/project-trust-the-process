require('dotenv').config();


const { ApolloServer} = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const app = require("express")();
const cors = require('cors');

app.use(cors({origin: '*'}));

console.log("server 2");

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
  server.applyMiddleware({ app });
}

startServer();


const port = process.env.PORT;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
// const dbURI = `mongodb+srv://${username}:${password}@burnyourcalories.s52wk.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const dbURI = `mongodb+srv://CSCC09:yb1zu4R8htKYypTM@burnyourcalories.s52wk.mongodb.net/BurnYourCalories?retryWrites=true&w=majority`;

console.log(dbURI);

console.log("server 4");


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

/*
mongoose
    .connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>
      server.listen(port, '0.0.0.0', () => {
        console.log('Server is listening on ' + port);
      }),
    )
    .catch((err) => console.error('Failed to connect to database.', err));
*/