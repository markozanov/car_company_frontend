import React, {Fragment} from "react";
import {Link} from "react-router-dom";

const Congrats = () => {
    return (
        <Fragment>
            <h1>
                <div>
                    <span><strong>Purchase successful!</strong></span>
                </div>
                <div><Link className="btn btn-primary"  to={"/home"}>Go to home</Link></div>
            </h1>
        </Fragment>

    )
};

export default Congrats;