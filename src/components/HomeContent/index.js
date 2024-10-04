import { Link } from "react-router-dom"
import Header from "../Header"
import { FaBrain } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { GrHistory } from "react-icons/gr";
import { BsGraphUp } from "react-icons/bs";
import { MdOutlineSecurity } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import "./index.css"
const HomeContent = () => {
    return(
        <>
          <Header/>
          
          <div className="second-container">
                  <img  className="second-container-image img" src = "https://res.cloudinary.com/dbroxheos/image/upload/v1727800728/Half_design_794_x_1012_px_flwz3e.png" />
                 <div className="desc-container home-cont-container">
                    <h1 className="services-heading home-con-heading">Welcome to Diagno AI</h1>
                    <p className="explore-description home-con-description">Revolutionizing healthcare with AI-powered diagnostic accuracy. Connect with top specialists and get personalized healthcare insights.</p>
                   <Link to = "/reports">
                   <button type = "button" className="explore-button">Explore Now</button>
                   </Link>
                 </div>
            </div>
             <div className="key-features-container">
                <h1 className="features-heading">Key Features of Diagno AI</h1>
                <p className="feature-description">Discover the cutting-edge features that set our AI-powered healthcare platform apart.</p>
                  <div className="main-icons-container">
                   <div className="icons-containers">
                   <FaBrain className="features-icons" />
                    <h1 className="icons-heading">AI Powered Analysis</h1>
                    <p className="icons-paragraph">Get accurate and prompt diagnostic results with our advanced AI technology.</p>
                   </div>

                   <div className="icons-containers">
                   <FaUserDoctor  className="features-icons" />
                    <h1 className="icons-heading">Top Specialists</h1>
                    <p className="icons-paragraph">Connect with leading healthcare specialists for expert opinions and consultations.</p>
                   </div>

                   <div className="icons-containers">
                   <MdDateRange  className="features-icons" />
                    <h1 className="icons-heading">Easy Appointment Booking</h1>
                    <p className="icons-paragraph">Schedule appointments with ease and manage your healthcare journey seamlessly.</p>
                   </div>

                   <div className="icons-containers">
                   <GrHistory className="features-icons" />
                    <h1 className="icons-heading">Medical History Tracking</h1>
                    <p className="icons-paragraph">Keep track of your past medical records and ensure continuity of care.</p>
                   </div>

                   <div className="icons-containers">
                   <BsGraphUp className="features-icons" />
                    <h1 className="icons-heading">Outcome-Based Insights</h1>
                    <p className="icons-paragraph">Receive personalized insights based on your diagnostic results and health data.</p>
                   </div>

                   <div className="icons-containers">
                   <MdOutlineSecurity  className="features-icons" />
                    <h1 className="icons-heading">Data Security</h1>
                    <p className="icons-paragraph">Your medical data is secure with our robust data protection measures</p>
                   </div>
                   </div>
             </div>
        
        </>
    )

}

export default HomeContent