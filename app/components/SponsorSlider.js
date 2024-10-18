// components/SponsorSlider.js
import React from 'react';
import './SponsorSlider.css';

const sponsors = [
    '/sponsor1.png',
    '/sponsor2.png',
    '/sponsor3.png',
    '/sponsor4.png',
    // Add more sponsor image paths here
];

const SponsorSlider = () => {
    return (
        <div className="sponsor-slider">
            <div className="sponsor-track">
                {sponsors.map((sponsor, index) => (
                    <div key={index} className="sponsor-item">
                        <img src={sponsor} alt={`Sponsor ${index + 1}`} />
                    </div>
                ))}
                {sponsors.map((sponsor, index) => (
                    <div key={index + sponsors.length} className="sponsor-item">
                        <img src={sponsor} alt={`Sponsor ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SponsorSlider;