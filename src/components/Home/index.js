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
        <img alt = "logo"  className="home-image" src = "https://s3-alpha-sig.figma.com/img/0a45/f19e/7d4eedf4fa33fd9fc0b3c8a0c2a31d0f?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SkHn~1X7XMdgF1GNThtucOukS4ysGKw0I2E6rRNXtGUtpk8FUk-aW~lRoBZvTIJOQNhssxbZZyEXvjoQhBN7DNu80qIcrkKURF4K2LK9DihnNdOL4yovII2Bs50MLhWTKK-y1VJkpKcO~gfMK6R5xjJVZW3v-lSs45SEopSlXvySZogxLed3d34HNJaK06q8md5gJHSdRujcnGBOgJpQ9416aWiO5hxBcX~Vy1tvoQ4ySqtpECN-eSyTCvyzBdLxUtr06av6JBbD8JL0vaJ8G5zN9CQ-6HZYtdnDl37vAm2qUc-ZhUe~hhxV~Sd~YXTx9EQ7kfidmPFUlCGr1HDRSg__"/>
          <h1 className="home-heading">Welcome to DIAGNO AI</h1>
         <Link to = "/home-content"> <button className="proceed-button" type = "button" >Proceed</button></Link>
        </div>
        </>
    )
}

export default Home