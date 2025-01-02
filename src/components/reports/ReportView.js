import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Ensure the correct import path
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import './ReportView.css';

const ReportView = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filter, setFilter] = useState({ type: '', date: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const q = query(collection(db, "communications"), orderBy("date")); // Adjust according to your collection name
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setReports(data);
    setFilteredReports(data); // Set both reports and filteredReports
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
    applyFilters({ ...filter, [name]: value });
  };

  const applyFilters = (filter) => {
    let filtered = reports;
    if (filter.type) {
      filtered = filtered.filter(report => report.type === filter.type);
    }
    if (filter.date) {
      filtered = filtered.filter(report => new Date(report.date) >= new Date(filter.date));
    }
    setFilteredReports(filtered);
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + filteredReports.map(report => `${report.title},${report.date},${report.type},${report.content}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "reports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="report-view">
      <h2>Reports</h2>
      <div className="report-filters">
        <label>
          Type:
          <select name="type" value={filter.type} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Annual">Annual</option>
          </select>
        </label>
        <label>
          Date:
          <input type="date" name="date" value={filter.date} onChange={handleFilterChange} />
        </label>
        <button onClick={handleExport}>Export Reports</button>
      </div>
      <ul className="report-list">
        {filteredReports.map((report) => (
          <li key={report.id} className="report-item">
            <h3>{report.title}</h3>
            <p>{report.content}</p>
            <small>{new Date(report.date).toDateString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportView;
