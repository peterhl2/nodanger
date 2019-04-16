import React, { Component } from "react"
import TryAgain from "./TryAgain"

import 'bootstrap/dist/css/bootstrap.css'
import "./User.css"

const server_uri = 'http://cs411-nodanger.herokuapp.com/';//'http://localhost:8080'

class User extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            tryAgain: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    checkUserExists() {
      const fetch_uri = `${server_uri}/senddata`
      let exists = false
      fetch(fetch_uri, {
          method: 'POST',
          body: JSON.stringify({"username": this.state.username})
      })
        .then(response=>response.json())
        .then(data => {
            exists = data.exists
        })
        .catch(console.err)
        return exists
    }

    createUser() {
        const fetch_uri = `${server_uri}/senddata`
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
        // const inUse = this.checkUserExists()
        const inUse = false

        if (name === "signup") {
            if (!inUse) { // Doesn't exist, create user
                this.createUser()
                this.props.logIn()
            } else { // User exists, try to make new one
                this.setState({tryAgain: true})
            }
        } else if (name === "login") {
            if (inUse) { //Valid: give normal page
                //TODO: Get User Data
                this.props.logIn()
            } else { // Invalid: try again
                this.setState({tryAgain: true})
            }
        }
    }

    render() {
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
