import React, {useEffect, useState} from "react";
import carsService from "../Cars/CarsRepository";
import {Redirect, useParams} from "react-router-dom";

const Purchase = (props) => {

    const emptyClient = {
        embg: 0,
        fname: "",
        lname: ""
    };

    const emptyPurchase = {
        car: null,
        employee: null,
        client: emptyClient
    };

    const [toRedirect, setToRedirect] = useState(-1);
    const [car, setCar] = useState({});
    const [client, setClient] = useState(emptyClient);
    const [employeeId, setEmployeeId] = useState(-1);
    const [purchase, setPurchase] = useState(emptyPurchase);
    const [isInputValid, setIsInputValid] = useState(false);
    const {carID} = useParams();

    useEffect( () => {
        carsService.getCarByID(carID).then(response => {
            setCar(response.data);
            setPurchase({
                ...purchase,
                car: response.data
            })
        })
    }, []);


    if(car.sold === true)
        window.location.href = "/cars";

    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value;
        if (target.type === 'number')
            value = Number(target.value);
        else
            value = target.value;

        const changedClient = {
            ...client,
            [name]: value
        };

        setClient(changedClient);
        validateClient(changedClient);

    };

    const handleEmployeeChange = (event) => {
        const target = event.target;
        const value = Number(target.value);
        setEmployeeId(value);
    };

    const validateClient = (c) => {
        let isValid = true;

        if(c.fname === "" || c.lname.length > 50)
            isValid = false;
        if(c.lname === "" || c.lname.length > 50)
            isValid = false;
        if(c.embg < 1000000000000 || c.embg > 9999999999999)
            isValid = false;

        setIsInputValid(isValid);

        return isValid;
    };

    const resetValues = () => {
        setClient(emptyClient);
        setIsInputValid(false);
        console.log(JSON.stringify(car.saloon.employees[0]));
    };


    const onFormSubmit = (e) => {
        e.preventDefault();

        let employee = car.saloon?.employees?.find(e => e.employee_id === employeeId);
        console.log(employee);
        console.log(client);
        console.log(car);

        const fullPurchase = {
            ...purchase, client, employee
        };

        console.log("Full Purchase");
        console.log(fullPurchase);

        if(!isInputValid)
            return;
        props.onCreate(fullPurchase);

        setToRedirect(1);
    };

    const cancelGoBack = () => {
        setToRedirect(0);
    };

    if(toRedirect === 0)
        return <Redirect to={"/cars"}/>;
    if(toRedirect === 1)
        return <Redirect to={"/congrats"}/>;


    let employeesDropDown = (
        <select name="employee_id" id="employee_id" onChange={handleEmployeeChange}>
            <option disabled value="" selected hidden> Select employee you worked with</option>
            {car.saloon?.employees?.map(e => {
                return <option key={e.employee_id} value={e.employee_id}>{e.fname} {e.lname}</option>
            })}
        </select>
    );


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


            <div className="card">
                <form className="card" onSubmit={onFormSubmit}>
                    <h4 className="text-upper text-left">Enter Client Information</h4>

                    <div className="form-group row">
                        <label htmlFor="fname" className="col-sm-4 offset-sm-1 text-left">First Name</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" id="fname" name="fname"
                                   placeholder="first name" value={client.fname} onChange={handleInputChange}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="lname" className="col-sm-4 offset-sm-1 text-left">Last Name</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" id="lname" name="lname"
                                   placeholder="last name" value={client.lname} onChange={handleInputChange}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="embg" className="col-sm-4 offset-sm-1 text-left">EMBG</label>
                        <div className="col-sm-6">
                            <input type="number" min="1000000000000" max="9999999999999" className="form-control" id="embg"
                                   name="embg"
                                   placeholder="EMBG" value={client.embg} onChange={handleInputChange}/>
                        </div>
                    </div>



                    <div className="form-group row">
                        <label htmlFor="employees" className="col-sm-4 offset-sm-1 text-left">Employee</label>
                        <div className="col-sm-2">
                            {employeesDropDown}
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



        </div>





    );
};

export default Purchase;