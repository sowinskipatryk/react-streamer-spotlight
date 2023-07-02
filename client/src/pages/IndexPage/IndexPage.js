import React, { useState } from "react";
import StreamerSubmissionForm from "./StreamerSubmissionForm";
import StreamerList from "./StreamerList";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Backdrop from "../../components/Backdrop";

const IndexPage = () => {
  const [streamers, setStreamers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  return (
    <Container>
      <h1>Streamer Spotlight</h1>
      <Button onClick={() => setShowForm(true)} text="Add Streamer" />
      {showForm ? <Backdrop setShowForm={setShowForm} /> : ""}
      {showForm ? (
        <StreamerSubmissionForm
          streamers={streamers}
          setStreamers={setStreamers}
          setShowForm={setShowForm}
        />
      ) : (
        ""
      )}
      <StreamerList streamers={streamers} setStreamers={setStreamers} />
    </Container>
  );
};

export default IndexPage;
