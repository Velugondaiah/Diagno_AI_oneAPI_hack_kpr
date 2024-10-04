import {Link} from "react-router-dom"
import { Component } from "react"
import DoctorsList from "../DoctorsList"
class AnalyseReport extends Component{
 
    onClickContinue = () => {
        const {history} = this.props
        history.replace("/doctors-details")
        
    }

    render(){
        return(
            <div>
                <h1>hello</h1>
               <Link to = "/doctors-details">
               <button type = "button" onClick={this.onClickContinue}>Continue</button>
               </Link>

            </div>
       )
    }
}
export default AnalyseReport