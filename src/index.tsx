import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout/Layout';
import VideoCardContainer from './components/VideoCardContainer/VideoCardContainer';
import sampleVideos from './videos';
import VideoDetail from './components/VideoDetail/VideoDetail';
import MainSearchBar from './components/MainSearchBar/MainSearchBar';
import Playlist from './components/Playlist/Playlist';
import PlaylistViewer from './components/PlaylistViewer/PlaylistViewer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<VideoCardContainer videosArray={sampleVideos}/>} />
          <Route path="video/:videoId" element={<VideoDetail />} />
          <Route path="playlist" element={<PlaylistViewer />} />
          <Route path="playlist/:playlistId" element={<Playlist />} />
          <Route path="search" element={<MainSearchBar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
