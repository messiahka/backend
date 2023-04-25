import UsersManager from "../persistencia/DAOs/usersDAOs/usersManager.js";
import UsersRepository from "../persistencia/repositories/users.repository.js";
import { hashData } from "../utils/bcrypt.utils.js";

// const usersManager = new UsersManager()
const usersRepository = new UsersRepository(new UsersManager());

export async function getUsers() {
    try {
        const users = await usersRepository.getUsers()
        return users
    } catch (error) {
        return new Error(error)
    }
}

// export async function createUser(objUser) {
//     try {
//        const hashPassword = await hashData(objUser.password)
//        const newUser = await usersManager.createUser({...objUser, password: hashPassword})
//        return newUser 
//     } catch (error) {
//         return new Error(error)
//     }
// }

export async function createUser(objUser) {
    try {
      const hashPassword = await hashData(objUser.password);
      const userDB = {
        first_name: objUser.first_name,
        last_name: objUser.last_name,
        email: objUser.email,
        password: hashPassword,
        age: objUser.age,
        cartId: objUser.cartId,
        role: objUser.role
      };
      const newUser = await usersRepository.createUser(userDB);
      return newUser;
    } catch (error) {
      return new Error(error);
    }
  }