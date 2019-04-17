import React from "react"

import "./Marker.css"

function Crime(props) {
    return (
        <div lat={props.lat}
             lng={props.lng}
             style={props.style}
             >

             <span className="crime" style={props.style}>
                 {props.text}
             </span>
        </div>
    )
}

export default Crime
