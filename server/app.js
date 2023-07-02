import express from 'express';
import cors from 'cors';
import { createTableIfNotExists, insertInitialData } from './database.js';
import streamerRoutes from './routes/streamerRoutes.js';
import bodyParser from 'body-parser';

const app = express();

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(bodyParser.json());

app.use(cors());

createTableIfNotExists()
  .then((tableExists) => {
    if (!tableExists) {
      // Table was created, insert initial data
      return insertInitialData();
    } else {
      // Table already exists, no need to insert initial data
      return Promise.resolve();
    }
  })
  .then(() => {
    // Table exists or has been created successfully
    app.use('/streamers', streamerRoutes);
  })
  .catch((error) => {
    console.error('Error creating table:', error);
  });

export default app;