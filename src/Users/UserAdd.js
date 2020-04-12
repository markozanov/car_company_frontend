import React, {useEffect, useState} from "react";
import {Redirect, useParams} from "react-router-dom"

const UserAdd = (props) => {

    const emptyUser = {
        username: "",
        password: "",
        is_admin: false,
    };

    const [user, setUser] = useState(emptyUser);
    const [toRedirect, setToRedirect] = useState(false);
    const [isInputValid, setIsInputValid] = useState(false);

    const onFormSubmit = (e) => {
        e.preventDefault();

        const isValid = validateUser(user);

        if (!isValid)
            return;

        console.log(user);

        props.onCreate(user);
        setToRedirect(true);
    };

    const resetValues = () => {
        setUser(user);
        setIsInputValid(false);
    };

   const validateUser = (u) => {
        let isValid = true;

        if (u.username === "" || u.username.length > 50)
            isValid = false;

        if (u.password === "" || u.password.length > 50)
            isValid = false;


        setIsInputValid(isValid);

        return isValid;
    };

    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value;

        value = target.value;

        const changedUser = {
            ...user,
            [name]: value
        };

        setUser(changedUser);
        validateUser(changedUser);

        console.log(name, value);

    };


    const cancelGoBack = () => {
        setToRedirect(true);
    };

    if (toRedirect)
        return <Redirect to={"/users"}/>;



    return (
        <div className="row">
            <form className="card" onSubmit={onFormSubmit}>
                <h4 className="text-upper text-left">Add User</h4>

                <div className="form-group row">
                    <label htmlFor="username" className="col-sm-4 offset-sm-1 text-left">Username</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="username" name="username"
                               placeholder="username" value={user.username} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="password" className="col-sm-4 offset-sm-1 text-left">Password</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="password" name="password"
                               placeholder="password" value={user.password} onChange={handleInputChange}/>
                    </div>
                </div>


                <div className="form-group row">
                    <label htmlFor="is_admin" className="col-sm-4 offset-sm-1 text-left">Admin privileges</label>
                    <div className="col-sm-6">
                        {/* RADIO BUTTON*/}
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

export default UserAdd;