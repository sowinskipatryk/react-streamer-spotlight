// streamersController.js
const sqlite3 = require('sqlite3').verbose();

// Function to retrieve the streamer with the specified ID from the database
function retrieveStreamerFromDatabase(streamerId) {
    return new Promise((resolve, reject) => {
      // Create a new database instance
      const db = new sqlite3.Database('database.db'); // Replace 'database.db' with your SQLite database file path
  
      // Prepare the SQL query
      const sql = 'SELECT * FROM streamers WHERE id = ?'; // Replace 'streamers' with your table name
  
      // Execute the query with the provided streamerId parameter
      db.get(sql, [streamerId], (error, row) => {
        // Close the database connection
        db.close();
  
        if (error) {
          reject(error);
        } else {
          resolve(row);
        }
      });
    });
  }

  // Function to retrieve all streamers from the database
function retrieveAllStreamersFromDatabase() {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database('database.db'); // Replace 'database.db' with your SQLite database file path
  
      const sql = 'SELECT * FROM streamers'; // Replace 'streamers' with your table name
  
      db.all(sql, (error, rows) => {
        db.close();
  
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });
  }

  function insertStreamerIntoDatabase(streamer) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database('database.db'); // Replace 'database.db' with your SQLite database file path
  
      const sql = 'INSERT INTO streamers (name, category) VALUES (?, ?)'; // Replace 'streamers' with your table name and adjust the column names
  
      db.run(sql, [streamer.name, streamer.category], function (error) {
        if (error) {
          reject(error);
        } else {
          resolve(this.lastID); // Return the ID of the newly inserted streamer
        }
  
        db.close();
      });
    });
  }

  // Function to update the vote count for a specific streamer in the database
function updateVoteCountInDatabase(streamerId, voteType) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database('database.db'); // Replace 'database.db' with your SQLite database file path
  
      let sql;
      let params;
  
      if (voteType === 'upvote') {
        sql = 'UPDATE streamers SET upvotes = upvotes + 1 WHERE id = ?'; // Replace 'streamers' with your table name and adjust the column names
        params = [streamerId];
      } else if (voteType === 'downvote') {
        sql = 'UPDATE streamers SET downvotes = downvotes + 1 WHERE id = ?'; // Replace 'streamers' with your table name and adjust the column names
        params = [streamerId];
      } else {
        reject(new Error('Invalid vote type'));
        return;
      }
  
      db.run(sql, params, function (error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
  
        db.close();
      });
    });
  }

export default {
  updateVoteCountInDatabase,
  retrieveAllStreamersFromDatabase,
  retrieveStreamerFromDatabase,
  insertStreamerIntoDatabase
};