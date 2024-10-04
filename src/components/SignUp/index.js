import { Component } from "react";
import "./index.css"



class SignUp extends Component{
    state = {username : "" , firstname : "" , lastname : "" , email : "" , phoneNumber : "" ,dateOfBirth : "",  password : "" }



    onChangeUsername = (event) => {
        this.setState({username : event.target.value})
        console.log(event.target.value)
    }
    userNameFunc =() => {
        const {username} = this.state
        return(
            <>
               <div className="container">
                        <label className="label" htmlFor = "username">USER NAME</label>
                        <input onChange={this.onChangeUsername} value={username} placeholder="User name" id = "username" type="text" className="input-text" />
                    </div>
            </>
        )
    }


    onChangefirstname = (event) => {
        this.setState({firstname : event.target.value})
        console.log(event.target.value)
    }
    firstNameFunc =() => {
        const {firstname} = this.state
        return(
            <>
                <div className="container">
                        <label className="label" htmlFor = "firstname">FIRST NAME</label>
                        <input onChange={this.onChangefirstname} value={firstname} placeholder="First name" id = "firstname" type="text" className="input-text" />
                    </div>
            </>
        )
    }

    onChangelastname = (event) => {
        this.setState({lastname : event.target.value})
        console.log(event.target.value)
    }
    lastNameFunc =() => {
        const {lastname} = this.state
        return(
            <>
                <div className="container">
                        <label className="label" htmlFor = "lastname">LAST NAME</label>
                        <input onChange={this.onChangelastname} value={lastname} placeholder="Last name" id = "lastname" type="text" className="input-text" />
                    </div>
            </>
        )
    }


    onChangeemail = (event) => {
        this.setState({email : event.target.value})
        console.log(event.target.value)
    }
    emailFunc =() => {
        const {email} = this.state
        return(
            <>
                <div className="container">
                        <label className="label" htmlFor = "email">EMAIL</label>
                        <input onChange={this.onChangeemail} value={email} placeholder="Email" id = "email" type="email" className="input-text" />
                    </div>
            </>
        )
    }

    onChangebirthday = (event) => {
        this.setState({dateOfBirth : event.target.value})
        console.log(event.target.value)
    }
    birthDayFunc =() => {
        const {dateOfBirth} = this.state
        return(
            <>
                <div className="container">
                        <label className="label" htmlFor = "birthdate">BIRTH DATE</label>
                        <input onChange={this.onChangebirthday} value={dateOfBirth} placeholder="Birth date" id = "birthdate" type="date" className="input-text birth" />
                    </div>
            </>
        )
    }



    onChangepassword = (event) => {
        this.setState({password : event.target.value})
        console.log(event.target.value)
    }
    passwordFunc =() => {
        const {password} = this.state
        return(
            <>
                   <div className="container">
                        <label className="label" htmlFor = "pass">PASSWORD</label>
                        <input onChange={this.onChangepassword} value={password} placeholder="Password" id = "pass" type="password" className="input-text" />
                    </div>
            </>
        )
    }

    onChangephonenumber = (event) => {
        this.setState({phoneNumber : event.target.value})
        console.log(event.target.value)
    }
    phoneNumberFunc =() => {
        const {phoneNumber} = this.state
        return(
            <>
                    <div className="container">
                        <label className="label" htmlFor = "phone number">PHONE NUMBER</label>
                        <input onChange={this.onChangephonenumber} value={phoneNumber}  placeholder="Phone number" id = "phone number" type="number" className="input-text" />
                    </div>
            </>
        )
    }

     onSubmitSuccess = (data) =>{
        console.log(data)
     }
    
    onSubmitForm = async (event) => {
        event.preventDefault()
        const {username , firstname , lastname , email , dateOfBirth , phoneNumber , password} =this.state
        let detailsOfUser = {
            username,
            firstname,
            lastname,
            email,
           dateOfBirth,
            phoneNumber,
            password
        }
        console.log(detailsOfUser)
        const url = "http://localhost:3005/signup"
        const options = {
            method: 'POST',
            headers: {
              "Content-Type": "application/json", // Add content-type header
            },
            body: JSON.stringify(detailsOfUser),
          }
          const response = await fetch(url, options)
          const data = await response.json()
          if (response.ok === true) {
            this.onSubmitSuccess(data.success)
          }
    }
    formFunc = () => {
        return(
            <>
             <form className="form-container" onSubmit={this.onSubmitForm}>
                        {this.userNameFunc()}
                         {this.firstNameFunc()}
                         {this.lastNameFunc()}
                         {this.emailFunc()}
                         {this.birthDayFunc()}
                         {this.phoneNumberFunc()}
                        {this.passwordFunc()}
                    <button className="button-otp" type="submit">Sign Up</button>
                   </form>
            </>
        )
    }

    render(){
        return(
            <div className="main-bg-container-for-login">
            <img className="login-image" src = "https://res.cloudinary.com/dbroxheos/image/upload/v1727454124/Untitled_design_1_nyltzm.png" />
              <div className="login-container">
                      <h1 className="sign-in-heading">Sign Up</h1>
                     {this.formFunc()}
              </div>
        </div>
        )
    }
}
export default SignUp