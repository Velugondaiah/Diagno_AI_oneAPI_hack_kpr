import { Component } from "react";
import "./index.css"
import {Link} from "react-router-dom"

class SignUp extends Component {
    state = {
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: "",
        password: "",
        gender: "",
        errorMsg: "",
        showError: false
    }

    onChangeUsername = (event) => {
        this.setState({username: event.target.value})
    }

    onChangefirstname = (event) => {
        this.setState({firstname: event.target.value})
    }

    onChangelastname = (event) => {
        this.setState({lastname: event.target.value})
    }

    onChangeemail = (event) => {
        this.setState({email: event.target.value})
    }

    onChangebirthday = (event) => {
        this.setState({dateOfBirth: event.target.value})
    }

    onChangepassword = (event) => {
        this.setState({password: event.target.value})
    }

    onChangephonenumber = (event) => {
        this.setState({phoneNumber: event.target.value})
    }

    onChangeGender = (event) => {
        this.setState({ gender: event.target.value })
    }

    onSubmitSuccess = (data) => {
        const {history} = this.props
        alert('Account created successfully! Please login.')
        history.replace('/login')
    }

    onSubmitForm = async (event) => {
        event.preventDefault()
        const {
            username,
            firstname,
            lastname,
            email,
            dateOfBirth,
            phoneNumber,
            password,
            gender
        } = this.state

        const detailsOfUser = {
            username,
            firstname,
            lastname,
            email,
            dateOfBirth,
            phoneNumber,
            password,
            gender
        }

        try {
            const response = await fetch("http://localhost:3008/signup", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(detailsOfUser),
            })
            console.log('Signup Response:', response);
            const data = await response.json()
            console.log('Signup Data:', data);
            
            if (response.ok) {
                this.onSubmitSuccess(data)
            } else {
                this.setState({
                    showError: true,
                    errorMsg: data.error || 'Signup failed'
                })
            }
        } catch (error) {
            console.error('Signup error:', error)
            this.setState({
                showError: true,
                errorMsg: 'Connection error. Please try again.'
            })
        }
    }

    render() {
        const {
            username,
            firstname,
            lastname,
            email,
            phoneNumber,
            dateOfBirth,
            password,
            gender,
            showError,
            errorMsg
        } = this.state
        
        return (
            <div className="main-bg-container-for-login">
                <img 
                    className="login-image" 
                    src="https://res.cloudinary.com/dbroxheos/image/upload/v1727454124/Untitled_design_1_nyltzm.png" 
                    alt="logo"
                />
                <div className="login-container">
                    <h1 className="sign-in-heading">Sign Up</h1>
                    <form className="form-container" onSubmit={this.onSubmitForm}>
                        <div className="container">
                            <label className="label" htmlFor="username">Username</label>
                            <input 
                                value={username}
                                onChange={this.onChangeUsername}
                                placeholder="Enter username"
                                id="username"
                                type="text"
                                className="input-text"
                                required
                            />
                        </div>

                        <div className="container">
                            <label className="label" htmlFor="firstname">First Name</label>
                            <input 
                                value={firstname}
                                onChange={this.onChangefirstname}
                                placeholder="Enter first name"
                                id="firstname"
                                type="text"
                                className="input-text"
                                required
                            />
                        </div>

                        <div className="container">
                            <label className="label" htmlFor="lastname">Last Name</label>
                            <input 
                                value={lastname}
                                onChange={this.onChangelastname}
                                placeholder="Enter last name"
                                id="lastname"
                                type="text"
                                className="input-text"
                                required
                            />
                        </div>

                        <div className="container">
                            <label className="label" htmlFor="email">Email</label>
                            <input 
                                value={email}
                                onChange={this.onChangeemail}
                                placeholder="Enter email"
                                id="email"
                                type="email"
                                className="input-text"
                                required
                            />
                        </div>

                        <div className="container">
                            <label className="label" htmlFor="phoneNumber">Phone Number</label>
                            <input 
                                value={phoneNumber}
                                onChange={this.onChangephonenumber}
                                placeholder="Enter phone number"
                                id="phoneNumber"
                                type="tel"
                                className="input-text"
                                required
                            />
                        </div>

                        <div className="container">
                            <label className="label" htmlFor="dateOfBirth">Date of Birth</label>
                            <input 
                                value={dateOfBirth}
                                onChange={this.onChangebirthday}
                                id="dateOfBirth"
                                type="date"
                                className="input-text"
                                required
                            />
                        </div>

                        <div className="container">
                            <label className="label" htmlFor="gender">Gender</label>
                            <select 
                                value={gender}
                                onChange={this.onChangeGender}
                                id="gender"
                                className="input-text"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="container">
                            <label className="label" htmlFor="password">Password</label>
                            <input 
                                value={password}
                                onChange={this.onChangepassword}
                                placeholder="Enter password"
                                id="password"
                                type="password"
                                className="input-text"
                                required
                            />
                        </div>

                        {showError && <p className="error-message">{errorMsg}</p>}
                        
                      <div className="button-container">
                     
                        
                        <Link to="/login" className="link">
                            <p className="sign-up-heading">Already have an account? Sign In</p>
                        </Link>
                        <button className="button-otp" type="submit">Sign Up</button>
                      </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignUp