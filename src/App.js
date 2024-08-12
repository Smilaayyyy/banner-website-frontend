import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Banner from './Components/Banner';
import './App.css';


function App() {
  const [bannerContent, setBannerContent] = useState({
    description: '',
    timer: 10,
    link: '',
    isVisible: true,
  });
  const [currentTimer, setCurrentTimer] = useState(0);

  const fetchBannerContent = () => {
    axios.get('http://localhost:10000/api/banner')
      .then(response => {
        setBannerContent(response.data);
        setCurrentTimer(response.data.timer);  // Reset the timer each time new data is fetched
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    // Fetch banner content initially
    fetchBannerContent();

    // Poll for updates every 5 seconds
    const intervalId = setInterval(fetchBannerContent, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Handle the countdown timer
    if (currentTimer > 0) {
      const timerId = setInterval(() => {
        setCurrentTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(timerId); // Clear the timer on component unmount or when the timer ends
    }
  }, [currentTimer]);

  if (!bannerContent.isVisible || currentTimer <= 0) {
    return null; // Don't render the banner if it's not visible or the timer has ended
  }

  return (
    <div className="App">
      <Banner 
        description={bannerContent.description} 
        link={bannerContent.link} 
        isVisible={bannerContent.isVisible}
        timer={bannerContent.timer} 
      />
       <Banner fetchBannerContent={fetchBannerContent} />
    </div>
  );
}

export default App;

