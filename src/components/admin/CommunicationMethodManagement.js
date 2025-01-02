import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import './CommunicationMethodManagement.css'; // Import the CSS file

const CommunicationMethodManagement = () => {
  const [methods, setMethods] = useState([]);
  const [methodData, setMethodData] = useState({
    name: '',
    description: '',
    sequence: 1,
    mandatory: false
  });
  const [editIndex, setEditIndex] = useState(-1);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchMethods();
  }, []);

  const fetchMethods = async () => {
    const q = query(collection(db, "communicationMethods"), orderBy("sequence"));
    const querySnapshot = await getDocs(q);
    const methodsList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setMethods(methodsList);
  };

  const validate = () => {
    const errors = {};
    if (!methodData.name) errors.name = 'Name is required';
    if (!methodData.description) errors.description = 'Description is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMethodData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddMethod = async () => {
    if (!validate()) return;

    if (editIndex !== -1) {
      const methodRef = doc(db, "communicationMethods", methods[editIndex].id);
      await updateDoc(methodRef, methodData);
      setEditIndex(-1);
    } else {
      await addDoc(collection(db, "communicationMethods"), methodData);
    }
    fetchMethods();
    setMethodData({ name: '', description: '', sequence: 1, mandatory: false });
    setErrors({});
  };

  const handleEditMethod = (index) => {
    setMethodData(methods[index]);
    setEditIndex(index);
  };

  const handleDeleteMethod = async (index) => {
    const methodRef = doc(db, "communicationMethods", methods[index].id);
    await deleteDoc(methodRef);
    fetchMethods();
  };

  const handleSequenceChange = (increment) => {
    setMethodData((prevData) => ({
      ...prevData,
      sequence: prevData.sequence + increment
    }));
  };

  return (
    <div className="communication-method-management">
      <h2>Communication Method Management</h2>
      <form className="method-form">
        <label>
          Name: <span className="mandatory">*</span>
          <input type="text" name="name" value={methodData.name} onChange={handleChange} placeholder="Enter name" />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <label>
          Description: <span className="mandatory">*</span>
          <input type="text" name="description" value={methodData.description} onChange={handleChange} placeholder="Enter description" />
          {errors.description && <span className="error">{errors.description}</span>}
        </label>
        <label>
          Sequence:
          <div className="sequence-input">
            <button type="button" onClick={() => handleSequenceChange(-1)}>-</button>
            <input type="number" name="sequence" value={methodData.sequence} onChange={handleChange} />
            <button type="button" onClick={() => handleSequenceChange(1)}>+</button>
          </div>
        </label>
        <label>
          Mandatory:
          <input type="checkbox" name="mandatory" checked={methodData.mandatory} onChange={handleChange} />
        </label>
        <button type="button" className="add-method-button" onClick={handleAddMethod}>
          {editIndex !== -1 ? 'Update Method' : 'Add Method'}
        </button>
      </form>
      <div className="methods-list">
        <h3>Methods List</h3>
        <div className="methods-header">
          <div><strong>Name</strong></div>
          <div><strong>Description</strong></div>
          <div><strong>Sequence</strong></div>
          <div><strong>Mandatory</strong></div>
          <div><strong>Actions</strong></div>
        </div>
        <ul>
          {methods.map((method, index) => (
            <li key={index}>
              <div>{method.name}</div>
              <div>{method.description}</div>
              <div>{method.sequence}</div>
              <div>{method.mandatory ? 'Yes' : 'No'}</div>
              <div className="actions">
                <button onClick={() => handleEditMethod(index)}>Edit</button>
                <button onClick={() => handleDeleteMethod(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommunicationMethodManagement;
