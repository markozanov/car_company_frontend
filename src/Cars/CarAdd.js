import React, {useState} from "react";
import {Redirect} from "react-router-dom"

const CarAdd = (props) => {

    const emptyCar = {
        name: "",
        year: 0,
        horsepower: 0,
        enginecapacity: 0,
        colour: "",
        price: 0,
        vehicletype: 0,
        sold: false,
        saloon: 0,
    };

    const [car, setCar] = useState(emptyCar);
    const [toRedirect, setToRedirect] = useState(false);
    const [isInputValid, setIsInputValid] = useState(false);

    const onFormSubmit = (e) => {
        e.preventDefault();

        let chosenSaloon = props.saloons[car.saloon];
        console.log(chosenSaloon);

        let carWithSaloon = {...car, saloon: chosenSaloon};

        const isValid = validateCar(carWithSaloon);

        if (!isValid)
            return;

        console.log(carWithSaloon);
        console.log(chosenSaloon);

        props.onCreate(carWithSaloon);
        setToRedirect(true);
    };

    const resetValues = () => {
        setCar(emptyCar);
        setIsInputValid(false);
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

        if(c.vehicletype < 0 || c.vehicletype > 4 || c.vehicletype === null)
            isValid = false;

        if(c.saloon === 0 || c.saloon === null)
            isValid = false;

        if(c.saloon?.employees === null || c.saloon?.employees?.length === 0)
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

        setCar(changedCar);
        validateCar(changedCar);

        console.log(name, value);

    };


    const cancelGoBack = () => {
        setToRedirect(true);
    };

    if (toRedirect)
        return <Redirect to={"/cars"}/>;

    console.log(props.saloons);

    let saloonsDropDown = (
        <select name="saloon" id="saloon" onChange={handleInputChange}>
            <option disabled value="" selected hidden> Select saloon</option>
            {Object.values(props.saloons)
                .filter(s => s.employees.length > 0 && s.carCapacity > s.cars.length)
                .map(s => <option key={s.saloonId} value={s.saloonID}>{s.city}</option>)}
        </select>
    );

    return (
        <div className="row">
            <form className="card" onSubmit={onFormSubmit}>
                <h4 className="text-upper text-left">Add Car</h4>

                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-4 offset-sm-1 text-left">Name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="name" name="name"
                               placeholder="name" value={car.name} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="horsepower" className="col-sm-4 offset-sm-1 text-left">Horsepower</label>
                    <div className="col-sm-6">
                        <input type="number" step="any" min="90" max="1000" className="form-control" id="horsepower"
                               name="horsepower"
                               placeholder="horsepower" value={car.horsepower} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="enginecapacity" className="col-sm-4 offset-sm-1 text-left">Engine Capacity</label>
                    <div className="col-sm-6">
                        <input type="number" step="any" min="1.4" max="7.0" className="form-control" id="enginecapacity"
                               name="enginecapacity"
                               placeholder="enginecapacity" value={car.enginecapacity} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="price" className="col-sm-4 offset-sm-1 text-left">Price</label>
                    <div className="col-sm-6">
                        <input type="number" step="any" min="15000" max="150000" className="form-control" id="price" name="price"
                               placeholder="price" value={car.price} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="year" className="col-sm-4 offset-sm-1 text-left">Year</label>
                    <div className="col-sm-6">
                        <input type="number" step="any" min="2000" max="2020" className="form-control" id="year" name="year"
                               placeholder="year" value={car.year} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="price" className="col-sm-4 offset-sm-1 text-left">Colour</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="colour" name="colour"
                               placeholder="colour" value={car.colour} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="vehicletpye" className="col-sm-4 offset-sm-1 text-left">Vehicle Type</label>
                    <div className="col-sm-6">
                        <input type="number" step="any" min="0" max="4" className="form-control" id="vehicletype"
                               name="vehicletype"
                               placeholder="vehicletype" value={car.vehicletype} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <ul>
                            <li><strong>0</strong>: SEDAN</li>
                            <li><strong>1</strong>: HATCHBACK</li>
                            <li><strong>2</strong>: SALOON</li>
                            <li><strong>3</strong>: SUV</li>
                            <li><strong>4</strong>: SPORT</li>
                        </ul>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="saloon_id" className="col-sm-4 offset-sm-1 text-left">Saloon</label>
                    <div className="col-sm-6">
                        {saloonsDropDown}
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

export default CarAdd;