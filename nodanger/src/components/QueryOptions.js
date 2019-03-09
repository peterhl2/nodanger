import React, { Component } from "react"

class QueryOptions extends Component {
    render() {
        return (
            <div className="queryOptions">
                <div className="options">
                <h3>Types</h3>
                    <h6>Theft</h6>
                    <h6>Robbery</h6>
                    <h6>Car</h6>
                <h3>Locations</h3>
                    <h6>Grainger</h6>
                    <h6>Bardeen</h6>
                    <h6>Siebel Center</h6>
                    <h6>ECEB</h6>
                </div>
            </div>
        )
    }
}

export default QueryOptions
