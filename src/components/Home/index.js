import { Link, Redirect } from "react-router-dom"
import HomeContent from "../HomeContent"
import Cookies from "js-cookie"

import Header from "../Header"
import "./index.css"

const Home = () => {
    const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  } 

  
    return(

        <>
        <Header />
        <div className="home-main-container">
        <img alt = "logo"  className="home-image" src = "https://res.cloudinary.com/dbroxheos/image/upload/v1731033415/login-logo_w3ogs3.png"/>
          <h1 className="home-heading">Welcome to DIAGNO AI</h1>
         <Link to = "/home-content"> <button className="proceed-button" type = "button" >Proceed</button></Link>
        </div>
        </>
    )
}

export default Home