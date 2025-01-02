import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AdminModule from './components/AdminModule';
import UserModule from './components/UserModule';
import ReportsModule from './components/ReportsModule';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="main-container">
          <Sidebar />
          <main className="content">
            <Routes>
              <Route path="/admin" element={<AdminModule />} />
              <Route path="/user" element={<UserModule />} />
              <Route path="/reports" element={<ReportsModule />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
