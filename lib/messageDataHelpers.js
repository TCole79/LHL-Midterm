
module.exports = function messageDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveMessage: function(newMessage, callback) {
      db.tweets.push(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getMessages: function(callback) {
      const sortNewestFirst = (a, b) => a.date - b.date;
      callback(null, db.tweets.sort(sortNewestFirst));
    }
  };
};
