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
  getUserByEmail(email: string) {
    const rows = this.db
      .select("*")
      .from("users")
      .where("email", email)
      .cache(MINUTE);
    return rows;
  }
  addUser(data: any) {
    const { name, email } = data;
    const rows = this.db.insert({ name, email }).into("users").returning("*");
    return rows;
  }
}
module.exports = TweetsDatabase;
