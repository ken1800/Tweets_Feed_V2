import { gql } from "apollo-server-express";
export const typeDefs = gql`
  scalar Date
  type Query {
    tweets: [Tweet!]
    feeds: [Feed!]
    feed(id: Int): [Feed!]
    users: [User!]
    user(id: Int): [User]
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
