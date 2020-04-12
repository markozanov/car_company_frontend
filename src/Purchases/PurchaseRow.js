import React, {Component} from "react";



class PurchaseRow extends Component {

    render() {
        return(
            <tr>
                <td scope="col">{this.props.purchase.purchase_id}</td>
                <td scope="col">{this.props.purchase.car?.name}</td>
                <td scope="col">{this.props.purchase.employee?.fname} {this.props.purchase.employee?.lname}</td>
                <td scope="col">{this.props.purchase.client?.fname} {this.props.purchase.client?.lname}</td>
                <td scope="col">{this.props.purchase.date}</td>
                <td scope="col">

                </td>
            </tr>
        )
    }
}

export default PurchaseRow;