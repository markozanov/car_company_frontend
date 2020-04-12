import React, {useState} from "react";
import {Redirect} from "react-router-dom";

const Login = (props) =>{

    const emptyUser = {
        username: "",
        password: ""
    };

    const [user, setUser] = useState(emptyUser);
    const [toRedirect, setToRedirect] = useState(0);
    const [isInputValid, setIsInputValid] = useState(false);



    const onFormSubmit = (e) =>{
        e.preventDefault();

        console.log(user);
        props.onSubmit(user);
    };


    const resetValues = () =>{
        setUser(emptyUser);
        setIsInputValid(false);
    };

    const handleInputChange = (event) =>{
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

    const validateUser = (u) =>{
      // THINGS TO DO
    };

    const cancelGoBack = () => {
        setToRedirect(1);
    };

    const goToRegister = () =>{
        setToRedirect(2);
    };

    if (toRedirect === 2)
        return <Redirect to={"/register"}/>;
    else if(toRedirect === 1)
        return <Redirect to={"/users"}/>;




    return (
        <div className="row">
            <form className="card" onSubmit={onFormSubmit}>
                <h4 className="text-upper text-left">Enter Credentials</h4>

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
                        <input type="password" className="form-control" id="password" name="password"
                               placeholder="password" value={user.password} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="password" className="col-sm-4 offset-sm-1 text-left">Don't have an account? Register here.</label>
                    <div
                        className="offset-sm-1 col-sm-3  text-center">
                    <button
                        onClick={() => goToRegister()}
                        type="button"
                        className="btn btn-success text-upper">
                        Register
                    </button>
                    </div>
                </div>




                <div className="form-group row">
                    <div
                        className="offset-sm-1 col-sm-3  text-center">
                        <button
                            type="submit"

                            className="btn btn-primary text-upper">
                            Log in
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

export default Login;