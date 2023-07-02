import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage/IndexPage";
import StreamerPage from "./pages/StreamerPage/StreamerPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/streamers/:streamerId" element={<StreamerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
