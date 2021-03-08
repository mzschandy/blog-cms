import React from "react"
import {Link} from "react-router-dom"

function Login() {
    return(
        <div className="login">
            <div className="grid-container">
                <div className="grid-x align-center">
                    <div className="cell small-10 medium-4">
                    <div className="card">
                        <div className="card-section">
                            <h3>BlogCMS</h3>
                            <Link to="/posts/list" className="button hollow primary" >Login</Link>
                        </div>
                    </div>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    )
}

export default Login