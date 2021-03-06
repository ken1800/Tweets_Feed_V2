require("dotenv").config();
import express = require("express");
import {
  ApolloServer,
  AuthenticationError,
  makeExecutableSchema,
  PubSub,
} from "apollo-server-express";
const TweetsDatabase = require("./config/Databases");
import { typeDefs } from "./schemas/schema";
const http = require("http");
import db from "./config/db";
import resolvers from "./resolvers/resolvers";
const app: express.Application = express();
const databseSource = new TweetsDatabase(db);
const PORT = process.env.PORT || 4000;
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  dataSources: () => ({ databseSource }),
  context: async () => {
    return "hello contextx";
  },
  tracing: true,
});

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  );
});
