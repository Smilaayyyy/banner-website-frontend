import React from 'react';
import CountdownTimer from './CountdownTimer';
import '../Banner.css';

function Banner({ description, link, isVisible, timer }) {
  return (
    <div className="banner">
      {isVisible && (
        <div className="banner-box">
          <p className="banner-description">{description}</p>
          <CountdownTimer initialTimer={timer} />
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="banner-link">
              Learn More
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default Banner;
