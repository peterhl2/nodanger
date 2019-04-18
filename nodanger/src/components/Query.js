import React, { Component } from "react"
import QueryResults from "./QueryResults"
import { Popup } from 'semantic-ui-react'

const server_uri = 'http://cs411-nodanger.herokuapp.com';//'http://localhost:8080'

class Query extends Component {
    constructor() {
        super()
        this.state = {
            query: "",
            queryData: [],
            fields: "",
            crimeType: "",
            weekday: "",
            latitude: "",
            longtitude: "",
            startDate: "",
            endDate: "",
            startDateObj: {},
            endDateObj: {},
        }
        this.handleQuery = this.handleQuery.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleTableChange = this.handleTableChange.bind(this)
    }

    handleQuery(event) {
        const {id} = event.target
        const value = this.state.query

        if (id === "crimes_types") {
          let fetch_uri = `${server_uri}/getcrimetypes`
          fetch(fetch_uri)
            .then(response=> response.text())
            .then(console.log)
            .catch(console.err);
        } else if (id === "senddate") {
          let fetch_uri = `${server_uri}/senddate`
          fetch(fetch_uri, {
              method: 'POST',
              body: JSON.stringify({
                  start: this.state.startDateObj,
                  end: this.state.endDateObj,
              })
          })
            .then(response=> response.text())
            .then(console.log)
            .catch(console.err);
        } else if (id === "query_crime") {
          const temp_val = `${server_uri}/getcrime`
          const fetch_uri = temp_val + "/" + this.state.query
          fetch(fetch_uri)
            .then(response=> response.json())
            .then(data => {this.props.setCrimeMkrs(data)})
            .catch(console.err);
        } else if (id === "query_type") {
          const temp_val = `${server_uri}/getcrimebytype`
          const fetch_uri = temp_val + "/" + this.state.query
          fetch(fetch_uri)
            .then(response=> response.text())
            .then(console.log)
            .catch(console.err);
        }
    }

    handleTableChange(event) {
      const {id} = event.target
      // const fieldId = this.state.query

      if (id === "insert") {
          const temp_val = `${server_uri}/insert`
          const fetch_uri = temp_val + "/" + this.state.query + "/" + this.state.fields
          fetch(fetch_uri)
            .then(response=> response.text())
            .then(console.log)
            .catch(console.err);
      } else if (id === "delete") {
          const temp_val = `${server_uri}/delete`
          const fetch_uri = temp_val + "/" + this.state.query + "/" + this.state.fields
          fetch(fetch_uri)
            .then(response=> response.text())
            .then(console.log)
            .catch(console.err);
      } else if (id === "update") {
          const temp_val = `${server_uri}/update`
          const fetch_uri = temp_val + "/" + this.state.query + "/" + this.state.fields
          fetch(fetch_uri)
            .then(response=> response.text())
            .then(console.log)
            .catch(console.err);
      }
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({[name]: [value]})
    }

    handleDateChange(event) {
        this.handleChange(event)
        const {name, value} = event.target
        let date = value.split("/")
        if (date.length != 3 || date[2].length<4)
            return
        if (name==="startDate") {
            this.setState({
                startDateObj: {
                    month: parseInt(date[0]),
                    day: parseInt(date[1]),
                    year: parseInt(date[2])
                }
            })
        } else {
            this.setState({
                endDateObj: {
                    month: parseInt(date[0]),
                    day: parseInt(date[1]),
                    year: parseInt(date[2])
                }
            })
        }
        console.log(this.state.startDateObj)
        console.log(this.state.endDateObj)
    }

    render() {
        return (
            <div className="query">
                <div className="row">
                    <input className="col-10"
                           name="query"
                           type="text"
                           placeholder="Query or ID"
                           value={this.state.query}
                           onChange={this.handleChange}/>
                </div>
                <div className="row">
                    <input className="col-10"
                         name="fields"
                         type="text"
                         placeholder="Argument Fields"
                         value={this.state.fields}
                         onChange={this.handleChange}/>
                </div>

                {/*Full Queries*/}
                <div className="row">
                  <Popup trigger={<button onClick={this.handleQuery} id="crimes_types" className="ui icon btn btn-danger" style={{"margin": "10px"}}>Crimes Types</button>}
                         position="bottom center"
                         content="List Crime Types" />
                  <Popup trigger={<button onClick={this.handleQuery} id="senddate" className="ui icon btn btn-danger" style={{"margin": "10px"}}>Send Dates</button>}
                         position="bottom center"
                         content="List Crime Types" />
                </div>
                {/*Specific Queries*/}
                <div className="row">
                  <Popup trigger={<button onClick={this.handleQuery} id="query_crime" className="ui icon btn btn-primary" style={{"margin": "10px"}}>Crime</button>}
                         position="bottom center"
                         content="mm/dd/yyyy" />
                  <Popup trigger={<button onClick={this.handleQuery} id="query_time" className="ui icon btn btn-primary" style={{"margin": "10px"}}>Time</button>}
                         position="bottom center"
                         content="24 hour system" />
                  <Popup trigger={<button onClick={this.handleQuery} id="query_date" className="ui icon btn btn-primary" style={{"margin": "10px"}}>Date</button>}
                         position="bottom center"
                         content="mm/dd/yyyy" />
                  <Popup trigger={<button onClick={this.handleQuery} id="query_type" className="ui icon btn btn-primary" style={{"margin": "10px"}}>Type</button>}
                         position="bottom center"
                         content="Theft, Car, MIP" />
                  <Popup trigger={<button onClick={this.handleQuery} id="query_location" className="ui icon btn btn-primary" style={{"margin": "10px"}}>Location</button>}
                         position="bottom center"
                         content="Grainger, ECEB, Bardeen" />
                </div>
                {/*Entry Modifications*/}
                <div className="row">
                  <Popup trigger={<button onClick={this.handleTableChange} id="insert" className="ui icon btn btn-success" style={{"margin": "10px"}}>Insert</button>}
                         position="bottom center"
                         content="fields: /id/cols" />
                  <Popup trigger={<button onClick={this.handleTableChange} id="delete" className="ui icon btn btn-success" style={{"margin": "10px"}}>Delete</button>}
                         position="bottom center"
                         content="fields: /id/" />
                  <Popup trigger={<button onClick={this.handleTableChange} id="update" className="ui icon btn btn-success" style={{"margin": "10px"}}>Update</button>}
                         position="bottom center"
                         content="fields: /id/cols" />
                </div>
                {/*Advanced Features*/}
                <div className="row">
                    <Popup trigger={<button onClick={this.props.sendsafe} id="send" className="ui icon btn btn-warning" style={{"margin": "10px"}}>Path</button>}
                           position="bottom center"
                           content="Send the Start/Dest location" />
                    <Popup trigger={<button onClick={this.props.groupDanger} id="group" className="ui icon btn btn-warning" style={{"margin": "10px"}}>Groups</button>}
                           position="bottom center"
                           content="Group most dangerous areas" />
                    <Popup trigger={<button onClick={this.props.clearColors} id="reset" className="ui icon btn btn-warning" style={{"margin": "10px"}}>Reset</button>}
                           position="bottom center"
                           content="Clear map colors" />
                </div>

                <QueryResults queryData={this.state.queryData}/>
            </div>
        )
    }
}

export default Query
