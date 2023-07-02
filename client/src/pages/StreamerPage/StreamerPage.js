import React from "react";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import StreamerRecord from "./StreamerRecord";
import Container from "../../components/Container";

const StreamerPage = () => {
  const { streamerId } = useParams();
  return (
    <Container>
      <h1>Streamer Details</h1>
      <LazyLoadImage
        effect="blur" // Adds a blur effect when image is loading
        src={`/images/${streamerId % 3}.png`}
        alt="Placeholder"
        width={300}
        height={300}
        style={{ borderRadius: "50%", border: "5px solid white" }}
      />
      <StreamerRecord streamerId={streamerId} />
    </Container>
  );
};

export default StreamerPage;
