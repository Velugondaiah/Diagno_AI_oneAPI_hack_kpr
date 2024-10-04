
import Header from "../Header"
import { FaXRay } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import "./index.css"

const AboutUs = () => {
    return (
        <>
           <Header className="fixed-header"/>
          
           <div className = "home-container">
               <div className="transparent-container">
               <h1 className="main-heading">Advanced Diagnostic Services</h1>
                <p className="description">Leveraging AI to provide precise and reliable X-ray and Blood analyses...</p>
                <div className="containers">
                <button type = "button" className="advice-containers">
                    <h1 className="type-of-services-heading">Consult a Doctor</h1>
                </button>
                <button type = "button" className="advice-containers"> 
                    <h1 className="type-of-services-heading">Analyse Report</h1>
                </button>
                </div>
               </div>
            </div>
            

            <div className="second-container">
                  <img  className="second-container-image" src = "https://res.cloudinary.com/dbroxheos/image/upload/v1727800728/Half_design_794_x_1012_px_flwz3e.png" />
                 <div className="desc-container">
                    <h1 className="services-heading">Comprehensive Diagnostic Services</h1>
                    <h1 className="powerd-heading">AI-Powered Precision</h1>
                    <p className="explore-description">Explore our range of diagnostic services designed to provide accurate and timely results.</p>
                    <div  className="specialists-containers">
                    <FaXRay size="65px" className="color" />
                        <div className="heading-and-des-containers">
                            <h1 className="specialists-heading">X-ray Analysis</h1>
                            <p className="specialists-description">High-resolution x-ray imaging analyzed by advanced AI algorithms</p>
                        </div>
                    </div>

                    <div className="specialists-containers">
                    <FaUserDoctor size="65px"  />
                        <div  className="heading-and-des-containers" >
                            <h1  className="specialists-heading">Specialist Consultations</h1>
                            <p className="specialists-description">Connect with top healthcare specialists for expert opinions.</p>
                        </div>
                    </div>
                 </div>
            </div>


            {/* <div className="our-process-container">
                <h1 className="process-heading">Our Process :</h1>
                <h1 className="how-it-works-heading">How DiagnosticPro Works</h1>
                <p className="how-it-works-description">A seamless journey from booking to receiving your diagnostic results.</p>
               
               <div className="steps-in-detail-container">
               <div className="details-containers">
                    <h1 className="step-heading">Step 1</h1>
                    <h1 className="main-step-heading">Book an Appointment</h1>
                    <p className="step-description">Schedule your diagnostic scan easily through out platform....</p>
                </div>

                <div className="details-containers">
                    <h1 className="step-heading">Step 2</h1>
                    <h1 className="main-step-heading">Undergo Scanning</h1>
                    <p className="step-description">Visit out partnered healthcare facilities for your X-ray or MRI scans....</p>
                </div>

                <div className="details-containers">
                    <h1 className="step-heading">Step 3</h1>
                    <h1 className="main-step-heading">Receive Results</h1>
                    <p className="step-description">Get details diagnostic reports analyzed by AI and reviewed by  specialists....</p>
                </div>
               </div>
            </div> */}
        </>
    )
}
export default AboutUs