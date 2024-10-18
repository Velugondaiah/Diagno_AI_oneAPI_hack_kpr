import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

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
  }

  onSubmitButton = event => {
    event.preventDefault()
    const {patientName, gender , age ,  date , phoneNumber , address} = this.state
    const newList = {
      id: uuidv4(),
      patientName: patientName ,
      gender : gender,
      age : age,
      phoneNumber:phoneNumber,
      address :address,
      date: date,
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
    const dateValue = event.target.value
    this.setState({date: dateValue})
  }

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

  render() {
    const {appointmentsList, patientName,gender ,age , date,phoneNumber,address , filterBtn, isStared} = this.state
    const stared = isStared ? 'if-selected' : 'selected-button'
    return (
      <div className="main-appointment-bg-container">
        <div className="appointment-card-container">
          <div className="form-and-image-container">
            <form className="form" onSubmit={this.onSubmitButton}>
              <h1 className="main-heading">Add Appointment</h1>
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
              <button className="add-button" type="submit">
                Add
              </button>
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
      </div>
    )
  }
}
export default Appointments
