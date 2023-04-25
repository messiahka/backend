import { Router } from "express";
import passport from "passport";
import { UsersModel } from "../persistencia/mongoDB/models/users.model.js"
import "../middlewares/passportStrategies.js"// importar las estrategias de Passport

const router = Router();



router.get('/current', async (req, res) =>{
    const session = req.session
    // console.log(session)
    const userId = session.passport.user
    console.log(userId)
    if (!userId) {
        return res.status(401).json({ error: 'No hay usuario autenticado' });
      }

      try {
        const user = await UsersModel.findById(userId);
        if (!user) {
          return res.status(404).json({ error: 'No se encontró el usuario' });
        }
        const fullName = `${user.first_name} ${user.last_name}`;
        return res.json({ user: fullName, email: user.email }); 
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ocurrió un error al buscar el usuario' });
      }
})

export default router;

