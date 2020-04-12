import React, {useEffect, useState} from "react";
import employeesService from "./EmployeesRepository";
import {Redirect, useParams} from "react-router-dom";

const EmployeeEdit = (props) => {
    const [employee, setEmployee] = useState({});
    const [oldEmployee, setOldEmployee] = useState({});
    const [toRedirect, setToRedirect] = useState(false);
    const [isInputValid, setIsInputValid] = useState(true);
    const {employeeID} = useParams();

    useEffect( () => {
        employeesService.getEmployeeById(employeeID).then(response => {
            setEmployee(response.data);
            setOldEmployee(response.data);
            console.log(JSON.stringify(response.data));
        })
    }, []);

    const onFormSubmit = (e) => {
        e.preventDefault();


        let modifiedEmployee = {
            fname: employee.fname,
            lname: employee.lname
        };


        if(!validateEmployee(modifiedEmployee))
            return;

        props.onSubmit(employeeID, modifiedEmployee);
        setToRedirect(true);
    };

    const resetValues = () => {
        setEmployee(oldEmployee);
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

        const changedEmployee = {
            ...employee,
            [name]: value
        };

        setEmployee(changedEmployee);
    };

    const cancelGoBack = () => {
        setToRedirect(true);
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


    if(toRedirect)
        return <Redirect to={"/employees"}/>;


    return (
        <div className="row">
            <form className="card" onSubmit={onFormSubmit}>
                <h4 className="text-upper text-left">Edit Employee</h4>
                <div className="form-group row">
                    <label htmlFor="car" className="col-sm-4 offset-sm-1 text-left">Employee ID</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="car" name="name"
                               placeholder="Car name" disabled value={employeeID}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="fname" className="col-sm-4 offset-sm-1 text-left">First Name</label>
                    <div className="col-sm-6">
                        <input type="text"  className="form-control" id="fname" name="fname"
                               disabled value={employee.fname} />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="lname" className="col-sm-4 offset-sm-1 text-left">Last Name</label>
                    <div className="col-sm-6">
                        <input type="text"  className="form-control" id="lname" name="lname"
                              value={employee.lname} onChange={handleInputChange}/>
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

export default EmployeeEdit;