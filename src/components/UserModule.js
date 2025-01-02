import React, { useState } from 'react';
import './Module.css'; // Import the Module.css file
import './UserModule.css'; // Import the UserModule.css file
import Dashboard from './user/Dashboard';
import CommunicationPerformedModal from './user/CommunicationPerformedModal';
import Notifications from './user/Notifications';
import CalendarView from './user/CalendarView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faComments, faBell, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

function UserModule() {
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionToggle = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="module-content"> {/* Add 'module-content' class */}
      <h1 className="user-title">User Module</h1>
      <div className="user-buttons">
        <button className="user-button" onClick={() => handleSectionToggle('dashboard')}>
          <FontAwesomeIcon icon={faTachometerAlt} className="button-icon" /> Dashboard
        </button>
        <button className="user-button" onClick={() => handleSectionToggle('communication')}>
          <FontAwesomeIcon icon={faComments} className="button-icon" /> Log Communication
        </button>
        <button className="user-button" onClick={() => handleSectionToggle('notifications')}>
          <FontAwesomeIcon icon={faBell} className="button-icon" /> Notifications
        </button>
        <button className="user-button" onClick={() => handleSectionToggle('calendar')}>
          <FontAwesomeIcon icon={faCalendarAlt} className="button-icon" /> Calendar View
        </button>
      </div>
      <div className="user-container">
        {activeSection === 'dashboard' && <Dashboard />}
        {activeSection === 'communication' && <CommunicationPerformedModal />}
        {activeSection === 'notifications' && <Notifications />}
        {activeSection === 'calendar' && <CalendarView />}
      </div>
    </div>
  );
}

export default UserModule;
