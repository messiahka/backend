import { Router } from "express";
import { usersModel } from "../dao/models/users.model.js";

const router = Router();

//mongo session
router.post("/registro", async (req, res) => {
  const { email } = req.body;
  const existeUsuario = await usersModel.find({ email });
  console.log("HOLAAA", existeUsuario);
  if (existeUsuario.length !== 0) {
    res.redirect("/views/errorRegistro");
  } else {
    await usersModel.create(req.body);
    res.redirect("/views/login");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const usuario = await usersModel.find({ email, password });

  if (usuario.length !== 0) {
    for (const key in req.body) {
      req.session[key] = req.body[key];
    }
    req.session.logged = true; // le aplicamos una propiedad al objeto session, la ponemos en true para decirle que esta logueado
    if (email === "adminCoder@coder.com" && password === "admincod3r123") {
      req.session.admin = true;
    } else {
      req.session.admin = false;
    }
    console.log(email);
    if (req.session.email === usuario[0].email) {
      req.session.first_name = usuario[0].first_name;
      req.session.last_name = usuario[0].last_name;
      req.session.age = usuario[0].age;
    }
    if (req.session.admin === true) {
      res.redirect("/views/admin");
    } else {
      res.redirect("/views/products");
    }
  } else {
    res.redirect("/views/errorLogin");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) console.log(error);
    else res.redirect("/views/login");
  });
});

export default router;
