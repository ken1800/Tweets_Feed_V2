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
const { config: { db }, } = require("../config");
// MY IDEA FOR THE PROCESS 2
// 1st Step - Selecting all the data from the tweets table
// 2nd step -cross check if the data exists(using all the id in the table) in the feeds table, if not ADD the data(to the feeds table) else exit.
// final step -Selecting from the feed and sorting them by time
const dammyDataTweet = {
    post: "its a wonderful day",
    author: 3,
    isReply: false,
    tweetId: null,
    tweeted_at: new Date(),
};
const addTweets = () => __awaiter(void 0, void 0, void 0, function* () {
    const rows = yield db.insert(dammyDataTweet).into("tweets").returning("*");
    return rows[0];
});
const selectTweets = () => __awaiter(void 0, void 0, void 0, function* () {
    const rows = yield db.select("*").from("tweets");
    return rows;
});
exports.addTweets = addTweets;
exports.selectTweets = selectTweets;
