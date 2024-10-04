import {Link} from "react-router-dom"
import { Component } from "react"
class AnalyseReport extends Component{
    state = {listOfDoctors : []}
    

    onSuccess = (data) => {
        console.log(data)
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
        const url = "http://localhost:3005/doctors"
        const response = await fetch(url)
        if (response.ok === true){
            const data = await response.json()
            
            this.onSuccess(data)
        }else{
           
        }
    }

    render(){
        const {listOfDoctors} = this.state
        return(
            <div>
                <h1>hello</h1>
               <Link to = "/doctors-details">
               <button type = "button" >Continue</button>
               </Link>
            </div>
       )
    }
}
export default AnalyseReport