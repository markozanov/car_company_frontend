import React, {Component} from "react";
import {Link} from "react-router-dom";


class UserRow extends Component {

    render() {
        return (
            <tr>
                <td scope="col">{this.props.user.username}</td>
                <td scope="col">
                    {localStorage.getItem("username") === this.props.user.username && (
                    <Link className="btn btn-sm btn-secondary" to={"/users/" + this.props.user.username + "/edit"}>
                        <span className="fa fa-edit"/>
                        <span><strong>Edit</strong></span>
                    </Link>
                    )}
                    <button className="btn btn-sm btn-outline-secondary"
                            onClick={() => this.props.onDelete(this.props.user.username)}>
                        <span className="fa fa-remove"/>
                        <span><strong>Remove</strong></span>
                    </button>
                </td>
            </tr>
        )
    }
}

export default UserRow;