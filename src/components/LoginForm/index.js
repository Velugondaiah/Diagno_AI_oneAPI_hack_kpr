import {Component} from "react"
import Cookies from "js-cookie"
import {Redirect} from "react-router-dom"
import {Link} from "react-router-dom"
import "./index.css"

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    errorMsg: "",
    showError: false
  }

  onSubmitSuccess = (data) => {
    console.log('Login Response:', data); // Log the entire response

<<<<<<< HEAD

   
    // Save token to cookies
    Cookies.set('jwt_token', data.jwt_token, {
      expires: 30,
      path: '/',
    })
    let id = data.user.id;
    // let patientname = data.firstname;
    // let age = data.age;
    // let phoneNumber = data.phonenumber;
    // let gender = data.gender;
    // Save user data to localStorage
    localStorage.setItem('userDetails',JSON.stringify(data.user))
    localStorage.setItem('userData', JSON.stringify(id))
    
    history.replace('/')
=======
    try {
      // Save token to cookies
      Cookies.set('jwt_token', data.jwt_token, {
        expires: 30,
        path: '/',
      })

      // Validate user data
      if (!data.user || !data.user.id) {
        console.error('Invalid user data in login response:', data);
        throw new Error('Invalid user data received');
      }

      // Create user data object
      const userData = {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email
      };

      console.log('Storing user data in localStorage:', userData);
      localStorage.setItem('userData', JSON.stringify(userData));

      const { history } = this.props;
      history.replace('/');
    } catch (error) {
      console.error('Error in onSubmitSuccess:', error);
      this.setState({
        showError: true,
        errorMsg: 'Error processing login response'
      });
    }
>>>>>>> a86ec2886da0fa7cf5e23bba64238e91a5234ec0
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    
    const userDetails = {username, password}
    const url = 'http://localhost:3000/login'
                
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(userDetails),
      })
<<<<<<< HEAD
     
      console.log('Login Response:', response);
=======
      
      console.log('Login Response Status:', response.status);
>>>>>>> a86ec2886da0fa7cf5e23bba64238e91a5234ec0
      const data = await response.json()
      console.log('Login Response Data:', data);
      
      if (response.ok) {
        // Validate the response data
        if (!data.jwt_token || !data.user || !data.user.id) {
          throw new Error('Invalid response format from server');
        }
        this.onSubmitSuccess(data)
      
      } else {
        this.setState({
          showError: true,
          errorMsg: data.error || 'Invalid credentials'
        })
      }
    } catch (error) {
      console.error('Login error:', error)
      this.setState({
        showError: true,
        errorMsg: error.message || 'Connection error. Please try again.'
      })
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    
    return (
      <div className="main-bg-container-for-login">
        <img 
          alt="logo" 
          className="login-image" 
          src="https://res.cloudinary.com/dbroxheos/image/upload/v1727454124/Untitled_design_1_nyltzm.png" 
        />
        <div className="login-container">
          <img 
            alt="logo" 
            className="image" 
            src="https://res.cloudinary.com/dbroxheos/image/upload/v1731033415/login-logo_w3ogs3.png" 
          />
          <h1 className="sign-in-heading">Sign In</h1>
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="container">
              <label className="label" htmlFor="username">Username</label>
              <input 
                value={username} 
                onChange={this.onChangeUsername} 
                placeholder="Username" 
                id="username" 
                type="text" 
                className="input-text" 
              />
            </div>

            <div className="container">
              <label className="label" htmlFor="password">Password</label>
              <input 
                value={password} 
                onChange={this.onChangePassword}
                placeholder="Password" 
                id="password" 
                type="password" 
                className="input-text" 
              />
            </div>

            {showError && <p className="error-message">{errorMsg}</p>}
            
            <button className="button" type="submit">Sign In</button>
            <Link to="/signup" className="link">
              <p className="sign-up-heading">Don't have an account? Sign Up</p>
            </Link>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm