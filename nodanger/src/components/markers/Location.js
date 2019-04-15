import React, {Component} from "react"

import "./Marker.css"

class Location extends Component {
    constructor() {
        super()
        this.checkPath = this.checkPath.bind(this)
    }

    checkPath(idx) {
        let path = this.props.pathIdx
        if (path.length === 0) return false
        for (let i=0; i<path.length; i++) {
            if (path[i] === idx)
                return true
        }
        return false
    }

    render() {
        let style
        if (this.props.idx == this.props.startIdx) {
            style = {backgroundColor:"red"}
        } else if (this.props.idx == this.props.destIdx) {
            style = {backgroundColor:"green"}
        } else if (this.checkPath(this.props.idx)) {
            style = {backgroundColor:"DeepSkyBlue", opacity: "1"}
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
