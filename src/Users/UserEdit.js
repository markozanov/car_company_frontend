import React, {useEffect, useState} from "react";
import usersService from "./UsersRepository";
import {Redirect, useParams} from "react-router-dom";
import {sha256} from "js-sha256";

const UserEdit = (props) => {
    const [user, setUser] = useState({});
    const [oldUser, setOldUser] = useState({});
    const [toRedirect, setToRedirect] = useState(false);
    const [isInputValid, setIsInputValid] = useState(true);
    const {username} = useParams();

    if (localStorage.getItem("username") !== username) {
        window.location.href = "/users";
    }

    useEffect( () => {
        usersService.getUserByUsername(username).then(response => {
            setUser({
                username: response.data.username,
                password: ""
            });
            setOldUser(response.data);
            // console.log(JSON.stringify(response.data));
        })
    }, []);

    const onFormSubmit = (e) => {
        e.preventDefault();

        if(!isInputValid)
            return;

        let modifiedUser = {
            username: user.username,
            password: sha256(user.password),
            is_admin: user.is_admin
        };
        props.onSubmit(username, modifiedUser);
        setToRedirect(true);
    };

    const resetValues = () => {
        setUser(oldUser);
        setIsInputValid(true);
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
    };

    const cancelGoBack = () => {
        setToRedirect(true);
    };

    if(toRedirect)
        return <Redirect to={"/users"}/>;


    return (
        <div className="row">
            <form className="card" onSubmit={onFormSubmit}>
                <h4 className="text-upper text-left">Edit User</h4>
                <div className="form-group row">
                    <label htmlFor="user_id" className="col-sm-4 offset-sm-1 text-left">Username</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="id" name="username"
                               placeholder="Username" disabled value={username}/>
                    </div>
                </div>



                <div className="form-group row">
                    <label htmlFor="password" className="col-sm-4 offset-sm-1 text-left">New Password</label>
                    <div className="col-sm-6">
                        <input type="password"  className="form-control" id="password" name="password"
                               value={user.password} onChange={handleInputChange}/>
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

export default UserEdit;