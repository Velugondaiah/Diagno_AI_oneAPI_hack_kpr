import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
<<<<<<< HEAD
import './index.css';

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
=======
<<<<<<< HEAD
import './index.css';

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
=======
import Header from '../Header';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaVenusMars, FaClock } from 'react-icons/fa';
import './index.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const history = useHistory();
>>>>>>> 57255db63019848dae9569612ef4e4c7f2b4b4f5
>>>>>>> a86ec2886da0fa7cf5e23bba64238e91a5234ec0

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
<<<<<<< HEAD
                
                const jwtToken = Cookies.get('jwt_token');
               const userId = JSON.parse(localStorage.getItem('userData'));
                console.log(userId)
                console.log("sur")
=======
                const jwtToken = Cookies.get('jwt_token');
                const userId = localStorage.getItem('user_id');

<<<<<<< HEAD
>>>>>>> a86ec2886da0fa7cf5e23bba64238e91a5234ec0
                if (!jwtToken) {
                    throw new Error('Authentication required');
                }

                const response = await fetch(`http://localhost:3008/api/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
<<<<<<< HEAD
                    console.log("sccess")
=======
>>>>>>> a86ec2886da0fa7cf5e23bba64238e91a5234ec0
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch user details');
                }

                const data = await response.json();
                setUserDetails(data);
            } catch (err) {
                console.error('Profile fetch error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
<<<<<<< HEAD
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error">
                    <h3>Error loading profile</h3>
                    <p>{error}</p>
=======
=======
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
>>>>>>> 57255db63019848dae9569612ef4e4c7f2b4b4f5
            }
        };

<<<<<<< HEAD
        fetchUserProfile();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error">
                    <h3>Error loading profile</h3>
                    <p>{error}</p>
=======
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
>>>>>>> a86ec2886da0fa7cf5e23bba64238e91a5234ec0
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2>User Profile</h2>
            </div>
            
            <div className="profile-details">
                <div className="detail-item">
                    <span>Username</span>
                    <div>{userDetails.username}</div>
                </div>
                
                <div className="detail-item">
                    <span>First Name</span>
                    <div>{userDetails.firstname}</div>
                </div>
                
                <div className="detail-item">
                    <span>Last Name</span>
                    <div>{userDetails.lastname}</div>
                </div>
                
                <div className="detail-item">
                    <span>Email</span>
                    <div>{userDetails.email}</div>
                </div>
                
                <div className="detail-item">
                    <span>Phone</span>
                    <div>{userDetails.phoneNumber}</div>
                </div>
                
                <div className="detail-item">
                    <span>Date of Birth</span>
                    <div>{userDetails.dateOfBirth}</div>
                </div>
                
                <div className="detail-item">
                    <span>Gender</span>
                    <div>{userDetails.gender}</div>
                </div>
            </div>
        </div>
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
>>>>>>> 57255db63019848dae9569612ef4e4c7f2b4b4f5
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2>User Profile</h2>
            </div>
            
            <div className="profile-details">
                <div className="detail-item">
                    <span>Username</span>
                    <div>{userDetails.username}</div>
                </div>
                
                <div className="detail-item">
                    <span>First Name</span>
                    <div>{userDetails.firstname}</div>
                </div>
                
                <div className="detail-item">
                    <span>Last Name</span>
                    <div>{userDetails.lastname}</div>
                </div>
                
                <div className="detail-item">
                    <span>Email</span>
                    <div>{userDetails.email}</div>
                </div>
                
                <div className="detail-item">
                    <span>Phone</span>
                    <div>{userDetails.phoneNumber}</div>
                </div>
                
                <div className="detail-item">
                    <span>Date of Birth</span>
                    <div>{userDetails.dateOfBirth}</div>
                </div>
                
                <div className="detail-item">
                    <span>Gender</span>
                    <div>{userDetails.gender}</div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
