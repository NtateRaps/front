import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';

function Applications() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');
  const [courseName, setCourseName] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applications, setApplications] = useState([]); // State for applications list
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch course details on mount
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${courseId}`);
        if (!response.ok) throw new Error('Failed to fetch course details');
        const course = await response.json();
        setCourseName(course.name);
      } catch (err) {
        console.error(err);
        setError('Error loading course details.');
      }
    };

    if (courseId) {
      fetchCourseDetails();
      fetchApplications(); // Fetch applications when courseId changes
    }
  }, [courseId]);

  // Fetch applications for the course
  const fetchApplications = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/applications?courseId=${courseId}`);
      if (!response.ok) throw new Error('Failed to fetch applications');
      const data = await response.json();
      setApplications(data);
    } catch (err) {
      console.error(err);
      setError('Error loading applications.');
    }
  };

  // Handle application submission
  const handleApply = async (e) => {
    e.preventDefault();

    if (!applicantName.trim() || !applicantEmail.trim()) {
      setError('Name and email are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, name: applicantName.trim(), email: applicantEmail.trim() }),
      });

      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(responseBody.error || 'Failed to submit application');
      }

      setSuccessMessage('Application submitted successfully!');
      setApplicantName('');
      setApplicantEmail('');
      fetchApplications(); // Refresh the applications list
    } catch (err) {
      console.error('Error submitting application:', err);
      setError(err.message || 'Failed to submit application. Please try again.');
    }
  };

  // Handle application status update
  const updateApplicationStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update application status');
      fetchApplications(); // Refresh the applications list
    } catch (err) {
      console.error('Error updating application status:', err);
      setError('Failed to update application status.');
    }
  };

  return (
    <div className="applications-container">
      <h2>Application for {courseName}</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      {/* Application Form */}
      <form onSubmit={handleApply} className="application-form">
        <input
          type="text"
          placeholder="Your Name"
          value={applicantName}
          onChange={(e) => setApplicantName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={applicantEmail}
          onChange={(e) => setApplicantEmail(e.target.value)}
          required
        />
        <button type="submit">Submit Application</button>
      </form>

      {/* Applications Table */}
      <h3>Applications List</h3>
      <table className="applications-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.name}</td>
              <td>{app.email}</td>
              <td>{app.status}</td>
              <td>
                {app.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateApplicationStatus(app.id, 'approved')}
                      className="approve-button"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(app.id, 'rejected')}
                      className="reject-button"
                    >
                      Reject
                    </button>
                  </>
                )}
                {app.status !== 'pending' && <span>No Actions</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Applications;