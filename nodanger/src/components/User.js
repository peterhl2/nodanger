import React, { Component } from "react"

import 'bootstrap/dist/css/bootstrap.css';
import "./User.css"

class User extends Component {
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
            //Check database if user exists

            //If not, create new user

            //If so, try again
            this.props.logIn()
        } else if (name === "login") {
            //Check database if user exists

            //Valid: give normal page

            //Invalid: print try again
            this.props.logIn()
        }
    }

    render() {
        return (
            <div className="user">
                <input className="row"
                       type="text"
                       placeholder="Username"
                       name="username"
                       value={this.state.username}
                       onChange={this.handleChange}/>
                <input className="row"
                       type="text"
                       placeholder="Password"
                       name="password"
                       value={this.state.password}
                       onChange={this.handleChange}/>

                <div className="row">
                    <button className="btn btn-primary col-4 btnSpace"
                               name="login"
                               onClick={this.handleSubmit}>Log In</button>
                    <button className="btn btn-primary col-4 btnSpace"
                            name="signup"
                            onClick={this.handleSubmit}>Sign Up</button>
                </div>
            </div>
        )
    }
}

export default User
