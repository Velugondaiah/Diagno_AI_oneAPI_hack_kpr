// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentsDetails, selectFavourite} = props
  const {id, patientName , gender ,age , date, phoneNumber , address , isFavourite} = appointmentsDetails
  const dateVal = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const isFavouriteButton = () => {
    selectFavourite(id)
  }
  const startImage = isFavourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="list-items">
      <div className="list-container">
        <div className="title-star-container">
          <p className="title">Name: {patientName}</p>
          
          <button
            className="star-button"
            onClick={isFavouriteButton}
            data-testid="star"
          >
            <img className="star" src={startImage} alt="star" />
          </button>
        </div>
        <p className="dateInFormat"> Gender: {gender}</p>
        <p className="dateInFormat"> Age: {age}</p>   
        <p className="dateInFormat"> PhoneNumber: {phoneNumber}</p>
        <p className="dateInFormat"> Address: {address}</p>     
        <p className="dateInFormat">{dateVal}</p>
      </div>
    </li>
  )
}
export default AppointmentItem
