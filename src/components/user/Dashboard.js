import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Notifications from './Notifications';
import './Dashboard.css';

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [communications, setCommunications] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const q = query(collection(db, "companies"), orderBy("name"));
    const querySnapshot = await getDocs(q);
    const companiesList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      lastFiveCommunications: doc.data().lastFiveCommunications || [],
      nextScheduledCommunication: doc.data().nextScheduledCommunication || { type: '', date: '' }
    }));
    setCompanies(companiesList);
    determineNotifications(companiesList);
  };

  const determineNotifications = (companiesList) => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    const newNotifications = [];
    const newCommunications = [];

    companiesList.forEach(company => {
      const nextCommunication = company.nextScheduledCommunication;
      if (nextCommunication.date < currentDate) {
        newNotifications.push({
          type: 'overdue',
          message: `Communication with ${company.name} is overdue. Last scheduled on ${nextCommunication.date}.`
        });
        newCommunications.push({
          name: company.name,
          nextCommunication: nextCommunication.date,
          status: 'overdue'
        });
      } else if (nextCommunication.date === currentDate) {
        newNotifications.push({
          type: 'due',
          message: `Communication with ${company.name} is due today.`
        });
        newCommunications.push({
          name: company.name,
          nextCommunication: nextCommunication.date,
          status: 'due'
        });
      }
    });

    setNotifications(newNotifications);
    setCommunications(newCommunications);
  };

  const notificationCount = notifications.length;

  return (
    <div>
      <div className="header">
        <h2>Dashboard</h2>
        <div className="notification-icon">
          <span className="icon">🔔</span>
          {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
        </div>
      </div>
      {notificationCount > 0 && <Notifications communications={communications} />}
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Last Five Communications</th>
            <th>Next Scheduled Communication</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id} className={company.highlight || ''}>
              <td>{company.name}</td>
              <td>
                {company.lastFiveCommunications.map((comm, index) => (
                  <span key={index} data-tooltip-id={`tooltip-${company.id}-${index}`} data-tooltip-content={comm.notes || ''}>
                    {comm.type} ({comm.date}){index < company.lastFiveCommunications.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </td>
              <td>{company.nextScheduledCommunication.type || ''} ({company.nextScheduledCommunication.date || ''})</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
