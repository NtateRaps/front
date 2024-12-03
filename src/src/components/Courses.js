import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access query params
import './App.css'; // Import your CSS file

function Courses() {
  const [courses, setCourses] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [newCourseName, setNewCourseName] = useState('');
  const [selectedFacultyId, setSelectedFacultyId] = useState('');
  const [loading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Use location to get facultyId from query params
  const location = useLocation();
  const facultyIdFromUrl = new URLSearchParams(location.search).get('facultyId');

  // Fetch courses based on facultyId (from URL if provided, or all courses if not)
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const url = facultyIdFromUrl 
          ? `http://localhost:5000/api/courses?facultyId=${facultyIdFromUrl}`
          : 'http://localhost:5000/api/courses'; // Fetch all courses if no facultyId

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Error fetching courses. Please try again.');
      }
    };

    // Fetch faculties list for course selection in the form
    const fetchFaculties = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/faculties');
        if (!response.ok) throw new Error('Failed to fetch faculties');
        const data = await response.json();
        setFaculties(data);
      } catch (error) {
        console.error('Error fetching faculties:', error);
        setError('Error fetching faculties. Please try again.');
      }
    };

    fetchCourses();
    fetchFaculties();
  }, [facultyIdFromUrl]);

  // Handle adding a new course
  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newCourseName,
          faculty_id: selectedFacultyId,
        }),
      });

      if (!response.ok) throw new Error('Failed to add course.');

      const newCourse = await response.json();
      setSuccessMessage('Course added successfully!');
      setNewCourseName('');
      setSelectedFacultyId('');
      setCourses((prevCourses) => [...prevCourses, newCourse]);
    } catch (error) {
      console.error('Error adding course:', error);
      setError('Failed to add course. Please try again.');
    }
  };

  // Handle course selection for modal
  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="courses-container">
      <h2>Courses</h2>

      {loading && <p className="loading">Loading courses...</p>}
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <form onSubmit={handleAddCourse} className="add-course-form">
        <input
          type="text"
          placeholder="Course Name"
          value={newCourseName}
          onChange={(e) => setNewCourseName(e.target.value)}
          required
          className="course-input"
        />

        <select 
          value={selectedFacultyId} 
          onChange={(e) => setSelectedFacultyId(e.target.value)} 
          required
          className="faculty-select"
        >
          <option value="">Select Faculty</option>
          {faculties.map((faculty) => (
            <option key={faculty.faculty_id} value={faculty.faculty_id}>
              {faculty.name}
            </option>
          ))}
        </select>

        <button type="submit" className="add-course-button">Add Course</button>
      </form>

      <ul className="courses-list">
        {courses.map((course) => (
          <li
            key={course.course_id}
            className="course-item"
            onClick={() => handleCourseClick(course)}
          >
            <h3>{course.name}</h3>
            <p>Faculty ID: {course.faculty_id}</p>
          </li>
        ))}
      </ul>

      {selectedCourse && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h3>{selectedCourse.name}</h3>
            <p><strong>Faculty ID:</strong> {selectedCourse.faculty_id}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;
