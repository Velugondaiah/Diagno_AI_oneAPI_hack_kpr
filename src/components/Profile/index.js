import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../Header';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaVenusMars, FaClock } from 'react-icons/fa';
import './index.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const history = useHistory();

    useEffect(() => {
        const token = Cookies.get('jwt_token');
        if (!token) {
            history.push('/login');
            return;
        }
        fetchUserProfile();
    }, [history]);

    const fetchUserProfile = async () => {
        try {
            const token = Cookies.get('jwt_token');
            const response = await fetch('http://localhost:3008/user-profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }

            const data = await response.json();
            setUserData(data);
            setLoading(false);
        } catch (error) {
            console.error('Fetch error:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    if (loading) return (
        <>
            <Header />
            <div className="loading-container">
                <div className="loader"></div>
                <p>Loading profile...</p>
            </div>
        </>
    );

    if (error) return (
        <>
            <Header />
            <div className="error-container">
                <div className="error">
                    <h3>Error Loading Profile</h3>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>
                        Try Again
                    </button>
                </div>
            </div>
        </>
    );

    return (
        <>
            <Header />
            <div className="profile-page">
                <div className="profile-sidebar">
                    <div className="profile-avatar">
                        <div className="avatar-circle">
                            {userData.firstname?.charAt(0)}{userData.lastname?.charAt(0)}
                        </div>
                        <h3>{userData.firstname} {userData.lastname}</h3>
                        <p className="user-role">Patient</p>
                    </div>
                    <div className="sidebar-menu">
                        <button 
                            className={activeTab === 'profile' ? 'active' : ''} 
                            onClick={() => setActiveTab('profile')}
                        >
                            Profile Information
                        </button>
                        <button 
                            className={activeTab === 'appointments' ? 'active' : ''} 
                            onClick={() => setActiveTab('appointments')}
                        >
                            My Appointments
                        </button>
                        <button 
                            className={activeTab === 'settings' ? 'active' : ''} 
                            onClick={() => setActiveTab('settings')}
                        >
                            Account Settings
                        </button>
                    </div>
                </div>
                
                <div className="profile-content">
                    {activeTab === 'profile' && (
                        <>
                            <div className="content-header">
                                <h2>Profile Information</h2>
                                <button className="edit-profile-btn">Edit Profile</button>
                            </div>
                            <div className="profile-grid">
                                <div className="profile-card">
                                    <div className="card-icon"><FaUser /></div>
                                    <div className="card-content">
                                        <h4>Username</h4>
                                        <p>{userData.username}</p>
                                    </div>
                                </div>
                                <div className="profile-card">
                                    <div className="card-icon"><FaEnvelope /></div>
                                    <div className="card-content">
                                        <h4>Email</h4>
                                        <p>{userData.email}</p>
                                    </div>
                                </div>
                                <div className="profile-card">
                                    <div className="card-icon"><FaPhone /></div>
                                    <div className="card-content">
                                        <h4>Phone</h4>
                                        <p>{userData.phoneNumber}</p>
                                    </div>
                                </div>
                                <div className="profile-card">
                                    <div className="card-icon"><FaCalendar /></div>
                                    <div className="card-content">
                                        <h4>Date of Birth</h4>
                                        <p>{userData.dateOfBirth}</p>
                                    </div>
                                </div>
                                <div className="profile-card">
                                    <div className="card-icon"><FaVenusMars /></div>
                                    <div className="card-content">
                                        <h4>Gender</h4>
                                        <p>{userData.gender}</p>
                                    </div>
                                </div>
                                <div className="profile-card">
                                    <div className="card-icon"><FaClock /></div>
                                    <div className="card-content">
                                        <h4>Member Since</h4>
                                        <p>{userData.created_at}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    
                    {activeTab === 'appointments' && (
                        <div className="appointments-section">
                            <h2>My Appointments</h2>
                            <p>Your appointment history will appear here.</p>
                        </div>
                    )}
                    
                    {activeTab === 'settings' && (
                        <div className="settings-section">
                            <h2>Account Settings</h2>
                            <p>Account settings and preferences will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;
        
