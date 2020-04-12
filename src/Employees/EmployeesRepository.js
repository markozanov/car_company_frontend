import axios from '../axios'

class employeesService {
    static getAll(){
        return axios.get("/employees");
    }

    static getEmployeeById(id){
        return axios.get("/employees/" + id);
    }

    static deleteEmployee(id){
        return axios.delete("/employees/" + id + "/delete")
    }

    static createEmployee(employee){
        return axios.post("/employees", employee);
    }

    static updateEmployee(id, employee){
        return axios.patch(`/employees/${id}/edit?fname=${employee.fname}&lname=${employee.lname}`);
    }

}

export default employeesService;