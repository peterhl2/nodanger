import React, { Component } from "react"

class Selectors extends Component {
    render() {
        return (
            <div className="selectors">
                <select id="crimeType" name="crimeType" value={this.props.crimeType} onChange={this.props.handleChange}>
                    <option value="LOST ARTICLES">Lost Articles</option>
                    <option value="MIP">MIP</option>
                    <option value="NO DRIVERS LICENSE">No Drivers License</option>
                    <option value="THEFT-LOST PROPERTY">Theft-list property</option>
                    <option value="BURGLARY">Burglary</option>
                    <option value="BATTERY">Battery</option>
                </select>
                <select id="weekday" name="weekday" value={this.props.weekday} onChange={this.props.handleChange}>
                    <option value="0">sunday</option>
                    <option value="1">monday</option>
                    <option value="2">tuesday</option>
                    <option value="3">wednesday</option>
                    <option value="4">thursday</option>
                    <option value="5">friday</option>
                    <option value="6">saturday</option>
                </select>
                <input name="latitude" value={this.props.latitude} type="text" placeholder="latitude" onChange={this.props.handleChange}/>
                <input name="longtitude" value={this.props.longtitude} type="text" placeholder="longtitude" onChange={this.props.handleChange}/>
            </div>
        )
    }

}

export default Selectors
