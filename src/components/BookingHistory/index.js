<<<<<<< HEAD
=======
<<<<<<< HEAD
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

=======
>>>>>>> a86ec2886da0fa7cf5e23bba64238e91a5234ec0
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../Header';
import './index.css';

const formatMonth = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'short' });
};

const formatDay = (dateString) => {
    const date = new Date(dateString);
    return date.getDate();
};

const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const time = new Date();
    time.setHours(hours);
    time.setMinutes(minutes);
    return time.toLocaleString('en-US', { 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true 
    });
};

const BookingHistory = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const history = useHistory();

    useEffect(() => {
        const token = Cookies.get('jwt_token');
        if (!token) {
            history.push('/login');
            return;
        }
        fetchAppointments();
    }, [history]);

    const fetchAppointments = async () => {
        try {
            const token = Cookies.get('jwt_token');
            const response = await fetch('http://localhost:3008/booking-history', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setAppointments(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    const filteredAppointments = appointments.filter(appointment => {
        if (filter === 'all') return true;
        return appointment.status.toLowerCase() === filter;
    });

    if (loading) return (
        <>
            <Header />
            <div className="loading-container">
                <div className="loader"></div>
                <p>Loading your appointments...</p>
            </div>
        </>
    );

    return (
        <div className="page-wrapper">
            <Header />
            <div className="booking-container">
                <div className="booking-header">
                    <h1>My Appointments</h1>
                </div>

                <div className="filter-tabs">
                    <button 
                        className={`tab ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button 
                        className={`tab ${filter === 'upcoming' ? 'active' : ''}`}
                        onClick={() => setFilter('upcoming')}
                    >
                        Upcoming
                    </button>
                    <button 
                        className={`tab ${filter === 'completed' ? 'active' : ''}`}
                        onClick={() => setFilter('completed')}
                    >
                        Completed
                    </button>
                </div>

                <div className="appointments-grid">
                    {filteredAppointments.map((appointment) => (
                        <div key={appointment.id} className="appointment-card">
                            <div className={`status-bar ${appointment.status.toLowerCase()}`}></div>
                            <div className="card-content">
                                <div className="date-time">
                                    <div className="date">
                                        <span className="month">{formatMonth(appointment.date)}</span>
                                        <span className="day">{formatDay(appointment.date)}</span>
                                    </div>
                                    <div className="time">
                                        <i className="far fa-clock"></i>
                                        {formatTime(appointment.time)}
                                    </div>
                                </div>

                                <div className="doctor-info">
                                    <div className="avatar">
                                        {appointment.doctor_name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3>Dr. {appointment.doctor_name}</h3>
                                        <p>{appointment.specialist}</p>
                                    </div>
                                </div>

                                <div className="location">
                                    <i className="fas fa-map-marker-alt"></i>
                                    {appointment.location}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

<<<<<<< HEAD
=======
>>>>>>> 57255db63019848dae9569612ef4e4c7f2b4b4f5
>>>>>>> a86ec2886da0fa7cf5e23bba64238e91a5234ec0
export default BookingHistory;