import {
  retrieveAllStreamers,
  retrieveStreamerById,
  updateVoteCount,
  insertStreamer,
} from '../database.js';

export const getAllStreamers = async (req, res) => {
  try {
    const streamers = await retrieveAllStreamers();
    res.send(streamers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const getStreamerById = async (req, res) => {
  const streamerId = req.params.streamerId;

  try {
    const streamer = await retrieveStreamerById(streamerId);
    if (streamer) {
      res.send(streamer);
    } else {
      res.status(404).send('Streamer not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const voteForStreamer = async (req, res) => {
  const streamerId = req.params.streamerId;
  const voteType = req.body.voteType;

  try {
    const updatedCount = await updateVoteCount(streamerId, voteType);
    if (updatedCount > 0) {
      res.send({ message: 'Vote updated successfully' });
    } else {
      res.status(404).send('Streamer not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const createStreamer = async (req, res) => {
  const streamerData = req.body;

  try {
    const createdStreamer = await insertStreamer(streamerData);
    res.send(createdStreamer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
