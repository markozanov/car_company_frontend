import CarRow from "./CarRow";
import {Link} from "react-router-dom";
import React, {Fragment} from "react";

const Cars = (props) => {
    const cars = Object.values(props.cars).map(car =>
    <CarRow car={car} onDelete={props.onDelete} key={car.car_id}/>
    );

    console.log(props.cars);

    let carsTable =(
      <div className="table-responsive">
          <table className="table tr-history table-striped small">
              <thead>
              <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Year</th>
                  <th scope="col">Price (€)</th>
                  <th scope="col">In Stock</th>
              </tr>
              </thead>
              <tbody>
              {cars}
              </tbody>
          </table>
      </div>
    );

    if(cars.length === 0) {
        carsTable = (
            <h6 className="text-info">
                No cars in stock.
            </h6>
        );
    }

    return (
        <Fragment>
            <h4 className="text-upper text-left row">Cars</h4>
            <div className="row">
                {carsTable}
            </div>

            {localStorage.getItem("signedIN") === "true" && (
            <Link className="btn btn-outline-secondary mb-3 row" to={"/cars/new"}>
                <span><strong>Add new Car</strong></span>
            </Link>
            )}
        </Fragment>
    )
};

export default Cars;