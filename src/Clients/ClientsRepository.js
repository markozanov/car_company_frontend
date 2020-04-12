import axios from '../axios'

class clientsService {
    static getAll(){
        return axios.get("/clients");
    }

    static getClientByEmbg(embg){
        return axios.get("/clients/" + embg);
    }
}

export default clientsService;