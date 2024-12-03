// src/components/Faculties.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css'; // Import your CSS file

function Faculties() {
  const [faculties, setFaculties] = useState([]);
  const [newFacultyName, setNewFacultyName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const instituteId = searchParams.get('instituteId');

  useEffect(() => {
    if (!instituteId) {
      setError('Institute ID is missing.');
      setLoading(false);
      return;
    }

    const fetchFaculties = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/faculties?instituteId=${instituteId}`);
        if (!response.ok) throw new Error('Failed to fetch faculties');
        const data = await response.json();
        setFaculties(data);
      } catch (error) {
        console.error('Error fetching faculties:', error);
        setError('Error fetching faculties. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFaculties();
  }, [instituteId]);

  const handleAddFaculty = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/faculties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newFacultyName,
          instituteId,
        }),
      });

      if (!response.ok) throw new Error('Failed to add faculty.');

      const newFaculty = await response.json();
      setSuccessMessage('Faculty added successfully!');
      setNewFacultyName('');
      setFaculties(prev => [...prev, newFaculty]);
    } catch (error) {
      console.error('Error adding faculty:', error);
      setError('Failed to add faculty. Please try again.');
    }
  };

  const handleDeleteFaculty = async (facultyId) => {
    if (!window.confirm('Are you sure you want to delete this faculty?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/faculties/${facultyId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete faculty.');

      setFaculties(faculties.filter(faculty => faculty.faculty_id !== facultyId));
      setSuccessMessage('Faculty deleted successfully!');
    } catch (error) {
      console.error('Error deleting faculty:', error);
      setError('Failed to delete faculty. Please try again.');
    }
  };

  return (
    <div className="faculties-container">
      <h2>Faculties</h2>
      
      {loading && <p className="loading">Loading faculties...</p>}
      
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      
      <form onSubmit={handleAddFaculty} className="add-faculty-form">
        <input
          type="text"
          placeholder="Faculty Name"
          value={newFacultyName}
          onChange={(e) => setNewFacultyName(e.target.value)}
          required
          className="faculty-input"
        />
        <button type="submit" className="add-faculty-button">Add Faculty</button>
      </form>

      <ul className="faculty-list">
        {faculties.map(faculty => (
          <li key={faculty.faculty_id} className="faculty-item">
            {faculty.name}
            <button 
              onClick={() => handleDeleteFaculty(faculty.faculty_id)} 
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Faculties;