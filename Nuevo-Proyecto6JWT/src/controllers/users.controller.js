import { getUsers, createUser } from "../services/users.service.js";

export async function getAllUsers(req, res){
    try {
        const users = await getUsers()
        if (users.length === 0){
            res.status(404).json({message: "No hay usuarios"})
        } else {
            res.status(200).json(users)
        }
    } catch (error) {
        res.status(500).json({error: error.message}) 
    }
}

export async function createOneUser(req, res){
    const {last_name, first_name, email, age, password, role} = req.body
        if(!last_name || !first_name || !email || !age || !password || !role){
            res.status(400).json({message: "Faltan datos"})
        }
    try {
       const newUser = await createUser(req.body)
       res.status(201).json({message: 'User Created', user: newUser})
    } catch (error) {
        res.status(500).json({error})
    }
}