import React from "react"

import "./Marker.css"

function Start(props) {
    return (
        <div lat={props.lat}
             lng={props.lng}>

            <span className="start">
                {props.text}
            </span>
        </div>
    )
}

export default Start
