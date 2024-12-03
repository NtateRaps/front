import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/applications')  // Adjust the URL as needed
      .then(response => setApplications(response.data))
      .catch(error => console.error('Error fetching applications:', error));
  }, []);

  return (
    <div>
      <h2>Applications</h2>
      <ul>
        {applications.map(application => (
          <li key={application.application_id}>
            Student ID: {application.student_id} - Course ID: {application.course_id} - Status: {application.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Applications;
