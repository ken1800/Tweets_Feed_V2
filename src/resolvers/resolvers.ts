import { PubSub } from "apollo-server-express";
export const pubsub = new PubSub();
const USER_ADDED = "USER_ADDED";
const resolvers = {
  Query: {
    feeds: async (_args: any, context: any, { dataSources }: any) => {
      console.log(context);
      return dataSources.databseSource.getFeeds();
    },
    tweets: async (_source: any, _args: any, { dataSources }: any) => {
      return dataSources.databseSource.getTweets();
    },
    feed: async (_source: any, _args: any, { dataSources }: any) => {
      const fD = await dataSources.databseSource.getFeed(_args.id);
      //console.log(fD);
      return fD;
    },
    users: async (_source: any, _args: any, { dataSources }: any) => {
      const users = await dataSources.databseSource.getUsers();
      return users;
    },
    user: async (_source: any, _args: any, { dataSources }: any) => {
      const user = await dataSources.databseSource.getUser(_args.id);
      return user;
    },
  },
  Tweet: {
    user: async (parent: any, _args: any, { dataSources }: any) => {
      const users = await dataSources.databseSource.getUsers();
      return users.filter(
        (user: { userId: number }) => user.userId === parent.author
      );
    },
  },
  Feed: {
    tweet: async (
      parent: any,
      _args: any,

      { dataSources }: any
    ) => {
      const tweets = await dataSources.databseSource.getTweets();
      return tweets.filter(
        (tweet: any) => tweet.tweets_id === parent.activity_id
      );
    },
  },
  Mutation: {
    addUser: async (parent: any, _args: any, { dataSources }: any) => {
      const data = {
        email: _args.email,
        name: _args.email,
      };

      const user = await dataSources.databseSource.addUser(data);
      await pubsub.publish(USER_ADDED, user);
      return user;
    },
    login: async (_: any, { email }: any, { dataSources }: any) => {
      let logResult = {
        token: "",
        user: null,
        message: "Login error",
        status: 422,
      };
      const user = await dataSources.databseSource.getUserByEmail({ email });
      if (await user) {
        console.log(user, "this is the user");
        return {
          token: Buffer.from(email).toString("base64"),
          user: user,
          message: "Login success",
          status: 200,
        };
      } else {
        return logResult;
      }
    },
  },

  Subscription: {
    userAdded: {
      subscribe: () => pubsub.asyncIterator([USER_ADDED]),
    },
  },
};

export default resolvers;
