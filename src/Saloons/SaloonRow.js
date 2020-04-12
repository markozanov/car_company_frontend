import React, {Component} from "react";
import {Link} from "react-router-dom";


/*** THINGS TO DO.. */


class SaloonRow extends Component {

    render() {
        return(
            <tr>
                <td scope="col">{this.props.saloon.saloonID}</td>
                <td scope="col">{this.props.saloon.city}</td>
                <td scope="col">{this.props.saloon.carCapacity}</td>
                <td scope="col">
                    {localStorage.getItem("signedIN") === "true" && (
                    <Link className="btn btn-sm btn-secondary" to={"/saloons/" + this.props.saloon.saloonID + "/edit"}>
                        <span className="fa fa-edit"/>
                        <span><strong>Edit</strong></span>
                    </Link>
                    )}
                    {localStorage.getItem("signedIN") === "true" && (
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.props.onDelete(this.props.saloon.saloonID)}>
                        <span className="fa fa-remove"/>
                        <span><strong>Remove</strong></span>
                    </button>
                    )}
                    <Link className="btn btn-sm btn-outline-dark" to={"/saloons/" + this.props.saloon.saloonID + "/details"}>
                        <span><strong>Details</strong></span>
                    </Link>
                </td>
            </tr>
        )
    }
}

export default SaloonRow;