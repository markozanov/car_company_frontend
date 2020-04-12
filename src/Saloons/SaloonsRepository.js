import axios from '../axios'

class saloonsService {
    static getAll() {
        return axios.get("/saloons");
    }

    static updateSaloon(saloonID, saloon){
        return axios.patch(`/saloons/${saloonID}/edit?city=${saloon.city}&capacity=${saloon.carCapacity}`);
    }

    static deleteSaloon(saloonID){
        return axios.delete("/saloons/" + saloonID + "/delete")
    }

    static createSaloon(saloon){
        return axios.post("/saloons", saloon);
    }

    static getSaloonByCity(city){
        return axios.get("/saloons/" + city);
    }

    static getSaloonByID(saloonID){
        return axios.get("/saloons/" + saloonID);
    }
}

export default saloonsService;