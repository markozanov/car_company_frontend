import React, {useEffect, useState} from "react";
import {Redirect, useParams} from "react-router-dom"

const EmployeeAdd = (props) => {

    const emptyEmployee = {
        fname: "",
        lname: "",
        saloon: 0,
    };

    const [employee, setEmployee] = useState(emptyEmployee);
    const [toRedirect, setToRedirect] = useState(false);
    const [isInputValid, setIsInputValid] = useState(false);

    const onFormSubmit = (e) => {
        e.preventDefault();

        let chosenSaloon = props.saloons[employee.saloon];
        console.log(chosenSaloon);

        let employeeWithSaloon = {...employee, saloon: chosenSaloon};

        const isValid = validateEmployee(employeeWithSaloon);

        if (!isValid)
            return;

        console.log(employeeWithSaloon);
        console.log(chosenSaloon);

        props.onCreate(employeeWithSaloon);
        setToRedirect(true);
    };

    const resetValues = () => {
        setEmployee(emptyEmployee);
        setIsInputValid(false);
    };

    const validateEmployee = (e) => {
        let isValid = true;

        if (e.fname === "" || e.fname.length > 50)
            isValid = false;

        if (e.lname === "" || e.lname.length > 50)
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

        const changedEmployee = {
            ...employee,
            [name]: value
        };

        setEmployee(changedEmployee);
        validateEmployee(changedEmployee);


    };


    const cancelGoBack = () => {
        setToRedirect(true);
    };

    if (toRedirect)
        return <Redirect to={"/employees"}/>;





    let saloonsDropDown = (
        <select name="saloon" id="saloon" onChange={handleInputChange}>
            <option disabled value="" selected hidden> Select saloon</option>
            {Object.values(props.saloons).map(s => {
                return <option key={s.saloonId} value={s.saloonID}>{s.city}</option>
            })}
        </select>
    );

    return (
        <div className="row">
            <form className="card" onSubmit={onFormSubmit}>
                <h4 className="text-upper text-left">Add Employee</h4>

                <div className="form-group row">
                    <label htmlFor="fname" className="col-sm-4 offset-sm-1 text-left">First Name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="fname" name="fname"
                               placeholder="fname" value={employee.fname} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="lname" className="col-sm-4 offset-sm-1 text-left">Last Name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="lname" name="lname"
                               placeholder="lname" value={employee.lname} onChange={handleInputChange}/>
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

export default EmployeeAdd;