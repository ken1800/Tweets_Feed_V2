require("dotenv").config();
import express = require("express");
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
const TweetsDatabase = require("./config/Databases");
import { typeDefs } from "./schemas/schema";
import jwt from "jsonwebtoken";
import db from "./config/db";
import resolvers from "./resolvers/resolvers";

const app: express.Application = express();
const databseSource = new TweetsDatabase(db);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  dataSources: () => ({ databseSource }),
});

server.applyMiddleware({ app });

app.listen({ port: 3000 }, () =>
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
);
