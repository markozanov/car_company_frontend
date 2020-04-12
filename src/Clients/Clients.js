import React, {Fragment} from "react";
import ClientRow from "./ClientRow";

const Clients = (props) => {
    const clients = Object.values(props.clients).map(client =>
        <ClientRow client={client}  key={client.embg}/>

    );

    let clientsTable =(
        <div className="table-responsive">
            <table className="table tr-history table-striped small">
                <thead>
                <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">EMBG</th>
                    <th scope="col">Number of purchases</th>
                </tr>
                </thead>
                <tbody>
                {clients}
                </tbody>
            </table>
        </div>
    );

    if(clients.length === 0) {
        clientsTable = (
            <h6 className="text-info">
                No clients yet.
            </h6>
        );
    }

    return (
        <Fragment>
            <h4 className="text-upper text-left row">Clients</h4>
            <div className="row">
            </div>
            {clientsTable}
        </Fragment>
    )
};

export default Clients;