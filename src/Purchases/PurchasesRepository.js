import axios from '../axios'

class purchasesService{

    static getAll(){
        return axios.get("/purchases")
    }

    static getPurchaseById(id){
        return axios.get("/purchases/" + id);
    }

    static deletePurchase(id){
        return axios.delete("/purchases/" + id + "/delete");
    }

    static createPurchase(purchase){
        return axios.post("/purchases", purchase)
    }
}

export default purchasesService;