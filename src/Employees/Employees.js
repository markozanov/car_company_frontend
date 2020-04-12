import EmployeeRow from "./EmployeeRow";
import {Link} from "react-router-dom";
import React, {Fragment} from "react";

const Employees = (props) => {
    const employees = Object.values(props.employees).map(employee =>
        <EmployeeRow employee={employee} onDelete={props.onDelete} key={employee.employee_id}/>

    );

      let employeesTable =(
        <div className="table-responsive">
            <table className="table tr-history table-striped small">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Workplace</th>
                </tr>
                </thead>
                <tbody>
                {employees}
                </tbody>
            </table>
        </div>
    );

    if(employees.length === 0) {
        employeesTable = (
            <h6 className="text-info">
                No employees yet.
            </h6>
        );
    }

    return (
        <Fragment>
            <h4 className="text-upper text-left row">Employees</h4>
            <div className="row">
            </div>
            {employeesTable}
        </Fragment>
    )
};

export default Employees;