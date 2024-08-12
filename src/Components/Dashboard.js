import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard({ updateBannerContent }) {
  const [description, setDescription] = useState('');
  const [timer, setTimer] = useState(10);
  const [link, setLink] = useState('');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Fetch existing banner content on component mount
    axios.get('http://localhost:3000/api/banner')
      .then(response => {
        const data = response.data;
        setDescription(data.description);
        setTimer(data.timer);
        setLink(data.link);
        setVisible(data.visible);
      })
      .catch(err => console.error(err));
  }, []);

  const updateBanner = () => {
    const updatedBanner = { description, timer, link, visible };
    axios.post('http://localhost:3000/api/banner', updatedBanner)
      .then(response => updateBannerContent(response.data))
      .catch(err => console.error(err));
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <label>
        Banner Description:
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      <label>
        Banner Timer (seconds):
        <input type="number" value={timer} onChange={e => setTimer(e.target.value)} />
      </label>
      <label>
        Banner Link:
        <input type="text" value={link} onChange={e => setLink(e.target.value)} />
      </label>
      <label>
        Banner Visible:
        <input type="checkbox" checked={visible} onChange={e => setVisible(e.target.checked)} />
      </label>
      <button onClick={updateBanner}>Update Banner</button>
    </div>
  );
}

export default Dashboard;
