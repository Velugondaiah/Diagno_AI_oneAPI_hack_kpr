import { Link  , withRouter } from "react-router-dom";
import { Component } from "react";
import Cookies from "js-cookie"
import { AiFillHome } from "react-icons/ai";
import {IoReorderThreeSharp} from 'react-icons/io5'
import { MdMedicalServices } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import "./index.css"
import {  Sidebar,
    SidebarItem} from "./StyledComponent"

class Header extends Component{
    state = {isSidebarOpen: false}
    logoutBtn = () => {
      console.log("logout")
      Cookies.remove("jwt_token"); 
      const { history } = this.props;
      history.replace("/login");
      
    }

    
    toggleSidebar = () => {
        this.setState(prevState => ({
          isSidebarOpen: !prevState.isSidebarOpen,
        }))
      }

      handleClickOutSide = event => {
        const {isSidebarOpen} = this.state
        if (isSidebarOpen && !event.target.closest('.Sidebar')) {
          this.setState({isSidebarOpen: false})
        }
      }
      
      componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutSide)
      }
    
      componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutSide)
      }
    render(){
        const {isSidebarOpen} = this.state
        
        return(
            <>
            <nav className = "small-devices-nav-container">
                <img alt = "logo" className="logo" src = "https://s3-alpha-sig.figma.com/img/0a45/f19e/7d4eedf4fa33fd9fc0b3c8a0c2a31d0f?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SkHn~1X7XMdgF1GNThtucOukS4ysGKw0I2E6rRNXtGUtpk8FUk-aW~lRoBZvTIJOQNhssxbZZyEXvjoQhBN7DNu80qIcrkKURF4K2LK9DihnNdOL4yovII2Bs50MLhWTKK-y1VJkpKcO~gfMK6R5xjJVZW3v-lSs45SEopSlXvySZogxLed3d34HNJaK06q8md5gJHSdRujcnGBOgJpQ9416aWiO5hxBcX~Vy1tvoQ4ySqtpECN-eSyTCvyzBdLxUtr06av6JBbD8JL0vaJ8G5zN9CQ-6HZYtdnDl37vAm2qUc-ZhUe~hhxV~Sd~YXTx9EQ7kfidmPFUlCGr1HDRSg__"/>
                   <div className="icons-container">
                   <Link to = "/" className="link">
                   <AiFillHome  className="icons" />
                   </Link>
                   <Link to = "/about-us"  className="link">
                   <FaUserCircle   className="icons"/>
                   </Link>
                   <Link to = "/services"  className="link">
                   <MdMedicalServices className="icons" />
                   </Link>
                </div>
                <div>
                <IoReorderThreeSharp size="39px" onClick={this.toggleSidebar} />
                <Sidebar isOpen={isSidebarOpen}>
              <Link to = "/profile" className="link">
              <SidebarItem>Profile</SidebarItem>
              </Link>
             <Link to = "/booking-history" className="link">
             <SidebarItem>Booking History</SidebarItem>
             </Link>
             <button type = "button" className="logout" >

         Logout
          </button>
             
          </Sidebar>
                </div>
        </nav>
        <nav className="large-devices-container">
              <img alt = "logo" className="logo" src = "https://s3-alpha-sig.figma.com/img/0a45/f19e/7d4eedf4fa33fd9fc0b3c8a0c2a31d0f?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SkHn~1X7XMdgF1GNThtucOukS4ysGKw0I2E6rRNXtGUtpk8FUk-aW~lRoBZvTIJOQNhssxbZZyEXvjoQhBN7DNu80qIcrkKURF4K2LK9DihnNdOL4yovII2Bs50MLhWTKK-y1VJkpKcO~gfMK6R5xjJVZW3v-lSs45SEopSlXvySZogxLed3d34HNJaK06q8md5gJHSdRujcnGBOgJpQ9416aWiO5hxBcX~Vy1tvoQ4ySqtpECN-eSyTCvyzBdLxUtr06av6JBbD8JL0vaJ8G5zN9CQ-6HZYtdnDl37vAm2qUc-ZhUe~hhxV~Sd~YXTx9EQ7kfidmPFUlCGr1HDRSg__"/>
                <ul className="unorder-list">
                
                   <Link to = "/" className="link">
                   <li>Home</li>
                   </Link>
                  
                   <Link to = "/about-us" className="link">
                   <li>About Us</li>
                   </Link>
                   <Link to = "/services" className="link">
                   <li>Services</li>
                   </Link>
                </ul>
                <div>
                <IoReorderThreeSharp size="39px" onClick={this.toggleSidebar} />
                </div>
                <Sidebar isOpen={isSidebarOpen}>
              <SidebarItem>Profile</SidebarItem>
              <SidebarItem>Booking History</SidebarItem>
              <button type = "button" className="logout" onClick={this.logoutBtn}>Logout</button>
          </Sidebar>
        </nav>
            </>
        )
    }
}
export default withRouter(Header)