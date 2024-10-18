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

  // Logout function
  logoutBtn = () => {
    console.log("logout"); // Debug: Check if this is firing
    Cookies.remove("jwt_token");
    const { history } = this.props;
    history.replace("/login");
  };

  // Toggle the sidebar open/close
  toggleSidebar = () => {
    this.setState(prevState => ({
      isSidebarOpen: !prevState.isSidebarOpen,
    }));
  };

  // Close sidebar if clicking outside
  handleClickOutSide = event => {
    const { isSidebarOpen } = this.state;
    if (isSidebarOpen && !event.target.closest('.Sidebar')) {
      this.setState({ isSidebarOpen: false });
    }
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutSide);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutSide);
  }

  render() {
    const { isSidebarOpen } = this.state;

    return (
      <>
        {/* Small devices navigation */}
        <nav className="small-devices-nav-container">
          <img alt="logo" className="logo" src="your_logo_url_here" />
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
            <IoReorderThreeSharp size="39px" onClick={this.toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen}>
              <Link to="/profile" className="link">
                <SidebarItem>Profile</SidebarItem>
              </Link>
              <Link to="/booking-history" className="link">
                <SidebarItem>Booking History</SidebarItem>
              </Link>
              <button type="button" className="logout" onClick={this.logoutBtn}>
                Logout
              </button>
            </Sidebar>
          </div>
        </nav>

        {/* Large devices navigation */}
        <nav className="large-devices-container">
          <img alt="logo" className="logo" src="your_logo_url_here" />
          <ul className="unorder-list">
            <Link to="/" className="link">
              <li>Home</li>
            </Link>
            <Link to="/about-us" className="link">
              <li>About Us</li>
            </Link>
            <Link to="/services" className="link">
              <li>Services</li>
            </Link>
          </ul>
          <div>
            <IoReorderThreeSharp size="39px" onClick={this.toggleSidebar} />
          </div>
          <Sidebar isOpen={isSidebarOpen}>
            <SidebarItem>Profile</SidebarItem>
            <SidebarItem>Booking History</SidebarItem>
            <button type="button" className="logout" onClick={this.logoutBtn}>
              Logout
            </button>
          </Sidebar>
        </nav>
      </>
    );
  }
}

export default withRouter(Header);
