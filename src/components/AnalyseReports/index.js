import {Link} from "react-router-dom"
import { Component } from "react"
import Header from "../Header"
import DoctorsList from "../DoctorsList"
import { FiUpload } from 'react-icons/fi'
import "./index.css"

const languages = [
    {
        id : "telugu",
        language : "TELUGU"
    },
    {
        id : "hindi",
        language : "HINDI"
    },
    {
        id : "English",
        language : "ENGLISH"
    },


]

class AnalyseReport extends Component{
    state = {
        language : languages, selectedLanguage: languages[0]
    }
 
    onClickContinue = () => {
        const {history} = this.props
        // history.replace("/doctors-details")
        history.replace("/appointments")
    }

    handleChange = (event) => {
        this.setState({ selectedLanguage: event.target.value });
      };

    render(){
         const {language , selectedLanguage} = this.state
        return(
            <>
               <Header />
        <div className="report-cont">
        <div className="container-for-report">
               <div className="file-upload-container">
                    <label htmlFor="file-upload" className="custom-file-upload">
                    <FiUpload className="upload-icon" /> 
                         Upload Your Report
                    </label>
                    <input id="file-upload" className="file" type="file" />
                </div>


                <div className="language-dropdown-container">
                    <label htmlFor="language-select">Choose a language:</label>
                    <select
                    id="language-select"
                    value={selectedLanguage}
                    onChange={this.handleChange}
                    className="language-dropdown"
                    >
                    <option value="" disabled>Select a language</option>
                    {languages.map((language) => (
                        <option key={language.id} value={language.id}>
                        {language.language}
                        </option>
                    ))}
                    </select>
                </div>
                </div>
                <Link to = "/appointments">
                        <button className="report-button" type = "button" onClick={this.onClickContinue}>Appointment</button>
                </Link>
                </div>

            </>
        )        
    }
}
export default AnalyseReport
