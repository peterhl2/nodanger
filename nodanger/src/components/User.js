import React, { Component } from "react"
import TryAgain from "./TryAgain"

import 'bootstrap/dist/css/bootstrap.css'
import "./User.css"

const server_uri = 'http://cs411-nodanger.herokuapp.com';//'http://localhost:8080'

class User extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            tryAgain: false,
            exists: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.checkUserExists = this.checkUserExists.bind(this)
        this.createUser = this.createUser.bind(this)
    }

    checkUserExists() {
      const fetch_uri = `${server_uri}/senduserexists`
      let exists = false
      const user = {username: this.state.username,
                    password: this.state.password,
      }
      fetch(fetch_uri, {
          method: 'POST',
          body: JSON.stringify(user)
      })
        .then(response=>response.json())
        .then(data => {
            exists = data
            this.setState({exists: data})
        })
        .catch(console.err)
        return exists
    }

    createUser() {
        const fetch_uri = `${server_uri}/sendusersignup`
        const newUser = {
            username: this.state.username,
            password: this.state.password,
        }
        fetch(fetch_uri, {
            method: 'POST',
            body: JSON.stringify(newUser)
        })
          .then(response=> response.json())
          .then(console.log)
          .catch(console.err)
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({[name]: [value]})
    }

    handleSubmit(event) {
        const {name} = event.target
        // Set default tryAgain to not display
        this.setState({tryAgain: false})
        // Check database if user exists
        this.checkUserExists()
        const inUse = this.state.exists

        if (name === "signup") {
            if (!inUse) { // Doesn't exist, create user
                this.createUser()
                this.props.logIn()
            } else { // User exists, try to make new one
                this.setState({tryAgain: true})
            }
        } else if (name === "login") {
            if (inUse) { //Valid: give normal page
                this.props.logIn()
            } else { // Invalid: try again
                this.setState({tryAgain: true})
            }
        }
    }

    render() {
        if (this.state.exists) {
          this.props.logIn()
        }
        return (
            <div className="user">
                <input className="row col"
                       type="text"
                       placeholder="Username"
                       name="username"
                       value={this.state.username}
                       onChange={this.handleChange}/>
                <input className="row col"
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
                {this.state.tryAgain ? <TryAgain /> : null}
            </div>
        )
    }
}

export default User
