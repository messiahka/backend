import { Router } from "express";
import passport from "passport";
import authController from "../controllers/auth.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();



router.get(
  "/githubRegister",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/githubCallback",
  passport.authenticate("github", {
    failureRedirect: "/views/errorRegister",
  }),
  authController.githubCallback
);

router.post("/jwtRegister", authController.jwtRegister);

router.post("/jwtLogin", isAdmin, authController.jwtLogin);

export default router;
