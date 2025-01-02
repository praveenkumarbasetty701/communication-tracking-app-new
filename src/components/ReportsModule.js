import React, { useState } from 'react';
import './Module.css'; // Import the Module.css file
import './ReportsModule.css'; // Import the ReportsModule.css file
import ReportView from './reports/ReportView';
import CommunicationFrequencyReport from './reports/CommunicationFrequencyReport';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faChartPie } from '@fortawesome/free-solid-svg-icons';

function ReportsModule() {
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionToggle = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="module-content"> {/* Add 'module-content' class */}
      <h1 className="report-title">Reports Module</h1>
      <div className="report-buttons">
        <button className="report-button" onClick={() => handleSectionToggle('reportView')}>
          <FontAwesomeIcon icon={faChartBar} className="button-icon" /> View Reports
        </button>
        <button className="report-button" onClick={() => handleSectionToggle('communicationFrequency')}>
          <FontAwesomeIcon icon={faChartPie} className="button-icon" /> Communication Frequency
        </button>
      </div>
      <div className="report-container">
        {activeSection === 'reportView' && <ReportView />}
        {activeSection === 'communicationFrequency' && <CommunicationFrequencyReport />}
      </div>
    </div>
  );
}

export default ReportsModule;
