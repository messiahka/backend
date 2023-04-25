import UsersDBDTO from "../DTOs/usersDB.dto.js";
import UsersRespDTO from "../DTOs/usersResp.dto.js";

export default class UsersRepository{
    constructor(dao){
        this.dao = dao
    }

    async createUser(user){
        const userDBDTO = new UsersDBDTO(user);
        const userDao = await this.dao.createUser(userDBDTO);
        const userRespDTO = new UsersRespDTO(userDao);
        return userRespDTO;
    }
}