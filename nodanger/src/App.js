import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'semantic-ui-css/semantic.min.css'
import { Popup } from 'semantic-ui-react'
import User from "./components/User"
import Query from "./components/Query"
import Map from "./components/Map"

const server_uri = 'http://localhost:8080'

class App extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false,
            startIdx: 0,
            destIdx: 1,
            pathIdx: [],
            groupDanger: [],
            crimes: [],
        }
        this.logIn = this.logIn.bind(this)
        this.sendsafe = this.sendsafe.bind(this)
        this.groupDanger = this.groupDanger.bind(this)
        this.clearColors = this.clearColors.bind(this)
        this.setStartDest = this.setStartDest.bind(this)
    }

    sendsafe() {
        const fetch_uri = `${server_uri}/sendsafe`
        const data = {
            start: this.state.startIdx,
            dest: this.state.destIdx
        }

        fetch(fetch_uri, {
            method: 'POST',
            body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
              this.setState({pathIdx: data})
          })
          .then(console.log)
          .catch(console.err)
    }

    groupDanger() {
        const fetch_uri = `${server_uri}/groupDanger`
        fetch(fetch_uri, {
            method: 'POST',
            body: JSON.stringify({})
        })
          .then(response => response.json())
          .then(data => {
              this.setState({groupDanger: data})
          })
          .then(console.log)
          .catch(console.err)
    }

    clearColors() {
        this.setState({pathIdx: [], groupDanger: [], crimes: []})
    }

    setStartDest(start, dest) {
        this.setState({startIdx: start, destIdx: dest})
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
        const fetch_uri = `${server_uri}/sendlogin`
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
            page = <Query sendsafe={this.sendsafe} groupDanger={this.groupDanger}/>
        }

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Welcome to No Danger 404, a future without risk
                    </p>

                    {page}

                    <Map    start={this.state.start}
                            dest={this.state.dest}
                            pathIdx={this.state.pathIdx}
                            groupDanger={this.state.groupDanger}
                            center={{lat:40.1000000, lng:-88.2220708}}
                            zoom={14.5}
                            setStartDest={this.setStartDest}
                            crimes={this.state.crimes}/>
                </header>
            </div>
        );
    }
}

export default App;
