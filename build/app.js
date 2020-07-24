"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express = require("express");
const apollo_server_express_1 = require("apollo-server-express");
const TweetsDatabase = require("./config/Databases");
const schema_1 = require("./schemas/schema");
const db_1 = __importDefault(require("./config/db"));
const resolvers_1 = __importDefault(require("./resolvers/resolvers"));
const app = express();
const databseSource = new TweetsDatabase(db_1.default);
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: resolvers_1.default,
    dataSources: () => ({ databseSource }),
});
server.applyMiddleware({ app });
app.listen({ port: 3000 }, () => console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`));
