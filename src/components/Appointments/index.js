import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import DoctorsList from '../DoctorsList'
import axios from 'axios'
import AppointmentItem from '../AppointmentItem'
import './index.css'
import { withRouter } from 'react-router-dom';

class Appointments extends Component {
  state = {
    appointmentsList: [],
    patientName: '',
    gender:'',
    age : '',
    date: '',
    phoneNumber:'',
    address:'',
    filterBtn: false,
    isStared: false,
    duplicateList: [],
    specialist: null,
    locations: [],
    selectedLocation: '', 
    isFormValid: false,
    doctorResults: [],
    noDoctorsFound: false,
    isLoading: false,
    error: null,
    time: '',
  }

  componentDidMount() {
    // Get the specialist from the location state
    const { location } = this.props;
    if (location && location.state && location.state.specialist) {
      this.setState({ 
        specialist: location.state.specialist 
      });
      console.log("Received specialist:", location.state.specialist);
    }
    // Fetch locations when component mounts
    this.fetchLocations();
  }

  fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:3008/api/doctor-locations');
      this.setState({ locations: response.data });
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  handleLocationChange = (event) => {
    this.setState({ selectedLocation: event.target.value });
  };

  onSubmitButton = event => {
    event.preventDefault()
    const {patientName, gender , age ,  date , phoneNumber , address, specialist, selectedLocation, time} = this.state
    const newList = {
      id: uuidv4(),
      patientName: patientName ,
      gender : gender,
      age : age,
      phoneNumber:phoneNumber,
      address :address,
      date: date,
      time: time,
      specialist: specialist,
      location: selectedLocation,
      isFavourite: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newList],
      patientName: '',
      gender : '',
      age : '',
      phoneNumber : '',
      address : '',
      date: '',
      selectedLocation: '',
    }))
  }

  titleFun = event => {
    this.setState({patientName: event.target.value})
  }

  gender = event => {
    this.setState({gender : event.target.value})
  }
  onClickage = event => {
    this.setState({age : event.target.value})
  }
  onClickphoneNumber =event =>{
    this.setState({phoneNumber : event.target.value})
  }
  onClickAddress = event => {
    this.setState({address : event.target.value})
  }
  dateFrom = event => {
    const selectedDate = event.target.value;
    const today = new Date().toISOString().split('T')[0];
    
    if (selectedDate < today) {
      alert('Please select a future date');
      return;
    }
    
    this.setState({ date: selectedDate });
  }

  handleTimeChange = event => {
    const selectedTime = event.target.value;
    const [hours] = selectedTime.split(':').map(Number);
    
    // Check if time is between 10 AM and 8 PM
    if (hours < 10 || hours >= 20) {
      alert('Please select a time between 10:00 AM and 8:00 PM');
      return;
    }
    
    this.setState({ time: selectedTime });
  }

  validateDateTime = () => {
    const { date, time } = this.state;
    if (!date || !time) return false;

    const selectedDateTime = new Date(`${date}T${time}`);
    const currentDateTime = new Date();
    
    return selectedDateTime > currentDateTime;
  }

  validateForm = () => {
    const { patientName, gender, age, date, time, phoneNumber, address, selectedLocation } = this.state;
    return patientName && gender && age && date && time && phoneNumber && address && selectedLocation && this.validateDateTime();
  };

  selectFavourite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (id === each.id) {
          return {...each, isFavourite: !each.isFavourite}
        }
        return each
      }),
    }))
  }

  filterButton = () => {
    const {appointmentsList, duplicateList} = this.state
    this.setState({duplicateList: [...appointmentsList]})
    const filterLists = appointmentsList.filter(eachObj => {
      if (eachObj.isFavourite === true) {
        return eachObj
      }
    })
    this.setState({appointmentsList: filterLists, isStared: true})
  }

  filterDelteteButton = () => {
    const {duplicateList, isStared, appointmentsList} = this.state
    this.setState({appointmentsList: [...duplicateList], isStared: false})
  }
  filterCheck = () => {
    const {isStared} = this.state
    if (isStared) {
      this.filterDelteteButton()
    } else {
      this.filterButton()
    }
  }

  onSuccess = (data) => {
    const updateData = data.map(valu => ({
        appointmentCost : valu.appointment_cost,
        id : valu.id,
        imageUrl : valu.image_url,
        location : valu.location,
        locationUrl : valu.location_url,
        name : valu.name ,
        phoneNumber : valu.phone_number,
        rating : valu.rating,
        specialization : valu.specialization

    }))
    console.log("he")
    this.setState({doctorResults: updateData})
}

  handleProceed = async () => {
    if (!this.validateForm()) {
        alert('Please fill in all fields before proceeding');
        return;
    }

    const { selectedLocation, specialist } = this.state;
    
    if (!selectedLocation || !specialist) {
        alert('Please select both location and specialist');
        return;
    }

    this.setState({ 
        isLoading: true, 
        error: null,
        doctorResults: [],
        noDoctorsFound: false 
    });

    try {
        const response = await axios.get(
            'http://localhost:3008/api/doctor-locations/getDoctors',
            {
                params: {
                    location: selectedLocation,
                    specialization: specialist
                }
            }
        );

        if (response.data && Array.isArray(response.data)) {
            const formattedDoctors = response.data.map(doctor => ({
                id: doctor.id,
                name: doctor.name,
                specialization: doctor.specialization,
                appointmentCost: doctor.appointment_cost,
                location: doctor.location,
                rating: doctor.rating,
                phoneNumber: doctor.phone_number,
                imageUrl: doctor.image_url,
                locationUrl: doctor.location_url
            }));

            this.setState({
                doctorResults: formattedDoctors,
                noDoctorsFound: formattedDoctors.length === 0
            });
        } else {
            this.setState({
                noDoctorsFound: true,
                error: 'Invalid response format from server'
            });
        }
    } catch (error) {
        console.error('Error fetching doctors:', error);
        this.setState({
            error: 'Failed to fetch doctors. Please try again.',
            noDoctorsFound: true
        });
    } finally {
        this.setState({ isLoading: false });
    }
  };

  handleDoctorSelect = async (doctorId) => {
    try {
        // Debug: Log the doctorId
        console.log('Selected Doctor ID:', doctorId);

        // Check localStorage for user data
        const userDataString = localStorage.getItem('userData');
        console.log('Raw userData from localStorage:', userDataString);

        if (!userDataString) {
            console.log('No user data found in localStorage');
            alert('Please login to book an appointment');
            this.props.history.push('/login');
            return;
        }

        let userData;
        try {
            userData = JSON.parse(userDataString);
            console.log('Parsed User Data:', {
                id: userData.id,
                username: userData.username,
                email: userData.email
            });
        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('userData');
            alert('Session expired. Please login again.');
            this.props.history.push('/login');
            return;
        }

        // Log current state
        console.log('Current Form State:', {
            patientName: this.state.patientName,
            gender: this.state.gender,
            age: this.state.age,
            date: this.state.date,
            time: this.state.time,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            specialist: this.state.specialist,
            selectedLocation: this.state.selectedLocation
        });

        // Create appointment data
        const appointmentData = {
            doctor_id: parseInt(doctorId),
            user_id: parseInt(userData.id),
            patient_name: this.state.patientName,
            gender: this.state.gender,
            age: parseInt(this.state.age),
            date: this.state.date,
            time: this.state.time,
            phone_number: this.state.phoneNumber,
            address: this.state.address,
            specialist: this.state.specialist,
            location: this.state.selectedLocation
        };

        console.log('Appointment Data to be sent:', appointmentData);

        // Make the API call
        const response = await axios.post(
            'http://localhost:3008/api/appointments',
            appointmentData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('API Response:', response);

        if (response.status === 201) {
            this.setState({
                patientName: '',
                gender: '',
                age: '',
                phoneNumber: '',
                address: '',
                date: '',
                time: '',
                selectedLocation: ''
            });

            alert('Appointment booked successfully!');
            this.props.history.push('/services');
        }
    } catch (error) {
        console.error('Detailed booking error:', {
            message: error.message
        });

        alert(`Booking failed: ${error.message}`);
    }
};

  renderDoctorResults = () => {
    const { doctorResults, noDoctorsFound, isLoading, error } = this.state;

    if (isLoading) {
        return <div className="loading">Loading doctors...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (noDoctorsFound) {
        return <div className="no-results">No doctors found for the selected criteria</div>;
    }

    return (
        <div className="doctors-grid">
            {doctorResults.map(doctor => (
                <div key={doctor.id} className="doctor-card">
                    <div className="doctor-header">
                        <div className="doctor-image-container">
                            <img 
                                src={doctor.imageUrl} 
                                alt={doctor.name}
                                className="doctor-image"
                                onError={(e) => {
                                    e.target.src = 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png';
                                }}
                            />
                        </div>
                        <div className="doctor-title">
                            <h3 className="doctor-name">Dr. {doctor.name}</h3>
                            <p className="doctor-specialty">{doctor.specialization}</p>
                        </div>
                    </div>

                    <div className="info-grid">
                        <div className="info-item">
                            <div className="info-value">{doctor.experience}+</div>
                            <div className="info-label">Years</div>
                        </div>
                        <div className="info-item">
                            <div className="info-value">⭐ {doctor.rating}</div>
                            <div className="info-label">Rating</div>
                        </div>
                    </div>

                    <div className="detail-item">
                        <span className="detail-icon">📍</span>
                        {doctor.location}
                    </div>

                    <div className="detail-item">
                        <span className="detail-icon">💰</span>
                        ₹{doctor.appointmentCost}
                    </div>

                    <button 
                        className="book-btn"
                        onClick={() => this.handleDoctorSelect(doctor.id)}
                    >
                        Book Appointment
                    </button>
                </div>
            ))}
        </div>
    );
  };

  render() {
    const {appointmentsList, patientName,gender ,age , date,phoneNumber,address , filterBtn, isStared, specialist, locations, selectedLocation, doctorResults, noDoctorsFound, isLoading, error, time} = this.state
    const stared = isStared ? 'if-selected' : 'selected-button'
    return (
      <div className="main-appointment-bg-container">
        <div className="appointment-card-container">
          <div className="form-and-image-container">
            <form className="form" onSubmit={this.onSubmitButton}>
              <h1 className="main-heading">Add Appointment</h1>
              {specialist && (
                <div className="specialist-section">
                  <h2 className="specialist-heading">
                    Appointment with {specialist}
                  </h2>
                </div>
              )}
              <div className="form-group">
                <label htmlFor="location" className="label">
                  Select Location
                </label>
                <select
                  id="location"
                  className="input"
                  value={selectedLocation}
                  onChange={this.handleLocationChange}
                  required
                >
                  <option value="">Select a location</option>
                  {locations.map((loc, index) => (
                    <option key={index} value={loc.location}>
                      {loc.location}
                    </option>
                  ))}
                </select>
              </div>
              <label htmlFor="tile" className="label">
                Patient Name
              </label>
              <input
                value={patientName}
                type="text"
                id="tile"
                className="input"
                placeholder="patient name"
                onChange={this.titleFun}
              />
              <br />
              <label htmlFor="gender" className="label">
                Gender
              </label>
              {/* <input
                value={title}
                type="text"
                id="gender"
                className="input"
                placeholder="Title"
                onChange={this.titleFun}
              /> */}
                <select onChange={this.gender} className='input' id="gender" name="gender" required>
                <option value="" disabled selected>Select gender</option>
                <option value="male" checked>Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                </select>
              <br />
              <label htmlFor="age" className="label">
                Age
              </label>
              <input
                value={age}
                type="age"
                id="age"
                className="input"
                placeholder="age"
                onChange={this.onClickage}
              />
              <br />
              <label className="label" htmlFor="date">
                DATE
              </label>
              <input
                value={date}
                type="date"
                className="input"
                onChange={this.dateFrom}
                id="date"
                min={new Date().toISOString().split('T')[0]}
              />
              <br />
              <label className="label" htmlFor="time">
                TIME (10:00 AM - 8:00 PM)
              </label>
              <input
                value={time}
                type="time"
                className="input"
                onChange={this.handleTimeChange}
                id="time"
                min="10:00"
                max="20:00"
                required
              />
              <br />
              <label htmlFor="phone" className="label">
                Phone Number
              </label>
              <input
                value={phoneNumber}
                type="number"
                id="phone"
                className="input"
                placeholder="phone number"
                onChange={this.onClickphoneNumber}
              />
              <br />
              <label htmlFor="address" className="label">
                Address
              </label>
              <input
                value={address}
                type="text"
                id="address"
                className="input"
                placeholder="address"
                onChange={this.onClickAddress}
              />
              <br />
              <div className='radio-container'>
              <div>
                <input className='radio' id = "online" name='status' select checked  type='radio' />
                <label className='online'  htmlFor='online'>Online</label>
              </div>
              <div>
                <input className='radio' id = "offline" name = "status" type='radio'/>
                <label className='online' htmlFor='offline'>Offline</label>
              </div>
              </div>
              <div className="button-container">
                {/* <button className="add-button" type="submit">
                  Add
                </button> */}
                <button 
                  className="proceed-button" 
                  type="button"
                  onClick={this.handleProceed}
                  disabled={!this.validateForm()}
                  style={{ opacity: this.validateForm() ? 1 : 0.5 }}
                >
                  Proceed
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="appointment-image"
              alt="appointments"
            />
          </div>
          <hr className="horizontal-line" />
          <div className="heading-button-container">
            <h1 className="list-heading">Appointments</h1>
            <button type="button" className={stared} onClick={this.filterCheck}>
              Starred
            </button>
          </div>
          <ul className="unorder-list">
            {appointmentsList.map(eachValue => (
              <AppointmentItem
                key={eachValue.id}
                appointmentsDetails={eachValue}
                selectFavourite={this.selectFavourite}
              />
            ))}
          </ul>
        </div>
        <div className="doctor-results-container">
          {this.renderDoctorResults()}
        </div>
      </div>
    )
  }
}
export default withRouter(Appointments);