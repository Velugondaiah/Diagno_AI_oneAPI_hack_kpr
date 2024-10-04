import Header from "../Header"
import "./index.css"

const Services = () => {
    return(
        <>
        <Header/>
         <div className = "reports-container">
          <h1 className="report-headingg">How Diagno AI Works ?</h1>
             <p className="reports-descriptions">Experience the seamless process of getting accurate diagnostics and expert care.</p>
            <div>
            <div className="report-container">
                <div className="report-step">1</div>
                <div >
                <h1 className="report-heading">Upload Your Scans/Reports</h1>
                <p className="report-description">Easily upload your X-rays or Blood Reports to our secure platform.</p>
                </div>
             </div>

             <div className="report-container">
                <div className="report-step des">2</div>
                <div >
                <h1 className="report-heading">AI Analysis</h1>
                <p className="report-description">Our AI technology analyzes your scans and provides accurate diagnostic results.</p>
                </div>
             </div>

             <div className="report-container">
                <div className="report-step des">3</div>
                <div >
                <h1 className="report-heading">Consult with Specialists</h1>
                <p className="report-description">Connect with top specialists for expert opinions and personalized care plans.</p>
                </div>
             </div>
            </div>
         </div>
        </>
        
    )
}
export default Services