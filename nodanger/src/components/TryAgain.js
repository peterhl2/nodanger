import React from "react"

import 'bootstrap/dist/css/bootstrap.css'

function TryAgain(props) {
    return (
        <div className="tryagain">
            <h2 style={{"color":"red"}}>
                Please try a different Username/Password
            </h2>
        </div>
    )
}

export default TryAgain
