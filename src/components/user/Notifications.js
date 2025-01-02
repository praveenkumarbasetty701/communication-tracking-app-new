import React from 'react';
import './Notifications.css';

const Notifications = ({ communications = [] }) => {
  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      <div className="notifications-grid">
        <h3>Overdue Communications</h3>
        <ul className="overdue-list">
          {communications.length > 0 ? (
            communications
              .filter((comm) => comm.status === 'overdue')
              .map((comm, index) => (
                <li key={index}>{comm.name}: {comm.nextCommunication}</li>
              ))
          ) : (
            <li>No overdue communications</li>
          )}
        </ul>
      </div>
      <div className="notifications-grid">
        <h3>Today’s Communications</h3>
        <ul className="due-list">
          {communications.length > 0 ? (
            communications
              .filter((comm) => comm.status === 'due')
              .map((comm, index) => (
                <li key={index}>{comm.name}: {comm.nextCommunication}</li>
              ))
          ) : (
            <li>No communications due today</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
