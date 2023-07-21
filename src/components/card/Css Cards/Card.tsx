import React from 'react';
import './card.module.css';

export const Card = () => {
  return (
    <div className="card-container">
      <main className="main-content">
        <div className="card-head">
          <a href="#" className="card-title">
            Equilibrium #3429
          </a>
          <div>
            <img
              src="https://i.postimg.cc/SQBzNQf1/image-avatar.png"
              alt="avatar"
              className="small-avatar"
            />
          </div>
        </div>
        <p className="card-subtitle">
          Our Equilibrium collection promotes balance and calm.
        </p>
        <div className="flex-row">
          <div className="coin-base">
            <h2 className="coin-text">0.041 ETH</h2>
          </div>
          <div className="time-left">
            <p className="time-text">3 days left</p>
          </div>
        </div>
      </main>
    </div>
  );
};
