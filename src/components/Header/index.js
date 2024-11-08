import { Link, withRouter } from "react-router-dom";
import { Component } from "react";
import Cookies from "js-cookie";
import { AiFillHome } from "react-icons/ai";
import { IoReorderThreeSharp } from 'react-icons/io5';
import { MdMedicalServices } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import "./index.css";
import { Sidebar, SidebarItem } from "./StyledComponent";

class Header extends Component {
  state = { isSidebarOpen: false };

  logoutBtn = () => {
    Cookies.remove("jwt_token");
    const { history } = this.props;
    history.replace("/login");
  };

  toggleSidebar = () => {
    this.setState(prevState => ({
      isSidebarOpen: !prevState.isSidebarOpen,
    }));
  };

  handleClickOutSide = event => {
    const { isSidebarOpen } = this.state;
    const sidebarElement = event.target.closest('.Sidebar');
    const menuButton = event.target.closest('.menu-button');

    if (isSidebarOpen && !sidebarElement && !menuButton) {
      this.setState({ isSidebarOpen: false });
    }
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutSide);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutSide);
  }

  handleProfileClick = () => {
    const { history } = this.props;
    console.log('Profile clicked');
    history.push('/profile');
    this.setState({ isSidebarOpen: false });
  };

  handleBookingHistoryClick = () => {
    const { history } = this.props;
    history.push('/booking-history');
    this.setState({ isSidebarOpen: false });
  };

  render() {
    const { isSidebarOpen } = this.state;
    const { history } = this.props;

    return (
      <>
        {/* Small devices navigation */}
        <nav className="small-devices-nav-container">
          <img 
            alt="logo" 
            className="logo" 
            src="https://res.cloudinary.com/dbroxheos/image/upload/v1727450617/gdyevtkkyx2gplt3c0kv.png" 
          />
          <div className="icons-container">
            <Link to="/" className="link">
              <AiFillHome className="icons" />
            </Link>
            <Link to="/about-us" className="link">
              <FaUserCircle className="icons" />
            </Link>
            <Link to="/services" className="link">
              <MdMedicalServices className="icons" />
            </Link>
          </div>
          <div>
            <IoReorderThreeSharp 
              size="39px" 
              onClick={this.toggleSidebar} 
              className="menu-button"
            />
            <Sidebar isOpen={isSidebarOpen} className="Sidebar">
              <SidebarItem onClick={this.handleProfileClick}>
                Profile
              </SidebarItem>
              <SidebarItem onClick={this.handleBookingHistoryClick}>
                Booking History
              </SidebarItem>
              <button 
                type="button" 
                className="logout" 
                onClick={this.logoutBtn}
              >
                Logout
              </button>
            </Sidebar>
          </div>
        </nav>

        {/* Large devices navigation */}
        <nav className="large-devices-container">
          <img 
            alt="logo" 
            className="logo" 
            src="https://res.cloudinary.com/dbroxheos/image/upload/v1727450617/gdyevtkkyx2gplt3c0kv.png" 
          />
          <ul className="unorder-list">
            <Link to="/" className="link">
              <li >Home</li>
            </Link>
            <Link to="/about-us" className="link">
              <li>About Us</li>
            </Link>
            <Link to="/services" className="link">
              <li>Services</li>
            </Link>
          </ul>
          <div>
            <IoReorderThreeSharp 
              size="39px" 
              onClick={this.toggleSidebar} 
              className="menu-button"
            />
            <Sidebar isOpen={isSidebarOpen} className="Sidebar">
              <SidebarItem onClick={this.handleProfileClick}>
                Profile
              </SidebarItem>
              <SidebarItem onClick={this.handleBookingHistoryClick}>
                Booking History
              </SidebarItem>
              <button 
                type="button" 
                className="logout" 
                onClick={this.logoutBtn}
              >
                Logout
              </button>
            </Sidebar>
          </div>
        </nav>
      </>
    );
  }
}

export default withRouter(Header);
