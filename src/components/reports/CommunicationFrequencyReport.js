import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { db } from '../../firebase'; // Ensure the correct import path
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import './CommunicationFrequencyReport.css';

const CommunicationFrequencyReport = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({ company: '', startDate: '', endDate: '', method: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const q = query(collection(db, "communications"), orderBy("date")); // Adjust according to your collection name
    const querySnapshot = await getDocs(q);
    const fetchedData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setData(fetchedData);
    setFilteredData(fetchedData); // Set both data and filteredData
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
    applyFilters({ ...filter, [name]: value });
  };

  const applyFilters = (filter) => {
    let filtered = data;
    if (filter.company) {
      filtered = filtered.filter(item => item.company === filter.company);
    }
    if (filter.startDate) {
      filtered = filtered.filter(item => new Date(item.date) >= new Date(filter.startDate));
    }
    if (filter.endDate) {
      filtered = filtered.filter(item => new Date(item.date) <= new Date(filter.endDate));
    }
    if (filter.method) {
      filtered = filtered.filter(item => item.method === filter.method);
    }
    setFilteredData(filtered);
  };

  const chartData = {
    labels: ['Email', 'LinkedIn Post', 'Call'],
    datasets: [
      {
        label: 'Communication Frequency',
        data: [
          filteredData.filter(item => item.method === 'Email').length,
          filteredData.filter(item => item.method === 'LinkedIn Post').length,
          filteredData.filter(item => item.method === 'Call').length,
        ],
        backgroundColor: ['#007bff', '#28a745', '#ffc107'],
      },
    ],
  };

  return (
    <div className="communication-frequency-report">
      <h2>Communication Frequency Report</h2>
      <div className="filters">
        <label>
          Company:
          <input type="text" name="company" value={filter.company} onChange={handleFilterChange} placeholder="Company Name" />
        </label>
        <label>
          Start Date:
          <input type="date" name="startDate" value={filter.startDate} onChange={handleFilterChange} />
        </label>
        <label>
          End Date:
          <input type="date" name="endDate" value={filter.endDate} onChange={handleFilterChange} />
        </label>
        <label>
          Method:
          <select name="method" value={filter.method} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Email">Email</option>
            <option value="LinkedIn Post">LinkedIn Post</option>
            <option value="Call">Call</option>
          </select>
        </label>
      </div>
      <Bar data={chartData} />
    </div>
  );
};

export default CommunicationFrequencyReport;
