import React, {useEffect, useState} from "react";
import saloonsService from "./SaloonsRepository";
import {Link, Redirect, useParams} from "react-router-dom";
import Cars from "../Cars/Cars";

const SaloonDetails = (props) => {



    const [saloon, setSaloon] = useState({});
    const [toRedirect, setToRedirect] = useState(false);
    const {saloonID} = useParams();

    useEffect( () => {
        saloonsService.getSaloonByCity(saloonID).then(response => {
            setSaloon(response.data);
        })
    }, []);

    const carsToView = Object.values(props.cars).filter(c => c.saloon.saloonID === saloon.saloonID).map(car =>{
        return <Link to={`/cars/${car.car_id}/details`}>{car.name}</Link>
        });

    const employeesToView = Object.values(props.employees).filter(e => e.saloon.saloonID === saloon.saloonID).map(employee =>{
        return <Link to={`/employees/${employee.employee_id}/details`}>{employee.fname} {employee.lname}</Link>
    });

    const cancelGoBack = () => {
        setToRedirect(true);
    };

    if(toRedirect)
        return <Redirect to={"/saloons"}/>;



    return (
        <div className="card">
            <h4 className="text-center">Saloon Details</h4>
            <dl className="row">
                <dt className="col-6 text-right">ID</dt>
                <dd className="col-6 text-left">{saloon.saloonID}</dd>
            </dl>
            <dl className="row">
                <dt className="col-6 text-right">City</dt>
                <dd className="col-6 text-left">{saloon.city}</dd>
            </dl>
            <dl className="row">
                <dt className="col-6 text-right">Car Capacity</dt>
                <dd className="col-6 text-left">{saloon.carCapacity}</dd>
            </dl>

            <dl className="row">
                <dt className="col-12 text-center">Car List</dt>
            </dl>


            {carsToView}

            <dl className="row">
                <dt className="col-12 text-center">Employee List</dt>
            </dl>

            {employeesToView}

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

export default SaloonDetails;