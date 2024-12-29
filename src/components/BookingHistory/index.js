import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.css';

const BookingHistory = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        fetchBookingHistory();
    }, []);

    const fetchBookingHistory = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (!userData || !userData.id) {
                throw new Error('User ID not found');
            }
            const response = await axios.get(`http://localhost:3008/api/booking-history/${userData.id}`);
            if (response.data.success) {
                setAppointments(response.data.appointments);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return '#FFA500';
            case 'confirmed':
                return '#4CAF50';
            case 'cancelled':
                return '#f44336';
            default:
                return '#757575';
        }
    };

    const filterAppointments = (status) => {
        setActiveFilter(status);
    };

    return (
        <div className="page-container">
            {/* Header Section */}
            <header className="booking-header">
                <div className="header-content">
                    <h1>My Appointments</h1>
                    <div className="user-profile">
                        <Link to="/profile" className="profile-link">
                            <img 
                                src="https://via.placeholder.com/40" 
                                alt="Profile" 
                                className="profile-image"
                            />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Breadcrumb Navigation */}
            <div className="breadcrumb">
                <Link to="/" className="breadcrumb-link">Home</Link>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">Appointments</span>
            </div>

            {/* Main Content */}
            <div className="booking-history-container">
                {/* Filter Section */}
                <div className="filter-section">
                    <button 
                        className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => filterAppointments('all')}
                    >
                        All
                    </button>
                    <button 
                        className={`filter-btn ${activeFilter === 'upcoming' ? 'active' : ''}`}
                        onClick={() => filterAppointments('upcoming')}
                    >
                        Upcoming
                    </button>
                    <button 
                        className={`filter-btn ${activeFilter === 'past' ? 'active' : ''}`}
                        onClick={() => filterAppointments('past')}
                    >
                        Past
                    </button>
                </div>

                {/* Stats Section */}
                <div className="stats-section">
                    <div className="stat-card">
                        <span className="stat-number">{appointments.length}</span>
                        <span className="stat-label">Total Appointments</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">
                            {appointments.filter(app => app.status === 'Pending').length}
                        </span>
                        <span className="stat-label">Pending</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">
                            {appointments.filter(app => app.status === 'Confirmed').length}
                        </span>
                        <span className="stat-label">Confirmed</span>
                    </div>
                </div>

                {/* Existing Appointments Grid */}
                {loading ? (
                    <div className="loading-spinner">Loading...</div>
                ) : error ? (
                    <div className="error-message">Error: {error}</div>
                ) : (
                    <div className="appointments-grid">
                        {appointments.map(appointment => (
                            <div key={appointment.id} className="appointment-card">
                                <div className="doctor-info">
                                    <img 
                                        src={appointment.doctor_image || 'https://via.placeholder.com/150'} 
                                        alt={appointment.doctor_name}
                                        className="doctor-image"
                                    />
                                    <div className="doctor-details">
                                        <h3>{appointment.doctor_name}</h3>
                                        <p className="specialist">{appointment.specialist}</p>
                                    </div>
                                </div>
                                
                                <div className="appointment-details">
                                    <div className="detail-row">
                                        <span className="label">Patient:</span>
                                        <span className="value">{appointment.patient_name}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="label">Date:</span>
                                        <span className="value">
                                            {new Date(appointment.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="label">Time:</span>
                                        <span className="value">{appointment.time}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="label">Location:</span>
                                        <span className="value">{appointment.location}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="label">Phone:</span>
                                        <span className="value">{appointment.phone_number}</span>
                                    </div>
                                </div>

                                <div className="appointment-footer">
                                    <span 
                                        className="status-badge"
                                        style={{ backgroundColor: getStatusColor(appointment.status) }}
                                    >
                                        {appointment.status}
                                    </span>
                                    <span className="appointment-cost">
                                        ₹{appointment.appointment_cost || 'N/A'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingHistory;