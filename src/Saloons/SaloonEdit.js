import React, {useEffect, useState} from "react";
import saloonsService from "./SaloonsRepository";
import {Redirect, useParams} from "react-router-dom";

const SaloonEdit = (props) => {
    const [saloon, setSaloon] = useState({});
    const [oldSaloon, setOldSaloon] = useState({});
    const [toRedirect, setToRedirect] = useState(false);
    const [isInputValid, setIsInputValid] = useState(true);
    const {saloonID} = useParams();

    useEffect( () => {
        saloonsService.getSaloonByID(saloonID).then(response => {
            setSaloon(response.data);
            setOldSaloon(response.data);
            console.log(JSON.stringify(response.data));
        })
    }, []);

    const onFormSubmit = (e) => {
        e.preventDefault();

        if(!isInputValid)
            return;

        let modifiedSaloon = {
            city: saloon.city,
            carCapacity: saloon.carCapacity,
        };

        if (!validateSaloon(modifiedSaloon))
            return;
        props.onSubmit(saloonID, modifiedSaloon);
        setToRedirect(true);
    };

    const resetValues = () => {
        setSaloon(oldSaloon);
        setIsInputValid(true);
    };

    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value;

        if (target.type === 'number')
            value = Number(target.value);
        else
            value = target.value;

        const changedSaloon = {
            ...saloon,
            [name]: value
        };

        setSaloon(changedSaloon);
    };

    const cancelGoBack = () => {
        setToRedirect(true);
    };


    const validateSaloon = (s) => {
        let isValid = true;

        if (s.city === "" || s.city.length > 50)
            isValid = false;

        if(s.carCapacity === 0 || s.carCapacity <= s.cars?.length || s.carCapacity === null)
            isValid = false;


        setIsInputValid(isValid);

        return isValid;
    };


    if(toRedirect)
        return <Redirect to={"/saloons"}/>;



    return (
        <div className="row">
            <form className="card" onSubmit={onFormSubmit}>
                <h4 className="text-upper text-left">Edit Saloon</h4>
                <div className="form-group row">
                    <label htmlFor="saloon" className="col-sm-4 offset-sm-1 text-left">Saloon ID</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="car" name="name"
                               placeholder="ID" disabled value={saloonID}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="city" className="col-sm-4 offset-sm-1 text-left">City</label>
                    <div className="col-sm-6">
                        <input type="text"  className="form-control" id="city" name="city"
                                value={saloon.city} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="carCapacity" className="col-sm-4 offset-sm-1 text-left">Car Capacity</label>
                    <div className="col-sm-6">
                        <input type="number" step="any" min="0" className="form-control" id="carCapacity" name="carCapacity"
                                value={saloon.carCapacity} onChange={handleInputChange}/>
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

export default SaloonEdit;