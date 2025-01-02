import React, { useState, useEffect } from 'react';
import './CompanyManagement.css'; 
import { db } from '../../firebase'; 
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'; 

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [companyData, setCompanyData] = useState({
    name: '',
    location: '',
    linkedIn: '',
    emails: '',
    phoneNumbers: '',
    comments: '',
    periodicity: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage] = useState(5);

  const [editIndex, setEditIndex] = useState(-1);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const querySnapshot = await getDocs(collection(db, "companies"));
    const companiesList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setCompanies(companiesList);
    setFilteredCompanies(companiesList);
  };

  const validate = () => {
    const errors = {};
    if (!companyData.name) errors.name = 'Name is required';
    if (!companyData.location) errors.location = 'Location is required';
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(companyData.emails)) errors.emails = 'Invalid email format';
    const linkedInPattern = /^https:\/\/(www\.)?linkedin\.com\/.*$/;
    if (!linkedInPattern.test(companyData.linkedIn)) errors.linkedIn = 'Invalid LinkedIn URL';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddCompany = async () => {
    if (!validate()) return;

    if (editIndex !== -1) {
      const companyRef = doc(db, "companies", companies[editIndex].id);
      await updateDoc(companyRef, companyData);
      setEditIndex(-1);
    } else {
      await addDoc(collection(db, "companies"), companyData);
    }
    fetchCompanies();
    setCompanyData({
      name: '',
      location: '',
      linkedIn: '',
      emails: '',
      phoneNumbers: '',
      comments: '',
      periodicity: ''
    });
    setErrors({});
  };

  const handleEditCompany = (index) => {
    setCompanyData(companies[index]);
    setEditIndex(index);
  };

  const handleDeleteCompany = async (index) => {
    const companyRef = doc(db, "companies", companies[index].id);
    await deleteDoc(companyRef);
    fetchCompanies();
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = companies.filter(company =>
      company.name.toLowerCase().includes(query)
    );
    setFilteredCompanies(filtered);
    setCurrentPage(1); // Reset to first page on new search
  };

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="company-management">
      <h2>Company Management</h2>
      <form className="company-form">
        <label>
          Name: <span className="mandatory">*</span>
          <input type="text" name="name" value={companyData.name} onChange={handleChange} placeholder="Enter name" />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <label>
          Location: <span className="mandatory">*</span>
          <input type="text" name="location" value={companyData.location} onChange={handleChange} placeholder="Enter location" />
          {errors.location && <span className="error">{errors.location}</span>}
        </label>
        <label>
          LinkedIn Profile: <span className="mandatory">*</span>
          <input type="url" name="linkedIn" value={companyData.linkedIn} onChange={handleChange} placeholder="Enter LinkedIn profile URL" />
          {errors.linkedIn && <span className="error">{errors.linkedIn}</span>}
        </label>
        <label>
          Emails: <span className="mandatory">*</span>
          <input type="email" name="emails" value={companyData.emails} onChange={handleChange} placeholder="Enter email" />
          {errors.emails && <span className="error">{errors.emails}</span>}
        </label>
        <label>
          Phone Numbers:
          <input type="text" name="phoneNumbers" value={companyData.phoneNumbers} onChange={handleChange} placeholder="Enter phone numbers" />
        </label>
        <label>
          Comments:
          <input type="text" name="comments" value={companyData.comments} onChange={handleChange} placeholder="Enter comments" />
        </label>
        <label>
          Communication Periodicity:
          <input type="text" name="periodicity" value={companyData.periodicity} onChange={handleChange} placeholder="Enter periodicity" />
        </label>
        <button type="button" className="add-company-button" onClick={handleAddCompany}>
          {editIndex !== -1 ? 'Update Company' : 'Add Company'}
        </button>
      </form>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ margin: '20px 0', padding: '8px', width: '100%', boxSizing: 'border-box' }}
      />
      <div className="companies-list">
        <h3>Companies List</h3>
        <div className="companies-header">
          <div><strong>Name</strong></div>
          <div><strong>Location</strong></div>
          <div><strong>LinkedIn Profile</strong></div>
          <div><strong>Emails</strong></div>
          <div><strong>Phone Numbers</strong></div>
          <div><strong>Comments</strong></div>
          <div><strong>Communication Periodicity</strong></div>
          <div><strong>Actions</strong></div>
        </div>
        <ul>
          {currentCompanies.map((company, index) => (
            <li key={index}>
              <div>{company.name}</div>
              <div>{company.location}</div>
              <div>{company.linkedIn}</div>
              <div>{company.emails}</div>
              <div>{company.phoneNumbers}</div>
              <div>{company.comments}</div>
              <div>{company.periodicity}</div>
              <div className="actions">
                <button onClick={() => handleEditCompany(index)}>Edit</button>
                <button onClick={() => handleDeleteCompany(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="pagination">
          {[...Array(Math.ceil(filteredCompanies.length / companiesPerPage)).keys()].map(number => (
            <button key={number + 1} onClick={() => paginate(number + 1)}>
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyManagement;
