import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './App.css';

function Courses() {
  const [facultiesWithCourses, setFacultiesWithCourses] = useState([]);
  const [newCourseName, setNewCourseName] = useState('');
  const [selectedFacultyId, setSelectedFacultyId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize navigate

  // Fetch faculties and their courses
  useEffect(() => {
    const fetchFacultiesAndCourses = async () => {
      try {
        const facultiesResponse = await fetch('http://localhost:5000/api/faculties');
        if (!facultiesResponse.ok) throw new Error('Failed to fetch faculties');

        const faculties = await facultiesResponse.json();

        const facultyPromises = faculties.map(async (faculty) => {
          const coursesResponse = await fetch(`http://localhost:5000/api/courses?facultyId=${faculty.id}`);
          if (!coursesResponse.ok) throw new Error(`Failed to fetch courses for faculty ID ${faculty.id}`);
          const courses = await coursesResponse.json();
          return { ...faculty, courses };
        });

        const facultiesWithCourses = await Promise.all(facultyPromises);
        setFacultiesWithCourses(facultiesWithCourses);
      } catch (err) {
        console.error(err);
        setError('Error loading faculties and courses. Please refresh and try again.');
      }
    };

    fetchFacultiesAndCourses();
  }, []);

  // Handle adding a new course
  const handleAddCourse = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setError('');

    if (!newCourseName.trim() || !selectedFacultyId) {
      setError('Course name and faculty selection are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCourseName.trim(), faculty_id: selectedFacultyId }),
      });

      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(responseBody.error || 'Failed to add course');
      }

      const newCourse = await response.json();
      setSuccessMessage('Course added successfully!');
      setNewCourseName('');
      setSelectedFacultyId('');

      // Update the UI with the new course
      setFacultiesWithCourses((prev) =>
        prev.map((faculty) =>
          faculty.id === newCourse.faculty_id
            ? { ...faculty, courses: [...faculty.courses, newCourse] }
            : faculty
        )
      );
    } catch (err) {
      console.error('Error adding course:', err);
      setError(err.message || 'Failed to add course. Please try again.');
    }
  };

  return (
    <div className="courses-container">
      <h2>Faculties and Courses</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <form onSubmit={handleAddCourse} className="add-course-form">
        <input
          type="text"
          placeholder="Course Name"
          value={newCourseName}
          onChange={(e) => setNewCourseName(e.target.value)}
          required
        />
        <select
          value={selectedFacultyId}
          onChange={(e) => setSelectedFacultyId(e.target.value)}
          required
        >
          <option value="">Select Faculty</option>
          {facultiesWithCourses.map((faculty) => (
            <option key={faculty.id} value={faculty.id}>
              {faculty.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Course</button>
      </form>

      <div className="faculties-container">
        {facultiesWithCourses.map((faculty) => (
          <div key={faculty.id} className="faculty-card">
            <h3>{faculty.name}</h3>
            <ul>
              {faculty.courses.map((course) => (
                <li key={course.id} className="course-item">
                  <p>{course.name}</p>
                  <button
                    className="apply-button"
                    onClick={() => navigate(`/applications?courseId=${course.id}`)}
                  >
                    Apply
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
