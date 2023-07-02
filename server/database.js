import sqlite3 from 'sqlite3';

const DATABASE_PATH = 'database.db';

export const connectToDatabase = () => {
    return new sqlite3.Database(DATABASE_PATH);
  };

export function createTableIfNotExists() {
  return new Promise((resolve, reject) => {
    const db = connectToDatabase();

    // SQL query to check if the table exists
    const sql = `SELECT name FROM sqlite_master WHERE type='table' AND name='streamers';`;

    db.get(sql, (error, row) => {
      if (error) {
        reject(error);
      } else {
        if (row) {
          // Table exists
          resolve(true); // Return true indicating table already exists
        } else {
          // Table does not exist, create it
          const createTableSql = `
            CREATE TABLE streamers (
              id INTEGER PRIMARY KEY,
              name TEXT,
              description TEXT DEFAULT '',
              platform TEXT,
              upvotes INTEGER DEFAULT 0,
              downvotes INTEGER DEFAULT 0
            );
          `;

          db.run(createTableSql, (error) => {
            if (error) {
              reject(error);
            } else {
              resolve(false); // Return false indicating table was created
            }
          });
        }
      }

      db.close();
    });
  });
}

export function insertInitialData() {
  return new Promise((resolve, reject) => {
    const db = connectToDatabase();

    // Initial data to insert
    const initialData = [
      { name: 'BaldBuck', platform: 'YouTube', description: 'Well, he really IS bald.', upvotes: 2, downvotes: 3 },
      { name: 'JordyBL', platform: 'TikTok', description: 'Sell me this pen!', upvotes: 4, downvotes: 1 },
      { name: 'FromMuskTillDawn', platform: 'Twitch', description: 'Who owns this place? 8)', upvotes: 7, downvotes: 0 },
    ];

    // SQL query to insert initial data
    const insertSql = `
      INSERT INTO streamers (name, platform, description, upvotes, downvotes)
      VALUES (?, ?, ?, ?, ?);
    `;

    // Use a loop and promises to insert each initial data object
    const promises = initialData.map((data) => {
      return new Promise((resolve, reject) => {
        db.run(insertSql, [data.name, data.platform, data.description, data.upvotes, data.downvotes], function (error) {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    });

    // Execute all insert promises
    Promise.all(promises)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        db.close();
      });
  });
}

export const retrieveAllStreamers = () => {
  return new Promise((resolve, reject) => {
    const db = connectToDatabase();
    const sql = 'SELECT * FROM streamers';

    db.all(sql, (error, rows) => {
      db.close();

      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
};

export const retrieveStreamerById = (streamerId) => {
  return new Promise((resolve, reject) => {
    const db = connectToDatabase();
    const sql = 'SELECT * FROM streamers WHERE id = ?';

    db.get(sql, [streamerId], (error, row) => {
      db.close();

      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
};

export const updateVoteCount = (streamerId, voteType) => {
  return new Promise((resolve, reject) => {
    const db = connectToDatabase();

    let sql = '';
    if (voteType == 'upvote') {
        sql = 'UPDATE streamers SET upvotes = upvotes + 1 WHERE id = ?';
    } else {
        sql = 'UPDATE streamers SET downvotes = downvotes + 1 WHERE id = ?';
    }

    db.run(sql, [streamerId], function (error) {
      db.close();

      if (error) {
        reject(error);
      } else {
        resolve(this.changes);
      }
    });
  });
};

export const insertStreamer = (streamerData) => {
  return new Promise((resolve, reject) => {
    // Check if name or platform is empty
    if (!streamerData.name || !streamerData.platform) {
      reject(new Error('Name and platform are required'));
      return;
    }

    const db = connectToDatabase();
    const sql = 'INSERT INTO streamers (name, description, platform) VALUES (?, ?, ?)';

    db.run(sql, [streamerData.name, streamerData.description, streamerData.platform], function (error) {
      db.close();

      if (error) {
        reject(error);
      } else {
        streamerData.id = this.lastID;
        resolve(streamerData);
      }
    });
  });
};

