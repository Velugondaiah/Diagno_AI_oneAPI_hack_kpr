import { Link } from "react-router-dom"
import Header from "../Header"
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

        
        </>
    )

}

export default HomeContent