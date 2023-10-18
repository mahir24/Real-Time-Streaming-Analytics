import React, {useState, useEffect} from 'react';
import { simulateData } from './assets/simulateData';
import axios from 'axios';
import { response } from 'express';

const App: React.FC = () => {
  const[anime, setAnime] = useState<string>('');
  const[viewerCount, setViewerCount] = useState(0);
  const[avgWatchTime, setAvgWatchTime] = useState(0);
  const [analytics, setAnalytics] = useState({ viewerCount: 0, averageWatchTime: 0 });

  //use axios to send data to MySQL
  const sendDataToServer = (anime: string, viewerCount: number, averageWatchTime: number) => {
    axios.post('http://localhost:4000/insert', {
      anime,
      viewerCount,
      averageWatchTime
    })
    .then(response => {
      console.log('Data Sent:', response);
    })
    .catch(error => {
      console.log('Error sending Data:', error);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const {anime, viewerCount, avgWatchTime} = simulateData();

      setAnime(anime);
      setViewerCount(viewerCount);
      setAvgWatchTime(avgWatchTime);

      sendDataToServer(anime, viewerCount, avgWatchTime);
    }, 2000); // Generate new data every 2 seconds
    
    return () => clearInterval(interval);
  }, [])
  return (
    <div>
      <h1>Real-Time Anime Streaming Analytics Dashboard</h1>
      <p>Anime: {anime}</p>
      <p>Current Viewer Count: {viewerCount} anime lovers</p>
      <p>Average Watch Time: {avgWatchTime} minutes</p>
    </div>
  );
};

export default App;
