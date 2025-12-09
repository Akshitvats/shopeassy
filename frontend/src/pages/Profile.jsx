import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Edit2 } from 'lucide-react';
import { getApiUrl } from '../config/api';
import './Profile.css';

function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const { user, token, updateUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setName(user.name);
    setEmail(user.email);
  }, [user, navigate]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const updateData = { name, email };

      const response = await fetch(getApiUrl('/api/users/me'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();

      if (response.ok) {
        updateUser(data);
        setMessage('Profile updated successfully!');
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordMessage('');

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    setPasswordLoading(true);

    try {
      const response = await fetch(getApiUrl('/api/users/me'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ password: newPassword })
      });

      const data = await response.json();

      if (response.ok) {
        setPasswordMessage('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordError(data.message || 'Failed to change password');
      }
    } catch (error) {
      setPasswordError('Something went wrong. Please try again.');
    } finally {
      setPasswordLoading(false);
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="container">
      <div className="profile-settings">
        <div className="profile-header">
          <h1>Profile Settings</h1>
          <p className="profile-subtitle">Manage your profile information and account security</p>
        </div>

        <div className="profile-picture-section">
          <h3>Profile Picture</h3>
          <div className="profile-picture-container">
            <div className="profile-avatar">
              {user && getInitials(user.name)}
              <button className="edit-avatar-btn" aria-label="Edit profile picture">
                <Edit2 size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <div className="section-header">
            <div>
              <h3>Name</h3>
              <p className="section-description">This is the name other users will see</p>
            </div>
          </div>
          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleProfileUpdate} className="profile-form">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Akshit vats"
              required
              className="profile-input"
            />
            <div className="form-actions">
              <button type="button" className="btn-cancel">Cancel</button>
              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>

        <div className="profile-section">
          <div className="section-header">
            <div>
              <h3>Password</h3>
              <p className="section-description">Update your password regularly to stay secure</p>
            </div>
          </div>
          {passwordMessage && <div className="success-message">{passwordMessage}</div>}
          {passwordError && <div className="error-message">{passwordError}</div>}
          <form onSubmit={handlePasswordChange} className="password-form">
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
              className="profile-input"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="profile-input"
              required
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="profile-input"
              required
            />
            <button type="submit" className="btn-change-password" disabled={passwordLoading}>
              {passwordLoading ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
