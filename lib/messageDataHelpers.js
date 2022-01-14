
module.exports = function(db) {
  return {

    // Saves a message to `db`
    saveMessages: function(newMessage, callback) {
      db.tweets.push(newMessage);
      callback(null, true);
    },

    // Get all message in `db`, sorted by newest first
    getMessages: function(callback) {
      const sortNewestFirst = (a, b) => a.date - b.date;
      callback(null, db.messages.sort(sortNewestFirst));
    }
  };
};
