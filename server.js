const path = require('path')
const express = require('express');
const cors = require('cors');
const schema = require('./schema');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./db');

const { ApolloServer } = require('apollo-server-express');

const server = new ApolloServer({
  typeDefs: schema.typeDefs,
  resolvers: schema.resolvers
})

const app = express();
app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

dotenv.config({ path: './config/config.env' })
connectDB()

server.applyMiddleware({app});

const port = process.env.PORT || 5000
app.listen(port, () => `Server running on port ${process.env.PORT} and apollo server at http://localhost:5000${server.graphqlPath}`);