import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const getStreamer = async (streamerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/streamers/${streamerId}`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving streamer:", error);
    throw error;
  }
};

export const createStreamer = async (streamerData) => {
  try {
    const response = await axios.post(`${BASE_URL}/streamers`, streamerData);
    return response.data;
  } catch (error) {
    console.error("Error creating streamer:", error);
    throw error;
  }
};

export const getStreamers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/streamers`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving streamers:", error);
    throw error;
  }
};

export const voteForStreamer = async (streamerId, voteType) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/streamers/${streamerId}/vote`,
      { voteType }
    );
    return response.data;
  } catch (error) {
    console.error("Error voting for streamer:", error);
    throw error;
  }
};
