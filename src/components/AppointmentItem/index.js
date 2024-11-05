// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentsDetails, selectFavourite} = props
  const {id, patientName , gender ,age , date, phoneNumber , address , isFavourite, specialist, location} = appointmentsDetails
  const dateVal = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const isFavouriteButton = () => {
    selectFavourite(id)
  }
  const startImage = isFavourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="list-container">
      <div className="first-container">
        <div className="title-container">
          <p className="title">{patientName}</p>
          {specialist && (
            <p className="specialist-tag">
              {specialist}
            </p>
          )}
          {location && (
            <p className="location-tag">
              {location}
            </p>
          )}
          <button
            type="button"
            className="star-button"
            onClick={isFavouriteButton}
            data-testid="star"
          >
            <img className="star" src={startImage} alt="star" />
          </button>
        </div>
        <p className="date">Date: {dateVal}</p>
        <p className="details">Gender: {gender}</p>
        <p className="details">Age: {age}</p>
        <p className="details">Phone: {phoneNumber}</p>
        <p className="details">Address: {address}</p>
      </div>
    </li>
  )
}
export default AppointmentItem
