import axios from '../axios'

class usersService {
    static getAll(){
        return axios.get("/users");
    }

    static getUserByUsername(username){
        return axios.get(`/users/${username}`);
    }

    static deleteUser(username){
        return axios.delete("/users/" + username + "/delete");
    }

    static createUser(user){
        return axios.post("/users", user);
    }

    static updateUser(username, user){
        return axios.patch(`/users/${username}/edit?password=${user.password}`);
    }
}

export default usersService;