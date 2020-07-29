import { gql } from "apollo-server-express";
export const typeDefs = gql`
  scalar Date

  type Query {
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
`;
