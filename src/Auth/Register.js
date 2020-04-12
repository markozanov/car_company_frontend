import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {sha256} from "js-sha256";

const Register = (props) =>{

    const emptyUser = {
        username: "",
        password: ""
    };

    const emptyEmployee = {
        fname: "",
        lname: "",
        saloon: 0,
    };

    const [employee, setEmployee] = useState(emptyEmployee);
    const [user, setUser] = useState(emptyUser);
    const [toRedirect, setToRedirect] = useState(false);



    const onFormSubmit = (e) =>{
        e.preventDefault();

        let chosenSaloon = props.saloons[employee.saloon];

        const isValidU = validateUser(user);

        user.password = sha256(user.password);

        let employeeWithSaloon = {...employee, saloon: chosenSaloon};

        const isValid = validateEmployee(employeeWithSaloon);


        if (!isValid || !isValidU)
            return;


        let finalEmployee = {...employeeWithSaloon, user: user};

        props.onCreate(finalEmployee);

        window.location.href = "/login";
    };


    const resetValues = () =>{
        setUser(emptyUser);
        setEmployee(emptyEmployee);
    };

    const handleInputChangeUser = (event) =>{
        const target = event.target;
        const name = target.name;
        let value = target.value;


        const changedUser = {
            ...user,
            [name]: value
        };

        setUser(changedUser);
        validateUser(changedUser);
    };


    const handleInputChangeEmployee = (event) =>{
        const target = event.target;
        const name = target.name;
        let value = target.value;

        if(name === "password")
            value = sha256(value);

        const changedEmployee = {
            ...employee,
            [name]: value
        };

        setEmployee(changedEmployee);
        validateEmployee(changedEmployee);
    };


    const validateUser = (u) =>{
        let isValid = true;
        if(u.username === "" || u.username.length > 50)
            isValid = false;
        if(u.password === "" || u.password.length > 50 || u.password.length < 5)
            isValid = false;

        return isValid;
    };

    const validateEmployee = (e) =>{
        let isValid = true;
        if(e.fname === "" || e.fname.length > 50)
            isValid = false;
        if(e.lname === "" || e.lname.length > 50)
            isValid = false;
        if(e.saloon === 0 || e.saloon === null)
            isValid = false;

        return isValid;

    };

    const cancelGoBack = () => {
        setToRedirect(true);
    };


    if(toRedirect)
        return <Redirect to={"/employees"}/>;


    let saloonsDropDown = (
        <select name="saloon" id="saloon" onChange={handleInputChangeEmployee}>
            <option disabled value="" selected hidden> Select saloon</option>
            {Object.values(props.saloons).map(s => {
                return <option key={s.saloonId} value={s.saloonID}>{s.city}</option>
            })}
        </select>
    );



    return (
        <div className="row">
            <form className="card" onSubmit={onFormSubmit}>
                <h4 className="text-upper text-left">Enter Credentials</h4>

                <div className="form-group row">
                    <label htmlFor="username" className="col-sm-4 offset-sm-1 text-left">Username</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="username" name="username"
                               placeholder="username" value={user.username} onChange={handleInputChangeUser}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="password" className="col-sm-4 offset-sm-1 text-left">Password</label>
                    <div className="col-sm-6">
                        <input type="password" className="form-control" id="password" name="password"
                               placeholder="password" value={user.password} onChange={handleInputChangeUser}/>
                    </div>
                </div>



                <div className="form-group row">
                    <label htmlFor="title" className="col-sm-8 offset-sm-1 text-left">Enter personal info</label>
                </div>

                <div className="form-group row">
                    <label htmlFor="fname" className="col-sm-4 offset-sm-1 text-left">First Name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="fname" name="fname"
                               placeholder="fname" value={employee.fname} onChange={handleInputChangeEmployee}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="lname" className="col-sm-4 offset-sm-1 text-left">Last Name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="lname" name="lname"
                               placeholder="lname" value={employee.lname} onChange={handleInputChangeEmployee}/>
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

                            className="btn btn-primary text-upper">
                            Register
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

export default Register;