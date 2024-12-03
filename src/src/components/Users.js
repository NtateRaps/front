import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch users from the server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError('Error fetching users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle adding a new user
  const handleAddUser = async () => {
    if (!email || !userType) {
      setError('Please fill in both email and user type');
      return;
    }

    const newUser = { email, user_type: userType };

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) throw new Error('Failed to add user');

      const data = await response.json();
      setUsers([...users, data]);
      setEmail('');
      setUserType('');
      setIsAddFormVisible(false);
      setError('');
    } catch (err) {
      setError('Error adding user. Please try again later.');
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete user');
        }

        setUsers(users.filter((user) => user.id !== userId));
        setError('');
      } catch (err) {
        setError(`Error deleting user: ${err.message}`);
      }
    }
  };

  return (
    <div className="users-container">
      <h2>Users</h2>

      {error && <div className="error-message">{error}</div>}

      <button className="add-user-toggle" onClick={() => setIsAddFormVisible(!isAddFormVisible)}>
        {isAddFormVisible ? 'Cancel' : 'Add User'}
      </button>

      {isAddFormVisible && (
        <div className="add-user-form">
          <input
            type="email"
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="input-field"
            required
          >
            <option value="">Select User Type</option>
            <option value="student">Student</option>
            <option value="institute">Institute</option>
          </select>
          <button className="submit-button" onClick={handleAddUser}>
            Add User
          </button>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>User Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}> {/* Use a unique identifier */}
                <td>{user.email}</td>
                <td>{user.user_type}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;
