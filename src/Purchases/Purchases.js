import PurchaseRow from "./PurchaseRow";
import React, {Fragment} from "react";

const Purchases = (props) => {
    const purchases = Object.values(props.purchases).map(purchase =>
        <PurchaseRow purchase={purchase} onDelete={props.onDelete} key={purchase.purchase_id}/>

    );

    console.log(props.purchases);
    let purchasesTable =(
        <div className="table-responsive">
            <table className="table tr-history table-striped small">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Car</th>
                    <th scope="col">Employee</th>
                    <th scope="col">Client</th>
                    <th scope="col">Date of purchase</th>
                </tr>
                </thead>
                <tbody>
                {purchases}
                </tbody>
            </table>
        </div>
    );

    if(purchases.length === 0) {
        purchasesTable = (
            <h6 className="text-info">
                No purchases made.
            </h6>
        );
    }

    return (
        <Fragment>
            <h4 className="text-upper text-left row">Purchases</h4>
            <div className="row">
            </div>
            {purchasesTable}
        </Fragment>
    )
};

export default Purchases;