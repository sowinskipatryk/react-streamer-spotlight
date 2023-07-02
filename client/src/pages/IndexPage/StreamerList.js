import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getStreamers, voteForStreamer } from "../../services/streamerService";
import styles from "./StreamerList.module.css";
import Button from "../../components/Button";

const StreamerList = ({ streamers, setStreamers }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStreamers = async () => {
      try {
        const fetchedStreamers = await getStreamers();
        setStreamers(fetchedStreamers.reverse());
        setLoading(false);
      } catch (error) {
        console.error("Error retrieving streamers:", error);
      }
    };

    fetchStreamers();
  }, []);

  const updateVoteCounts = (streamerId, voteType) => {
    setStreamers((prevStreamers) =>
      prevStreamers.map((streamer) => {
        if (streamer.id === streamerId) {
          if (voteType === "upvote") {
            return { ...streamer, upvotes: streamer.upvotes + 1 };
          } else if (voteType === "downvote") {
            return { ...streamer, downvotes: streamer.downvotes + 1 };
          }
        }
        return streamer;
      })
    );
  };

  const handleVote = async (streamerId, voteType) => {
    try {
      await voteForStreamer(streamerId, voteType);
      updateVoteCounts(streamerId, voteType);
      console.log("Vote updated successfully");
    } catch (error) {
      console.error("Error updating vote count:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (streamers.length === 0) {
    return <div>No streamers found.</div>;
  }

  return (
    <div className={styles.streamerListContainer}>
      <ul className={styles.streamerList}>
        {streamers.map((streamer) => (
          <li key={streamer.id} className={styles.streamerItem}>
            <p className={styles.streamerName}>
              Name:{" "}
              <Link to={`/streamers/${streamer.id}`}>{streamer.name}</Link>
            </p>
            <p>
            <span className='upvotes'>{streamer.upvotes}</span>
              <Button
                onClick={() => handleVote(streamer.id, "upvote")}
                className={`${styles.voteButton} ${styles.upvoteButton}`}
                text="+"
                buttonColor='green'
              ></Button>
              <Button
                onClick={() => handleVote(streamer.id, "downvote")}
                className={`${styles.voteButton} ${styles.downvoteButton}`}
                text="-"
                buttonColor='red'
              ></Button>
              <span className='downvotes'>{streamer.downvotes}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamerList;
