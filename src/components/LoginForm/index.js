
import {Component} from "react"
import Cookies from "js-cookie"
import {Redirect } from "react-router-dom"
import "./index.css"

class LoginForm extends Component{
   state = {username : "" , password : ""}


   onSubmitSuccess = (jwtToken) => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  
   }
  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'http://localhost:3005/login'
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      console.log("hello")
      this.onSubmitSuccess(data.jwt_token)

    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
    console.log(event.target.value)
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
    console.log(event.target.value)
  }
    render(){
        const {username , password} = this.state
        const jwtToken = Cookies.get('jwt_token')
          if (jwtToken !== undefined) {
            return <Redirect to="/" />
          }
        
        return(
            <div className="main-bg-container-for-login">
                <img alt = "logo" className="login-image" src = "https://res.cloudinary.com/dbroxheos/image/upload/v1727454124/Untitled_design_1_nyltzm.png" />
                  <div className="login-container">
                        <img alt="logo" className="image" src ="https://s3-alpha-sig.figma.com/img/0a45/f19e/7d4eedf4fa33fd9fc0b3c8a0c2a31d0f?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SkHn~1X7XMdgF1GNThtucOukS4ysGKw0I2E6rRNXtGUtpk8FUk-aW~lRoBZvTIJOQNhssxbZZyEXvjoQhBN7DNu80qIcrkKURF4K2LK9DihnNdOL4yovII2Bs50MLhWTKK-y1VJkpKcO~gfMK6R5xjJVZW3v-lSs45SEopSlXvySZogxLed3d34HNJaK06q8md5gJHSdRujcnGBOgJpQ9416aWiO5hxBcX~Vy1tvoQ4ySqtpECN-eSyTCvyzBdLxUtr06av6JBbD8JL0vaJ8G5zN9CQ-6HZYtdnDl37vAm2qUc-ZhUe~hhxV~Sd~YXTx9EQ7kfidmPFUlCGr1HDRSg__" />
                         <h1 className="sign-in-heading">Sign In</h1>
                         <form className="form-container" onSubmit={this.submitForm}>
                        <div className="container">
                            <label className="label" htmlFor = "username">UserName</label>
                            <input value={username} onChange = {this.onChangeUsername} placeholder="Username" id = "username" type="text" className="input-text" />
                        </div>

                        <div className="container">
                            <label className="label" htmlFor = "password">Password</label>
                            <input value={password} onChange = {this.onChangePassword}
                            placeholder="Password" id = "password" type="password" className="input-text" />
                        </div>
                        <p className="forgot-password-heading">Forgot Password</p>
                        <button className="button" type="submit">Sign In</button>
                       </form>
                  </div>
            </div>
        )
    }
}

export default LoginForm


