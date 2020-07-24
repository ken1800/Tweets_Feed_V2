const resolvers = {
  Query: {
    feeds: async (_source: any, _args: any, { dataSources }: any) => {
      return dataSources.databseSource.getFeeds();
    },
    tweets: async (_source: any, _args: any, { dataSources }: any) => {
      return dataSources.databseSource.getTweets();
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
    tweet: async (parent: any, _args: any, { dataSources }: any) => {
      const tweets = await dataSources.databseSource.getTweets();
      return tweets.filter(
        (tweet: any) => tweet.tweets_id === parent.activity_id
      );
    },
  },
};

export default resolvers;
