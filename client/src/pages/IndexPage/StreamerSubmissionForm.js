import React, { useState } from "react";
import { createStreamer } from "../../services/streamerService";
import styles from "./StreamerSubmissionForm.module.css";
import Modal from "../../components/Modal";
import Button from "../../components/Button";

const StreamerSubmissionForm = ({ streamers, setStreamers, setShowForm }) => {
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newStreamer = {
      id: "",
      name,
      platform,
      description,
      upvotes: 0,
      downvotes: 0,
    };

    try {
      const createdStreamer = await createStreamer(newStreamer);
      setStreamers([createdStreamer, ...streamers]);

      // Clear form inputs
      setShowForm(false);
      setPlatform("");
      setDescription("");
    } catch (error) {
      console.error("Error inserting streamer:", error);
      // TODO: Display an error message
    }
  };

  return (
    <Modal>
      <div className={styles.formContainer}>
        <h2>Streamer Submission Form</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputBox}>
            <label htmlFor="name">
              Name:
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={styles.inputField}
                required
              />
            </label>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="platform">
              Streaming Platform:
              <select
                id="platform"
                value={platform}
                onChange={(event) => setPlatform(event.target.value)}
                className={styles.inputField}
                required
              >
                <option value="">Select Platform</option>
                <option value="Twitch">Twitch</option>
                <option value="YouTube">YouTube</option>
                <option value="TikTok">TikTok</option>
                <option value="Kick">Kick</option>
                <option value="Rumble">Rumble</option>
              </select>
            </label>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="description">Description:</label>
          </div>
          <div>
            <textarea
              id="description"
              name="description"
              rows="4"
              cols="40"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className={styles.inputField}
              style={{ resize: "none" }}
            ></textarea>
          </div>
          <Button type="submit" className={styles.submitButton} text="Submit" />
          <Button
            text="Close"
            onClick={() => setShowForm(false)}
            buttonColor="red"
          />
        </form>
      </div>
    </Modal>
  );
};

export default StreamerSubmissionForm;
