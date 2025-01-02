import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartBar } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  return (
    <nav className="sidebar">
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <button className="nav-button" onClick={() => navigate('/admin')}>
            <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
            <span>Admin Module</span>
          </button>
        </li>
        <li className="sidebar-item">
          <button className="nav-button" onClick={() => navigate('/user')}>
            <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
            <span>User Module</span>
          </button>
        </li>
        <li className="sidebar-item">
          <button className="nav-button" onClick={() => navigate('/reports')}>
            <FontAwesomeIcon icon={faChartBar} className="sidebar-icon" />
            <span>Reports</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
