import React, { Component } from "react"
import QueryResults from "./QueryResults"
import { Popup } from 'semantic-ui-react'
import Selectors from "./Selectors"

const server_uri = 'http://cs411-nodanger.herokuapp.com/';//'http://localhost:8080'

class Query extends Component {
    constructor() {
        super()
        this.state = {
            query: "",
            queryData: [],
            start: "",
            dest: "",
            fields: "",
            crimeType: "",
            weekday: "",
            latitude: "",
            longtitude: "",
        }
        this.handleQuery = this.handleQuery.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleTableChange = this.handleTableChange.bind(this)
        this.handleAdv = this.handleAdv.bind(this)
    }

    handleQuery(event) {
        const {id} = event.target
        const value = this.state.query
        console.log(id, value)

        if (id === "crimes") {
          let fetch_uri = `${server_uri}/getcrimetypes`
          fetch(fetch_uri)
            .then(response=> response.text())
            .then(console.log)
            .catch(console.err);
        } else if (id === "query_crime") {
          const temp_val = `${server_uri}/getcrimebyid`
          const fetch_uri = temp_val + "/" + this.state.query
          fetch(fetch_uri)
            .then(response=> response.text())
            .then(console.log)
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

    handleAdv(event) {
        const {id} = event.target
        if (id === "adv1") {
            const fetch_uri = `${server_uri}/getnumberofcrimes`
            fetch(fetch_uri)
              .then(response=> response.text())
              .then(console.log)
              .catch(console.err);
        } else if (id === "adv2") {
            const fetch_uri = `${server_uri}/getuserinfo`
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
                          name="start"
                          type="text"
                          placeholder="Start Location"
                          value={this.state.start}
                          onChange={this.handleChange}/>
                </div>
                <div className="row">
                    <input className="col-10"
                         name="dest"
                         type="text"
                         placeholder="Destination"
                         value={this.state.dest}
                         onChange={this.handleChange}/>
                </div>
                <div className="row">
                    <input className="col-10"
                         name="fields"
                         type="text"
                         placeholder="Argument Fields"
                         value={this.state.fields}
                         onChange={this.handleChange}/>
                         <Selectors handleChange={this.handleChange} crimeType={this.state.crimeType} weekday={this.state.weekday} latitude={this.state.latitude} longtitude={this.state.longtitiude}/>
                </div>

                {/*Full Queries*/}
                <div className="row">
                  <Popup trigger={<button onClick={this.handleQuery} id="columns" className="ui icon btn btn-danger" style={{"margin": "10px"}}>Columns</button>}
                         position="bottom center"
                         content="List Col names" />
                  <Popup trigger={<button onClick={this.handleQuery} id="crimes" className="ui icon btn btn-danger" style={{"margin": "10px"}}>Crimes</button>}
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
                {/*Advanced Queries*/}
                <div className="row">
                  <Popup trigger={<button onClick={this.handleAdv} id="adv1" className="ui icon btn btn-info" style={{"margin": "10px"}}>Adv 1</button>}
                         position="bottom center"
                         content="fields: /id/cols" />
                  <Popup trigger={<button onClick={this.handleAdv} id="adv2" className="ui icon btn btn-info" style={{"margin": "10px"}}>Adv 2</button>}
                         position="bottom center"
                         content="fields: /id/cols" />

                </div>

                <QueryResults queryData={this.state.queryData}/>
            </div>
        )
    }
}

export default Query
