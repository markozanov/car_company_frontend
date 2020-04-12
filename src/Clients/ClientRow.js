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


                </td>
            </tr>
        )
    }
}

export default ClientRow;