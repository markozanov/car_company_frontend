import React, {Component} from "react";
import {Link} from "react-router-dom";



class EmployeeRow extends Component {

    render() {
        return(
            <tr>
                <td scope="col">{this.props.employee.employee_id}</td>
                <td scope="col">{this.props.employee.fname}</td>
                <td scope="col">{this.props.employee.lname}</td>
                <td scope="col">{this.props.employee.saloon?.city}</td>
                <td scope="col">
                    <Link className="btn btn-sm btn-secondary" to={"/employees/" + this.props.employee.employee_id + "/edit"}>
                        <span className="fa fa-edit"/>
                        <span><strong>Edit</strong></span>
                    </Link>
                    {localStorage.getItem("isAdmin") === "true" && (
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.props.onDelete(this.props.employee.employee_id)}>
                        <span className="fa fa-remove"/>
                        <span><strong>Remove</strong></span>
                    </button>
                    )}
                    <Link className="btn btn-sm btn-outline-dark" to={"/employees/" + this.props.employee.employee_id + "/details"}>
                        <span><strong>Details</strong></span>
                    </Link>
                </td>
            </tr>
        )
    }
}

export default EmployeeRow;