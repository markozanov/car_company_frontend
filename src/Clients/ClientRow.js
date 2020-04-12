import React, {Component} from "react";



class ClientRow extends Component {

    render() {
        return(
            <tr>
                <td scope="col">{this.props.client.fname}</td>
                <td scope="col">{this.props.client.lname}</td>
                <td scope="col">{this.props.client.embg}</td>
                <td scope="col">{this.props.client.purchases.length}</td>
                <td scope="col">
                    <button className="btn btn-sm btn-outline-secondary">
                        <span className="fa fa-remove"/>
                        <span><strong>Remove</strong></span>
                    </button>

                </td>
            </tr>
        )
    }
}

export default ClientRow;