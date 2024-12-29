import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './index.css';

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const jwtToken = Cookies.get('jwt_token');
                const userId = localStorage.getItem('user_id');

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
