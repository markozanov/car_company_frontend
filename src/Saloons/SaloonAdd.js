import React, {useState} from "react";
import {Redirect} from "react-router-dom"

const SaloonAdd = (props) => {

    const emptySaloon = {
        city: "",
        carCapacity: 0,
    };

    const [saloon, setSaloon] = useState(emptySaloon);
    const [toRedirect, setToRedirect] = useState(false);
    const [isInputValid, setIsInputValid] = useState(false);

    const onFormSubmit = (e) => {
        e.preventDefault();

        const isValid = validateSaloon(saloon);

        if (!isValid)
            return;

        console.log(JSON.stringify(saloon));

        props.onCreate(saloon);
        setToRedirect(true);
    };

    const resetValues = () => {
        setSaloon(emptySaloon);
        setIsInputValid(false)
    };

    const validateSaloon = (s) => {
        let isValid = true;

        if (s.city === "" || s.city.length > 50)
            isValid = false;

        if(s.carCapacity === 0 || s.carCapacity === null)
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

        const changedSaloon = {
            ...saloon,
            [name]: value
        };

        setSaloon(changedSaloon);
        validateSaloon(changedSaloon);
    };


    const cancelGoBack = () => {
        setToRedirect(true);
    };

    if (toRedirect)
        return <Redirect to={"/saloons"}/>;

    return (
        <div className="row">
            <form className="card" onSubmit={onFormSubmit}>
                <h4 className="text-upper text-left">Add Saloon</h4>


                <div className="form-group row">
                    <label htmlFor="cityName" className="col-sm-4 offset-sm-1 text-left">City</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="cityName" name="city"
                               placeholder="e.g. Skopje" value={saloon.city} onChange={handleInputChange}/>
                    </div>
                </div>


                <div className="form-group row">
                    <label htmlFor="carCapacity" className="col-sm-4 offset-sm-1 text-left">Car Capacity</label>
                    <div className="col-sm-6">
                        <input type="number" step="any" min="0" className="form-control" id="carCapacity"
                               name="carCapacity"
                               placeholder="carCapacity" value={saloon.carCapacity} onChange={handleInputChange}/>
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

export default SaloonAdd;