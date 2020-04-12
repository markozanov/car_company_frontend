import React, {useEffect, useState} from "react";
import employeesService from "./EmployeesRepository";
import {useParams} from "react-router-dom";

const EmployeeDetails = (props) => {

    const [employee, setEmployee] = useState({});
    const {employeeID} = useParams();

    useEffect( () => {
        employeesService.getEmployeeById(employeeID).then(response => {
            setEmployee(response.data);
            console.log(JSON.stringify(response.data));
        })
    }, []);

    const cancelGoBack = () => {
        props.routerProps.history.goBack();
    };

    return (
        <div className="card">
            <h4 className="text-center">Employee Details</h4>
            <dl className="row">
                <dt className="col-6 text-right">ID</dt>
                <dd className="col-6 text-left">{employeeID}</dd>
            </dl>
            <dl className="row">
                <dt className="col-6 text-right">First Name</dt>
                <dd className="col-6 text-left">{employee.fname}</dd>
            </dl>
            <dl className="row">
                <dt className="col-6 text-right">Last Name</dt>
                <dd className="col-6 text-left">{employee.lname}</dd>
            </dl>
            <dl className="row">
                <dt className="col-6 text-right">Workplace</dt>
                <dd className="col-6 text-left">{employee.saloon?.city}</dd>
            </dl>


            <span className="row justify-content-center mb-3">
                </span>
            <div className="row justify-content-center mt-3 mb-3">
                <div
                    className="col-3 text-center">
                    <button
                        onClick={() => cancelGoBack()}
                        type="button"
                        className="btn btn-danger text-upper">
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;