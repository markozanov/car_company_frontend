import React, {useEffect, useState} from "react";
import carsService from "./CarsRepository";
import {Redirect, useParams} from "react-router-dom";

const CarDetails = props => {

    const [car, setCar] = useState({});
    const {carID} = useParams();

    useEffect( () => {
        carsService.getCarByID(carID).then(response => {
            setCar(response.data);
            console.log(JSON.stringify(response.data));
        })
    }, []);

    const cancelGoBack = () => {
        props.routerProps.history.goBack();
    };

    return (
        <div className="card">
            <h4 className="text-center">Car Details</h4>
            <dl className="row">
                <dt className="col-6 text-right">ID</dt>
                <dd className="col-6 text-left">{carID}</dd>
            </dl>
            <dl className="row">
                <dt className="col-6 text-right">Name</dt>
                <dd className="col-6 text-left">{car.name}</dd>
            </dl>
            <dl className="row">
                <dt className="col-6 text-right">Year</dt>
                <dd className="col-6 text-left">{car.year}</dd>
            </dl>
            <dl className="row">
                <dt className="col-6 text-right">Horsepower</dt>
                <dd className="col-6 text-left">{car.horsepower}</dd>
            </dl>
            <dl className="row">
                <dt className="col-6 text-right">Engine Capacity</dt>
                <dd className="col-6 text-left">{car.enginecapacity}</dd>
            </dl>
            <dl className="row">
                <dt className="col-6 text-right">Price</dt>
                <dd className="col-6 text-left">{car.price}</dd>
            </dl>
            <dl className="row">
                <dt className="col-6 text-right">Colour</dt>
                <dd className="col-6 text-left">{car.colour}</dd>
            </dl>
            <dl className="row">
                <dt className="col-6 text-right">Vehicle Type</dt>
                <dd className="col-6 text-left">{car.vehicletype}</dd>
            </dl>
            <dl className="row">
                <dt className="col-6 text-right">Saloon</dt>
                <dd className="col-6 text-left">{car.saloon?.city}</dd>
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

export default CarDetails;