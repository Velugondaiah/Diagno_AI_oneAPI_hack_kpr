import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../Header';
import './index.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
            const response = await fetch('http://localhost:3005/user-profile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    history.push('/login');
                    return;
                }
                throw new Error('Failed to fetch profile');
            }

            const data = await response.json();
            console.log('Profile data:', data);
            setUserData(data);
            setProfileImage(data.profile_image);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching profile:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profileImage', file);

        try {
            const token = Cookies.get('jwt_token');
            const response = await fetch('http://localhost:3005/upload-profile-image', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const data = await response.json();
            setProfileImage(data.imageUrl);
            fetchUserProfile();
        } catch (error) {
            console.error('Error uploading image:', error);
            setError(error.message);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!userData) return <div className="error">No user data found</div>;

    return (
        <>
            <Header />
            <div className="profile-container">
                <div className="profile-image-section">
                    <img 
                        src={profileImage ? `http://localhost:3005${profileImage}` : '/default-avatar.png'} 
                        alt="Profile" 
                        className="profile-image"
                    />
                    <div className="image-actions">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            id="image-upload"
                            hidden
                        />
                        <label htmlFor="image-upload" className="upload-btn">
                            Upload Photo
                        </label>
                    </div>
                </div>
                <div className="profile-details">
                    <h2>{userData.firstname} {userData.lastname}</h2>
                    <div className="detail-item">
                        <span>Username:</span> {userData.username}
                    </div>
                    <div className="detail-item">
                        <span>Email:</span> {userData.email}
                    </div>
                    <div className="detail-item">
                        <span>Phone:</span> {userData.phone_number || 'Not provided'}
                    </div>
                    <div className="detail-item">
                        <span>Date of Birth:</span> {userData.date_of_birth || 'Not provided'}
                    </div>
                    <div className="detail-item">
                        <span>Gender:</span> {userData.gender || 'Not provided'}
                    </div>
                    <div className="detail-item">
                        <span>Address:</span> {userData.address || 'Not provided'}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
        
