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
const { config: { db, } } = require("../config");
const ID = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};
// fetch all the data from the tweets table and populate it to the 
const seedTweetsToFeed = (tweets) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const specialID = ID();
        const activity_type = "tweeted";
        const newTweetObj = yield tweets.map((tweetEl) => ({
            specialID,
            data: tweetEl
        }));
        // transforming the tweet object data to the required feeds table format
        const dataTweets = yield newTweetObj.map((twee) => {
            return {
                author: twee.data.author,
                time_created: twee.data.tweeted_at,
                activity_id: twee.data.tweets_id,
                activity_type: activity_type,
                seen_at: new Date()
            };
        });
        console.log(dataTweets);
        // insert this tweets to the feeds table
        const rows = yield db.insert(dataTweets).into("feeds").returning("*");
        return rows[0];
    }
    catch (error) {
        return error;
    }
});
// select feeds from feeds table
const selectFeeds = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // this selects the unique feeds only incase there was duplication of data in the database
        const feeds = yield db.from("feeds").distinctOn('activity_id');
        return feeds;
    }
    catch (error) {
        return error;
    }
});
// select specific user object returned
const selectUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db.select("name").from("users").where('userId', id);
        return user;
    }
    catch (error) {
        console.log(error);
    }
});
//  function to get the feeds
const getfeeds = (feeds) => __awaiter(void 0, void 0, void 0, function* () {
    // output the  feeds 
    try {
        const feed = yield feeds.map((fed) => {
            return fed;
        });
        // returns a promise of the modified feeds data with the user added
        const feedsPromise = yield feed.map((data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const nam = yield selectUser(data.author);
                const stmnt = `On ${data.time_created.toString().slice(0, -48)} at ${data.time_created.toTimeString().slice(0, -31)}  ${nam.map((n) => n.name)} ${data.activity_type} `;
                return stmnt;
            }
            catch (error) {
                console.log("mapping feeds error", error);
            }
        }));
        return feedsPromise;
    }
    catch (error) {
        console.log("get feeds error", error);
    }
});
exports.seedTweetsToFeed = seedTweetsToFeed;
exports.selectFeeds = selectFeeds;
exports.getfeeds = getfeeds;
exports.selectUser = selectUser;
