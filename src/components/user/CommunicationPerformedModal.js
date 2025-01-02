import React, { useState } from 'react';
import { db } from '../../firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import './CommunicationPerformedModal.css';

const CommunicationPerformedModal = () => {
  const [communication, setCommunication] = useState({
    type: '',
    date: '',
    notes: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommunication((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with the ID of the selected company
      const companyId = "8voKee0uIiwNbbbGxu5a"; 
      const companyRef = doc(db, "companies", companyId);

      // Get current document data
      const companyDoc = await getDoc(companyRef);
      const companyData = companyDoc.data();

      // Add new communication and keep only the last five communications
      const updatedCommunications = [
        ...companyData.lastFiveCommunications,
        { type: communication.type, date: communication.date, notes: communication.notes }
      ].slice(-5);

      // Update lastFiveCommunications and nextScheduledCommunication
      await updateDoc(companyRef, {
        lastFiveCommunications: updatedCommunications,
        nextScheduledCommunication: { type: communication.type, date: communication.date }
      });

      console.log("Communication logged:", communication);

      // Reset form
      setCommunication({
        type: '',
        date: '',
        notes: ''
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error logging communication:", error);
    }
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="open-modal-button">Log Communication</button>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Log Communication</h2>
            <form onSubmit={handleSubmit} className="communication-form">
              <label>
                Type of Communication: <span className="mandatory">*</span>
                <select name="type" value={communication.type} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="LinkedIn Post">LinkedIn Post</option>
                  <option value="Email">Email</option>
                  <option value="Call">Call</option>
                </select>
              </label>
              <label>
                Date of Communication: <span className="mandatory">*</span>
                <input type="date" name="date" value={communication.date} onChange={handleChange} required />
              </label>
              <label>
                Notes:
                <textarea name="notes" value={communication.notes} onChange={handleChange} placeholder="Add notes..."></textarea>
              </label>
              <button type="submit" className="submit-button">Submit</button>
              <button type="button" onClick={() => setIsModalOpen(false)} className="close-button">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationPerformedModal;
