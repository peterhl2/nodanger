import React, { Component } from "react"

class SignIn extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({[name]: [value]})
    }

    handleSubmit(event) {
        const {name} = event.target

        if (name === "signup") {
            //Generate display page
        } else if (name === "login") {
            //Check database if user exists

            //Valid: give normal page

            //Invalid: print try again
        }
    }

    render() {
        return (
            <div className="signIn">
                <input className=""
                       type="text"
                       placeholder="Username"
                       name="username"
                       value={this.state.username}
                       onChange={this.handleChange}/>
                <input className=""
                       type="text"
                       placeholder="Password"
                       name="password"
                       value={this.state.password}
                       onChange={this.handleChange}/>

                <button name="signup" onClick={this.handleSubmit}>Sign Up</button>
                <button name="login" onClick={this.handleSubmit}>Log In</button>
            </div>
        )
    }
}

export default SignIn
