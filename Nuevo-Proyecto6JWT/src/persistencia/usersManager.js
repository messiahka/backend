import {UsersModel} from './models/users.model.js'


export default class UsersManager {

    async getUsers() {
        try {
            const users = await UsersModel.find()
            return users
        } catch (error) {
            return new Error(error)
        }
    }

    async createUser(objUser) {
        try {
            const newUser = await UsersModel.create(objUser)
            return newUser
        } catch (error) {
            return new Error(error)
        }
    }

    // Obtener usuario por mail
  async getUserByEmail(email) {
    try {
      const user = await UsersModel.findOne({ email }).lean();
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}