import {Link} from "react-router-dom";
import React, {Fragment} from "react";

const Failure = () =>{
    return (
        <Fragment>
            <h1>
                <div>
                    <span><strong>Login unsuccessful!</strong></span>
                </div>
                <div>
                    <Link className="btn btn-primary" to={"/login"}>Try again</Link>
                </div>
            </h1>
        </Fragment>

    )
};

export default Failure;