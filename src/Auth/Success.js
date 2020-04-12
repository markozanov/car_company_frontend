import {Link} from "react-router-dom";
import React, {Fragment} from "react";

const Success = () =>{
    return (
        <Fragment>
            <h1>
                <div>
                    <span><strong>Login successful!</strong></span>
                </div>
                <div><Link className="btn btn-primary"  to={"/home"}>Go to home</Link></div>
            </h1>
        </Fragment>

    )
};

export default Success;