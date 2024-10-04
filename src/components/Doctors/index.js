
import "./index.css"

const Doctors = (props) => {
    const {detailsOfDoctor} = props
    const {appointmentCost , imageUrl,  location , locationUrl , name , phoneNumber , rating , specialization  } = detailsOfDoctor
    return(
         <li className="list">
              <img className="doctor-image" alt = "doctor" src = {imageUrl} />
              <h1 className="name">{name}</h1>
              <p className="specialization">{specialization}</p>
              <p className="cost">Rs: {appointmentCost}</p>
              <p className="number">{phoneNumber}</p>
              <a className="location" href={locationUrl}>{location}</a>
         </li>
    )
}

export default Doctors