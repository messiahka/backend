import { Router } from "express";
import passport from "passport";

const router = Router();

router.get('/current', passport.authenticate('current', {session:false}), async (req, res) => {
    const user = {...req.user, password: undefined};
    res.json({user})
    
})

export default router;