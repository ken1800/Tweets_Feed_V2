"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = apollo_server_express_1.gql `
  scalar Date
  type Query {
    tweets: [Tweet!]
    feeds: [Feed!]
  }

  type User {
    userId: Int
    name: String
    email: String
  }

  type Tweet {
    tweets_id: Int
    author: Int
    post: String
    isReply: Boolean
    tweeted_at: Date
    user: [User]
  }

  type Feed {
    feed_id: Int
    author: Int
    time_created: Date
    activity_id: Int
    activity_type: String
    seen_at: Date
    tweet: [Tweet]
  }
`;
