const { SQLDataSource } = require("datasource-sql");
const MINUTE = 60;

class TweetsDatabase extends SQLDataSource {
  getTweets() {
    const rows = this.db.select("*").from("tweets").cache(MINUTE);
    return rows;
  }
  getFeeds() {
    const rows = this.db.from("feeds").distinctOn("activity_id").cache(MINUTE);
    return rows;
  }
  getFeed(id: any) {
    const rows = this.db
      .select("*")
      .from("feeds")
      .where("feed_id", id)
      .cache(MINUTE);
    return rows;
  }
  getUsers() {
    const rows = this.db.select("*").from("users").cache(MINUTE);
    return rows;
  }
  getUser(id: any) {
    const rows = this.db
      .select("*")
      .from("users")
      .where("userId", id)
      .cache(MINUTE);
    return rows;
  }
}
module.exports = TweetsDatabase;

// db.select("name").from("users").where('userId', id)
