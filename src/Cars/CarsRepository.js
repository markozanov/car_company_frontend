import axios from '../axios'

class carsService {
    static getAll() {
        return axios.get("/cars");
    }

    static updateCar(carID, car){
        return axios.patch(`/cars/${carID}/edit?name=${car.name}&enginecapacity=${car.enginecapacity}&horsepower=${car.horsepower}&year=${car.year}
        &colour=${car.colour}&price=${car.price}&vehicletype=${car.vehicletype}`);
    }

    static deleteCar(carID){
        return axios.delete("/cars/" + carID + "/delete")
    }

    static createCar(car){
        return axios.post("/cars", car);
    }

    static getCarByName(carName){
        return axios.get("/cars/name/" + carName);
    }

    static getCarByID(carID){
        return axios.get("/cars/" + carID);
    }
}

export default carsService;