import SaloonRow from "./SaloonRow";
import {Link} from "react-router-dom";
import React, {Fragment} from "react";

const Saloons = (props) => {
    const saloons = Object.values(props.saloons).map(saloon =>
        <SaloonRow saloon={saloon} onDelete={props.onDelete} key={saloon.saloonID}/>
    );

    let saloonsTable =(
        <div className="table-responsive">
            <table className="table tr-history table-striped small">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">City</th>
                    <th scope="col">Car Capacity</th>
                </tr>
                </thead>
                <tbody>
                {saloons}
                </tbody>
            </table>
        </div>
    );

    if(saloons.length === 0) {
        saloonsTable = (
            <h6 className="text-info">
                No saloons created.
            </h6>
        );
    }

    return (
        <Fragment>
            <h4 className="text-upper text-left row">Saloons</h4>
            <div className="row">
                {saloonsTable}
            </div>
            {localStorage.getItem("signedIN") === "true" && (
            <Link className="btn btn-outline-secondary mb-3 row" to={"/saloons/new"}>
                <span><strong>Open new Saloon</strong></span>
            </Link>
            )}
        </Fragment>
    )
};

export default Saloons;