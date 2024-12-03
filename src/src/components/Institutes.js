import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './App.css';

function Institutes() {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // State for adding a new institute
  const [newInstituteName, setNewInstituteName] = useState('');
  const [newInstituteEmail, setNewInstituteEmail] = useState('');
  const [newInstitutePassword, setNewInstitutePassword] = useState('');

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');

  // State to store faculties by institute_id
  const [faculties, setFaculties] = useState({});
  
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/institutes');
        if (!response.ok) {
          throw new Error('Failed to load institutes');
        }
        const data = await response.json();
        setInstitutes(data);
        
        // Fetch faculties for each institute
        data.forEach(async (institute) => {
          const facultyResponse = await fetch(`http://localhost:5000/api/faculties?instituteId=${institute.institute_id}`);
          if (facultyResponse.ok) {
            const facultyData = await facultyResponse.json();
            setFaculties((prevFaculties) => ({
              ...prevFaculties,
              [institute.institute_id]: facultyData
            }));
          }
        });
      } catch (error) {
        console.error('Error fetching institutes:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutes();
  }, []);

  const handleAddInstitute = async (e) => {
    e.preventDefault();

    if (!window.confirm('Are you sure you want to add this institute?')) return;

    try {
      const response = await fetch('http://localhost:5000/api/institutes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newInstituteName,
          email: newInstituteEmail,
          password: newInstitutePassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add institute.');
      }

      setSuccessMessage('Institute added successfully!');

      // Reset input fields
      setNewInstituteName('');
      setNewInstituteEmail('');
      setNewInstitutePassword('');

      // Fetch updated list of institutes
      const updatedResponse = await fetch('http://localhost:5000/api/institutes');
      const updatedData = await updatedResponse.json();
      setInstitutes(updatedData);
    } catch (error) {
      console.error('Error adding institute:', error);
      setError(error.message);
    }
  };

  const handleDeleteInstitute = async (id) => {
    if (!window.confirm('Are you sure you want to delete this institute?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/institutes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete institute.');
      }

      setSuccessMessage('Institute deleted successfully!');

      // Fetch updated list of institutes
      const updatedResponse = await fetch('http://localhost:5000/api/institutes');
      const updatedData = await updatedResponse.json();
      setInstitutes(updatedData);
    } catch (error) {
      console.error('Error deleting institute:', error);
      setError(error.message);
    }
  };

  // Filtered institutes based on search term
  const filteredInstitutes = institutes.filter(institute =>
    institute.name && institute.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="institutes-container">
      <h2 className="institutes-header">Institutes</h2>
      
      {/* Display success or error messages */}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {error && <div className="error">{error}</div>}

      {/* Search bar */}
      <input 
        type="text" 
        placeholder="Search Institutes..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="search-bar"
      />

      {/* Form for adding a new institute */}
      <form onSubmit={handleAddInstitute} className="add-institute-form">
        <h3>Add New Institute</h3>
        <input
          type="text"
          placeholder="Institute Name"
          value={newInstituteName}
          onChange={(e) => setNewInstituteName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newInstituteEmail}
          onChange={(e) => setNewInstituteEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newInstitutePassword}
          onChange={(e) => setNewInstitutePassword(e.target.value)}
          required
        />
        <button type="submit">Add Institute</button>
      </form>

      <table className="institutes-table">
        <thead>
          <tr>
            <th>Institute Name</th>
            <th>Email</th>
            <th>Faculties</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInstitutes.length > 0 ? (
            filteredInstitutes.map(institute => {
              const instituteFaculties = faculties[institute.institute_id] || [];
              return (
                <tr key={institute.institute_id}>
                  <td>{institute.name}</td>
                  <td>{institute.email}</td>
                  <td>
                    {instituteFaculties.length > 0 ? (
                      instituteFaculties.map(faculty => (
                        <div key={faculty.faculty_id}>
                          {faculty.name}
                          {/* Button for courses, links to Courses.js with faculty_id */}
                          <button
                            onClick={() => navigate(`/courses?facultyId=${faculty.faculty_id}`)}
                            className="courses-button"
                          >
                            Courses
                          </button>
                        </div>
                      ))
                    ) : (
                      <span>No faculties available</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => navigate(`/faculties?instituteId=${institute.institute_id}`)}
                      className="add-faculty-button"
                    >
                      Add Faculty
                    </button>
                    <button onClick={() => handleDeleteInstitute(institute.institute_id)} className="delete-button">Delete</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr><td colSpan="4" className="no-institutes">No institutes found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Institutes;
