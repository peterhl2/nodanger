import React, {Component} from "react"

import "./Marker.css"

class Location extends Component {
    render() {
        let style
        if (this.props.idx == this.props.startIdx) {
            style = {backgroundColor:"red"}
        } else if (this.props.idx == this.props.destIdx) {
            style = {backgroundColor:"green"}
        }
        return (
            <div lat={this.props.lat}
                 lng={this.props.lng}
                 >

                <span className="location" style={style}>
                    {this.props.text}
                </span>
            </div>
        )
    }
}

export default Location
