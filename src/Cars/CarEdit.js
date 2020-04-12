import React, {useEffect, useState} from "react";
import carsService from "./CarsRepository";
import {Redirect, useParams} from "react-router-dom";

const CarEdit = (props) => {
    const [car, setCar] = useState({});
    const [oldCar, setOldCar] = useState({});
    const [toRedirect, setToRedirect] = useState(false);
    const [isInputValid, setIsInputValid] = useState(true);
    const {carID} = useParams();

    useEffect( () => {
        carsService.getCarByID(carID).then(response => {
            setCar(response.data);
            setOldCar(response.data);
            console.log(JSON.stringify(response.data));
        })
    }, []);

    const onFormSubmit = (e) => {
        e.preventDefault();


        let modifiedCar = {
            name: car.name,
            year: car.year,
            price: car.price,
            horsepower: car.horsepower,
            enginecapacity: car.enginecapacity,
            colour: car.colour,
            vehicletype:car.vehicletype

        };

        let isValid = validateCar(modifiedCar);

        if(!isValid)
            return;

        props.onSubmit(carID, modifiedCar);
        setToRedirect(true);
    };

    const resetValues = () => {
        setCar(oldCar);
        setIsInputValid(true);
    };

    const validateCar = (c) => {
        let isValid = true;

        if (c.name === "" || c.name.length > 50)
            isValid = false;

        if (c.horsepower === 0 || c.horsepower > 1000 || c.horsepower < 90 || c.horsepower === null)
            isValid = false;

        if(c.enginecapacity === 0 || c.enginecapacity > 7.0 || c.enginecapacity < 1.4)
            isValid = false;

        if(c.year === 0 || c.year > 2020 || c.year < 2000 || c.year === null)
            isValid = false;

        if(c.price === 0 || c.price > 150000 || c.price < 15000 || c.price === null)
            isValid = false;


        setIsInputValid(isValid);

        return isValid;
    };


    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value;

        if (target.type === 'number')
            value = Number(target.value);
        else
            value = target.value;

        const changedCar = {
            ...car,
            [name]: value
        };

        validateCar(changedCar);

        setCar(changedCar);
    };

    const cancelGoBack = () => {
        setToRedirect(true);
    };

    if(toRedirect)
        return <Redirect to={"/cars"}/>;


    return (
        <div className="row">
            <form className="card" onSubmit={onFormSubmit}>
                <h4 className="text-upper text-left">Edit Car</h4>
                <div className="form-group row">
                    <label htmlFor="car" className="col-sm-4 offset-sm-1 text-left">Car ID</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="car" name="name"
                               placeholder="Car name" disabled value={carID}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="horsepower" className="col-sm-4 offset-sm-1 text-left">Name</label>
                    <div className="col-sm-6">
                        <input type="text"  className="form-control" id="name" name="name"
                               placeholder="Name" value={car.name} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="horsepower" className="col-sm-4 offset-sm-1 text-left">Horsepower</label>
                    <div className="col-sm-6">
                        <input type="number" step="any" min="0" className="form-control" id="horsepower" name="horsepower"
                               placeholder="Horsepower" value={car.horsepower} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="horsepower" className="col-sm-4 offset-sm-1 text-left">Engine Capacity</label>
                    <div className="col-sm-6">
                        <input type="number" step="any" min="0" className="form-control" id="enginecapacity" name="enginecapacity"
                               placeholder="EngineCapacity" value={car.enginecapacity} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="horsepower" className="col-sm-4 offset-sm-1 text-left">Year</label>
                    <div className="col-sm-6">
                        <input type="number" step="any" min="0" className="form-control" id="year" name="year"
                               placeholder="Year" value={car.year} onChange={handleInputChange}/>
                    </div>
                </div>



                <div className="form-group row">
                    <label htmlFor="horsepower" className="col-sm-4 offset-sm-1 text-left">Colour</label>
                    <div className="col-sm-6">
                        <input type="text"  className="form-control" id="colour" name="colour"
                               placeholder="Colour" value={car.colour} onChange={handleInputChange}/>
                    </div>
                </div>


                <div className="form-group row">
                    <label htmlFor="horsepower" className="col-sm-4 offset-sm-1 text-left">Price</label>
                    <div className="col-sm-6">
                        <input type="number" step="any" min="0" className="form-control" id="price" name="price"
                               placeholder="Price" value={car.price} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <div
                        className="offset-sm-1 col-sm-3  text-center">
                        <button
                            type="submit"
                            disabled={!isInputValid}
                            className="btn btn-primary text-upper">
                            Save
                        </button>
                    </div>
                    <div
                        className="offset-sm-1 col-sm-3  text-center">
                        <button
                            onClick={() => resetValues()}
                            type="button"
                            className="btn btn-warning text-upper">
                            Reset
                        </button>
                    </div>
                    <div
                        className="offset-sm-1 col-sm-3  text-center">
                        <button
                            onClick={() => cancelGoBack()}
                            type="button"
                            className="btn btn-danger text-upper">
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CarEdit;