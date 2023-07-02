import React, { useState, useEffect } from "react";
import styles from "./StreamerRecord.module.css";
import { getStreamer } from "../../services/streamerService";

const StreamerRecord = ({ streamerId }) => {
  const [streamer, setStreamer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStreamer = async () => {
      try {
        const fetchedStreamer = await getStreamer(streamerId);
        setStreamer(fetchedStreamer);
        setLoading(false);
      } catch (error) {
        console.error("Error retrieving streamer:", error);
      }
    };

    fetchStreamer();
  }, [streamerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!streamer) {
    return <div>Streamer not found.</div>;
  }

  return (
    <div className={styles.contentBox}>
      <p>
        <span className={styles.boldText}>Name: </span>
        <span className={styles.recordContent}>{streamer.name}</span>
      </p>
      <p>
        <span className={styles.boldText}>Platform: </span>
        <span className={styles.recordContent}>{streamer.platform}</span>
      </p>
      <p>
        <span className={styles.boldText}>Description: </span>
        <span className={styles.recordContent}>{streamer.description}</span>
      </p>
    </div>
  );
};

export default StreamerRecord;
