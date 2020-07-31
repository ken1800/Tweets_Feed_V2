import { gql } from "apollo-server-express";
export const typeDefs = gql`
  scalar Date

  type Query {
    feeds: [Feed!]
  }
  type Mutation {
    addUser(name: String, email: String): [User]
  }
  type Subscription {
    userAdded: [User]
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
  type LoginResult {
    user: User
    message: String
    token: String
    status: Int
  }
  extend type Query {
    tweets: [Tweet!]
  }
  extend type Query {
    user(id: Int): [User]
  }
  extend type Query {
    users: [User!]
  }
  extend type Query {
    feed(id: Int): [Feed!]
  }
  extend type Mutation {
    login(email: String): LoginResult
  }
`;
