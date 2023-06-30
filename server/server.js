import express from 'express';
import streamerRoutes from './routes/streamerRoutes';

const app = express();

// Mount the streamer routes
app.use('/streamers', streamerRoutes);

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
