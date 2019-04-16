import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'semantic-ui-css/semantic.min.css'
import { Popup } from 'semantic-ui-react'
import User from "./components/User"
import Query from "./components/Query"
import Map from "./components/Map"

const server_uri = 'http://cs411-nodanger.herokuapp.com';//'http://localhost:8080'

class App extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false,
            start: {"lat":"40.1", "lng":"-88.24"},
            dest: {"lat":"40.12", "lng":"-88.21"},
        }
        this.logIn = this.logIn.bind(this)
        this.sendData = this.sendData.bind(this)
        this.setStartDest = this.setStartDest.bind(this)
    }

    sendData() {
        const fetch_uri = `${server_uri}/senddata`
        const data = {
            start: this.state.start,
            dest: this.state.dest
        }
        fetch(fetch_uri, {
            method: 'POST',
            body: JSON.stringify(data)
        })
          .then(response=> response.json())
          .then(console.log)
          .catch(console.err)
    }

    setStartDest(start, dest) {
        this.setState({start: start, dest: dest})
    }

    getRequest() {
      const fetch_uri = `${server_uri}/getdata`
      fetch(fetch_uri)
        .then(response=> response.json())
        .then(console.log)
        .catch(console.err);
    }

    postRequest(obj) {
      const fetch_uri = `${server_uri}/senddata`
      fetch(fetch_uri, {
          method: 'POST',
          body: JSON.stringify(obj)
      })
        .then(response=> response.json())
        .then(console.log)
        .catch(console.err);
    }

    logIn(event) {
        let d = new Date()
        const fetch_uri = `${server_uri}/senddata`
        fetch(fetch_uri, {
            method: 'POST',
            body: JSON.stringify({
                weekday: d.getDay(),
                day: d.getDate(),
                month: d.getMonth(),
                year: d.getFullYear(),
                hour: d.getHours(),
            })
        })
          .then(response=> response.json())
          .then(console.log)
          .catch(console.err);

        this.setState({loggedIn: true})
    }

    render() {
        let page
        if (!this.state.loggedIn)
            page = <User logIn={this.logIn}/>
        else {
            page = <Query />
        }

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Welcome to No Danger 404, a future without risk
                    </p>

                    {page}

                    <Popup trigger={<button onClick={this.sendData} id="send" className="ui icon btn btn-primary" style={{"margin": "10px"}}>Send</button>}
                           position="bottom center"
                           content="Send the Start/Dest location" />

                    <Map    start={this.state.start}
                            dest={this.state.dest}
                            center={{lat:40.1000000, lng:-88.2220708}}
                            zoom={14.5}
                            setStartDest={this.setStartDest}
                            crimes={[{"lat":"40.1105883", "lng":"-88.2220708"}, {"lat":"40.110", "lng":"-88.22"}]}/>
                </header>
            </div>
        );
    }
}

export default App;
