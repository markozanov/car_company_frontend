import React, {Component} from "react";
import {Link} from "react-router-dom";



class CarRow extends Component {

    render() {
        return(
            <tr>
                <td scope="col">{this.props.car.name}</td>
                <td scope="col">{this.props.car.year}</td>
                <td scope="col">{this.props.car.price}</td>
                <td scope="col">{this.props.car.sold ? "Sold" : "Available"}</td>
                <td scope="col">
                    {localStorage.getItem("signedIN") === "true" && this.props.car.sold === false && (
                    <Link className="btn btn-sm btn-secondary" to={"/cars/" + this.props.car.car_id + "/edit"}>
                        <span className="fa fa-edit"/>
                        <span><strong>Edit</strong></span>
                    </Link>
                    )}
                    {localStorage.getItem("signedIN") === "true" && this.props.car.sold === false && (
                    <button className="btn btn-sm btn-outline-secondary"  onClick={() => this.props.onDelete(this.props.car.car_id)}>
                        <span className="fa fa-remove"/>
                        <span><strong>Remove</strong></span>
                    </button>
                    )}
                    <Link className="btn btn-sm btn-outline-dark" to={"/cars/" + this.props.car.car_id + "/details"}>
                        <span><strong>Details</strong></span>
                    </Link>
                    {localStorage.getItem("signedIN") === "false" && this.props.car.sold === false && (
                    <Link className="btn btn-sm btn-outline-success"   to={"/cars/" + this.props.car.car_id + "/purchase"}>
                        <span><strong>Purchase</strong></span>
                    </Link>
                    )}
                </td>
            </tr>
        )
    }
}

export default CarRow;