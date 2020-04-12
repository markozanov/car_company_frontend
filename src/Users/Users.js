import UserRow from "./UserRow";
import React, {Fragment} from "react";

const Users = (props) => {
    const users = Object.values(props.users).map(user =>
        <UserRow user={user} onDelete={props.onDelete} key={user.username}/>

    );

    let usersTable =(
        <div className="table-responsive">
            <table className="table tr-history table-striped small">
                <thead>
                <tr>
                    <th scope="col">Username</th>
                </tr>
                </thead>
                <tbody>
                {users}
                </tbody>
            </table>
        </div>
    );

    if(users.length === 0) {
        usersTable = (
            <h6 className="text-info">
                No users yet.
            </h6>
        );
    }

    return (
        <Fragment>
            <h4 className="text-upper text-left row">Users</h4>
            <div className="row">
            </div>
            {usersTable}
        </Fragment>
    )
};

export default Users;