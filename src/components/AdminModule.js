import React, { useState } from 'react';
import './Module.css'; // Import the Module.css file
import './AdminModule.css'; // Import the AdminModule.css file
import CompanyManagement from './admin/CompanyManagement';
import CommunicationMethodManagement from './admin/CommunicationMethodManagement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function AdminModule() {
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionToggle = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="module-content"> {/* Add 'module-content' class */}
      <h1 className="admin-title">Admin Module</h1>
      <div className="admin-buttons">
        <button className="admin-button" onClick={() => handleSectionToggle('companyManagement')}>
          <FontAwesomeIcon icon={faBuilding} className="button-icon" /> Company Management
        </button>
        <button className="admin-button" onClick={() => handleSectionToggle('communicationManagement')}>
          <FontAwesomeIcon icon={faEnvelope} className="button-icon" /> Communication Management
        </button>
      </div>
      <div className="admin-container">
        {activeSection === 'companyManagement' && <CompanyManagement />}
        {activeSection === 'communicationManagement' && <CommunicationMethodManagement />}
      </div>
    </div>
  );
}

export default AdminModule;
