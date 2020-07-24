"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers = {
    Query: {
        feeds: (_source, _args, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            return dataSources.databseSource.getFeeds();
        }),
        tweets: (_source, _args, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            return dataSources.databseSource.getTweets();
        }),
    },
    Tweet: {
        user: (parent, _args, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield dataSources.databseSource.getUsers();
            return users.filter((user) => user.userId === parent.author);
        }),
    },
    Feed: {
        tweet: (parent, _args, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            const tweets = yield dataSources.databseSource.getTweets();
            return tweets.filter((tweet) => tweet.tweets_id === parent.activity_id);
        }),
    },
};
exports.default = resolvers;
