import React, {useEffect, useState} from 'react'
import './App.css';
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from "react-router-dom";
import Header from "./header";
import carsService from "./Cars/CarsRepository";
import CarDetails from "./Cars/CarDetails";
import CarEdit from "./Cars/CarEdit";
import Cars from "./Cars/Cars";
import CarAdd from "./Cars/CarAdd";
import saloonsService from "./Saloons/SaloonsRepository";
import Saloons from "./Saloons/Saloons";
import SaloonEdit from "./Saloons/SaloonEdit";
import SaloonAdd from "./Saloons/SaloonAdd";
import SaloonDetails from "./Saloons/SaloonDetails";
import EmployeeEdit from "./Employees/EmployeeEdit";
import EmployeeAdd from "./Employees/EmployeeAdd";
import EmployeeDetails from "./Employees/EmployeeDetails";
import employeesService from "./Employees/EmployeesRepository";
import Employees from "./Employees/Employees";
import usersService from "./Users/UsersRepository";
import UserEdit from "./Users/UserEdit";
import UserAdd from "./Users/UserAdd";
import Users from "./Users/Users";
import Purchase from "./Purchases/Purchase";
import Purchases from "./Purchases/Purchases";
import purchasesService from "./Purchases/PurchasesRepository";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Success from "./Auth/Success";
import Failure from "./Auth/Failure";
import {sha256} from "js-sha256";
import Logout from "./Auth/Logout";
import clientsService from "./Clients/ClientsRepository";
import Clients from "./Clients/Clients";
import Home from "./Home";
import Congrats from "./Purchases/Congrats";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cars: {},
            saloons: {},
            employees: {},
            users: {},
            purchases: {},
            clients: {}
        };
    }



    componentDidMount() {
        this.loadCars();
        this.loadSaloons();
        this.loadEmployees();
        this.loadUsers();
        this.loadPurchases();
        this.loadClients();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (localStorage.getItem("username") === null) {
            localStorage.setItem("username", "");
        }

        if (localStorage.getItem("signedIN") === null) {
            localStorage.setItem("signedIN", "false");
        }
    }

    loadCars() {
        carsService.getAll().then(response => {
            this.setState(() => ({
                cars: response.data.reduce((dict, car) => Object.assign(dict, {[car.car_id]: car}), {})
            }));
        });
    }

    loadSaloons() {
        saloonsService.getAll().then(response => {
            this.setState(() => ({
                saloons: response.data.reduce((dict, saloon) => Object.assign(dict, {[saloon.saloonID]: saloon}), {})
            }));
        });
    }

    loadEmployees() {
        employeesService.getAll().then(response => {
            this.setState( () => ({
                employees: response.data.reduce((dict, employee) => Object.assign(dict, {[employee.employee_id]: employee}), {})
            }));
        });
    }

    loadUsers(){
        usersService.getAll().then(response => {
            this.setState(() => ({
                 users: response.data.reduce((dict, user) => Object.assign(dict, {[user.username]: user}), {})
            }));
        });
    }

    loadPurchases(){
        purchasesService.getAll().then(response => {
            this.setState(() => ({
                purchases: response.data.reduce((dict, purchase) => Object.assign(dict, {[purchase.purchase_id]: purchase}), {})
            }));
        });
    }


    loadClients(){
        clientsService.getAll().then(response => {
            this.setState(()=> ({
                clients: response.data.reduce((dict, client) => Object.assign(dict, {[client.embg]: client}), {})
            }));
        });
    }

    updateCar = (carID, editedCar) => {
        carsService.updateCar(carID, editedCar).then(response =>
            this.setState(prevState => ({
                cars: Object.assign({}, prevState.cars, {[carID]: response.data})
            }))
        );
    };


    updateSaloon = (saloonID, editedSaloon) => {
        saloonsService.updateSaloon(saloonID, editedSaloon).then(response =>
            this.setState(prevState => ({
                saloons: Object.assign({}, prevState.saloons, {[saloonID]: response.data})
            }))
        );
    };

    updateEmployee = (employeeID, editedEmployee) => {
      employeesService.updateEmployee(employeeID, editedEmployee).then(response =>
      this.setState(prevState => ({
          employees: Object.assign({}, prevState.employees, {[employeeID]: response.data})
      }))
      );
    };

    updateUser = (username, editedUser) => {
      usersService.updateUser(username, editedUser).then(response =>
      this.setState(prevState => ({
          users: Object.assign({}, prevState.users, {[username]: response.data})
      }))
      );
    };

    deleteCar = (carID) => {
        const removeKey = (key, {[key]: _, ...rest}) => rest;
        carsService.deleteCar(carID).then(response =>
            this.setState(prevState => ({
                cars: removeKey(response.data.car_id, prevState.cars)
            }))
        );
    };


    deleteSaloon = (saloonID) => {
        const removeKey = (key, {[key]: _, ...rest}) => rest;
        saloonsService.deleteSaloon(saloonID).then(response => {
            this.setState(prevState => ({
                saloons: removeKey(response.data.saloonID, prevState.saloons)
            }))
        });
    };

    deleteEmployee = (employeeID) => {
        const removeKey = (key, {[key]: _, ...rest}) => rest;
        employeesService.deleteEmployee(employeeID).then(response => {
            this.setState(prevState => ({
                employees: removeKey(response.data.employee_id, prevState.employees)
            }))
        });
    };

    deleteUser = (username) => {
        const removeKey = (key, {[key]: _, ...rest}) => rest;
        usersService.deleteUser(username).then(response => {
            this.setState(prevState => ({
                users: removeKey(response.data.username, prevState.users)
            }))
        });
    };

    deletePurchase = (purchase_id) => {
        const removeKey = (key, {[key]: _, ...rest}) => rest;
        purchasesService.deletePurchase(purchase_id).then(response => {
            this.setState(prevState => ({
                purchases: removeKey(response.data.purchase_id, prevState.purchases)
            }))
        });
    };

    createCar = (car) => {
        carsService.createCar(car).then(response =>
            this.setState(prevState => ({
                cars: Object.assign({}, prevState.cars, {[response.data.car_id]: response.data})
            }))
        );
    };

    createSaloon = (saloon) => {
        saloonsService.createSaloon(saloon).then(response =>
            this.setState(prevState => ({
                saloons: Object.assign({}, prevState.saloons, {[response.data.saloonID]: response.data})
            }))
        );
    };

    createEmployee = (employee) => {
      employeesService.createEmployee(employee).then(response =>
      this.setState(prevState => ({
          employees: Object.assign({}, prevState.employees, {[response.data.employee_id]: response.data})
      }))
      );
    };




    createPurchase = (purchase) => {
      purchasesService.createPurchase(purchase).then(response =>
      this.setState(prevState => ({
          purchases: Object.assign({}, prevState.purchases, {[response.data.purchase_id]: response.data})
      }))
      );
    };


    authenticate = (user) => {
        let userDB = Object.values(this.state.users).find(u => u.username === user.username);
        let passToCheck  = sha256(user.password);
        console.log(userDB);
        let passInDb = userDB.password;
        console.log(passToCheck);
        console.log(passInDb);
        if (passInDb === passToCheck) {
            localStorage.setItem("signedIN", "true");
            localStorage.setItem("username", user.username);
            window.location.href = "/success"
        }
        else {
            window.location.href = "/failure"
        }
    };


    render() {

        const routing = (
            <Router>
                <Header/>

                <main role="main" className="mt-3">
                    <div className="container">
                        <Switch>
                            <Route path={"/cars"} exact
                                   render={() => <Cars cars={this.state.cars}
                                                       onDelete={this.deleteCar}/>}/>
                            {localStorage.getItem("signedIN") === "true" && (
                            <Route path={"/cars/:carID/edit"}
                                   render={() => <CarEdit onSubmit={this.updateCar}/>}/>
                            )}

                            <Route path={"/cars/:carID/details"}
                                   render={routerProps => <CarDetails routerProps={routerProps}/>}/>

                            {localStorage.getItem("signedIN") === "true" &&(
                            <Route path={"/cars/new"} exact
                                   render={() => <CarAdd onCreate={this.createCar}
                                                         saloons={this.state.saloons}/>}/>
                            )}

                            <Route path={"/saloons"} exact
                                   render={() => <Saloons saloons={this.state.saloons}
                                                          onDelete={this.deleteSaloon}/>}/>

                            {localStorage.getItem("signedIN") === "true" && (
                            <Route path={"/saloons/:saloonID/edit"}
                                   render={() => <SaloonEdit onSubmit={this.updateSaloon}/>}/>
                            )}

                            <Route path={"/saloons/:saloonID/details"}
                                   render={() => <SaloonDetails cars={this.state.cars}
                                                                employees={this.state.employees}/>}/>

                            {localStorage.getItem("signedIN") === "true" && (
                            <Route path={"/saloons/new"} exact
                                   render={() => <SaloonAdd onCreate={this.createSaloon}/>}/>
                            )}

                            {localStorage.getItem("signedIN") === "true" && (
                            <Route path={"/employees"} exact
                                   render={() => <Employees employees={this.state.employees}
                                                          onDelete={this.deleteEmployee}/>}/>
                            )}

                            {localStorage.getItem("signedIN") === "true" && (
                            <Route path={"/employees/:employeeID/edit"}
                                   render={() => <EmployeeEdit onSubmit={this.updateEmployee}/>}/>
                            )}
                            {localStorage.getItem("signedIN") === "true" && (
                                <Route path={"/employees/:employeeID/details"}
                                       render={routerProps => <EmployeeDetails routerProps={routerProps}/>}/>
                            )}


                            {localStorage.getItem("signedIN") === "true" && (
                                <Route path={"/users"} exact
                                       render={() => <Users users={this.state.users}
                                                            onDelete={this.deleteUser}/>}/>
                                )}

                            {localStorage.getItem("signedIN") === "true" && (
                            <Route path={"/users/:username/edit"}
                                   render={() => <UserEdit onSubmit={this.updateUser}/>}/>
                            )}



                            {localStorage.getItem("signedIN") === "false" && (
                            <Route path={"/cars/:carID/purchase"} render={() => <Purchase onCreate={this.createPurchase}/>}/>
                            )}

                            {localStorage.getItem("signedIN") === "true" && (
                            <Route path={"/purchases"} exact
                                   render={() => <Purchases purchases={this.state.purchases}
                                                        onDelete={this.deletePurchase}/>}/>
                            )}


                            {localStorage.getItem("signedIN") === "false" && (
                            <Route path={"/login"}
                                    render={() => <Login onSubmit={this.authenticate}/>}/>
                            )}
                            {localStorage.getItem("signedIN") === "false" && (
                            <Route path={"/register"}
                                   render={() => <Register onCreate={this.createEmployee}
                                                        saloons={this.state.saloons}/>}/>
                            )}

                            {localStorage.getItem("signedIN") === "true" && (
                                <Route path={"/logout"}
                                       render = {() => <Logout/>}/>
                            )}

                            {localStorage.getItem("signedIN") === "true" && (
                                <Route path={"/clients"}
                                       render = {() => <Clients clients = {this.state.clients}/>}/>
                            )}

                            <Route path={"/success"} render={() => <Success/>}/>
                            <Route path={"/failure"} render={() => <Failure/>}/>
                            <Route path={"/congrats"} render={() => <Congrats/>}/>
                            <Route path={"/"} exact render={() => <Home/>}/>
                            <Route render={() => <Redirect to={"/"}/>}/>
                        </Switch>
                    </div>

                </main>
            </Router>
        );
        return (
            <div className="App">
                {routing}
            </div>
        );
    }
}

export default App;
