import { Component } from "react"
import Doctors from "../Doctors"
import Header from "../Header"
import "./index.css"
class DoctorsList extends Component{
    state = {listOfDoctors : []}
    

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
        console.log(updateData)
        this.setState({listOfDoctors : updateData})
    }

    
    componentDidMount(){
        this.onSuccessfullDoctorsList()
    } 
   
    

    onSuccessfullDoctorsList = async () => {
        const url = "https://diagonalasisdb-1.onrender.com/doctors"
        const response = await fetch(url)
        if (response.ok === true){
            const data = await response.json()
            
            this.onSuccess(data)
        }else{
           
        }
    }
    render(){
        const {listOfDoctors} = this.state
        console.log(listOfDoctors)
        return(
          <>
          <Header/>
          <ul className="unorder-list-of-doctor">
            {
                listOfDoctors.map((eachDoc) => (
                    <Doctors key = {eachDoc.id} detailsOfDoctor = {eachDoc} />
                ))
            }
           </ul>
            
          </>
        )
    }
}

export default DoctorsList