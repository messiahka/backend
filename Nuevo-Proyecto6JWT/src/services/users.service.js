import UsersManager from "../persistencia/usersManager.js";
import { hashData } from "../utils/bcrypt.utils.js";

const usersManager = new UsersManager()

export async function getUsers() {
    try {
        const users = await usersManager.getUsers()
        return users
    } catch (error) {
        return new Error(error)
    }
}

export async function createUser(objUser) {
    try {
       const hashPassword = await hashData(objUser.password)
       const newUser = await usersManager.createUser({...objUser, password: hashPassword})
       return newUser 
    } catch (error) {
        return new Error(error)
    }
}