import { Router } from "express";
import { usersModel } from "../dao/models/users.model.js";
import { hashPassword, comparePassword } from "../utils.js";
import passport from "passport";

const router = Router();

//mongo session
// router.post("/registro", async (req, res) => {
//   const { email, password } = req.body;
//   const existeUsuario = await usersModel.find({ email });

//   if (existeUsuario.length !== 0) {
//     res.redirect("/views/errorRegistro");
//   } else {
//     const hashNewPassword = await hashPassword(password);
//     const newUser = { ...req.body, password: hashNewPassword };
//     await usersModel.create(newUser);
//     res.redirect("/views/login");
//   }
// });

//registro con passport
router.post(
  "/registro",
  passport.authenticate("registro", {
    failureRedirect: "/views/errorRegistro",
    successRedirect: "/views/login",
    passReqToCallback: true,
  })
);

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const usuario = await usersModel.find({ email });

//   if (usuario.length !== 0) {
//     //comparar contraseña
//     const passwordMatch = await comparePassword(password, usuario[0].password);
//     if (passwordMatch) {
//       for (const key in req.body) {
//         req.session[key] = req.body[key];
//       }
//       req.session.logged = true; // le aplicamos una propiedad al objeto session, la ponemos en true para decirle que esta logueado

//       if(req.session.email === "adminCoder@coder.com" && req.session.password === "$2b$10$3ZlstD529exbS44J0ZMxjOAnG73CxlUUcpJ8SXLsq6Oqo2MJ7ngAK"){
//         req.session.admin = true;
//       } else {
//         req.session.admin = false;
//       }
//       // console.log(req.session)
//       // if (email === "adminCoder@coder" && password === "admincod3r123") {
//       //   req.session.admin = true;
//       // } else {
//       //   req.session.admin = false;
//       // }
//       // console.log(email);
//       // if (req.session.email === usuario[0].email) {
//       //   req.session.first_name = usuario[0].first_name;
//       //   req.session.last_name = usuario[0].last_name;
//       //   req.session.age = usuario[0].age;
//       // }
//       // if (req.session.admin === true) {
//       return res.redirect("/views/perfil");
//     }
//   }
//   return res.redirect("/views/errorLogin");
// });

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const usuario = await usersModel.find({ email });

//   if (usuario.length !== 0) {
//     //comparar contraseña
//     const passwordMatch = await comparePassword(password, usuario[0].password);
//     if (passwordMatch) {
//       for (const key in req.body) {
//         req.session[key] = req.body[key];
//       }
//       req.session.logged = true; // le aplicamos una propiedad al objeto session, la ponemos en true para decirle que esta logueado

//       if(req.session.email === "adminCoder@coder.com" && req.session.password === "admincod3r123"){
//         req.session.admin = true;
//       } else {
//         req.session.admin = false;
//       }

//       if (req.session.email === usuario[0].email) {
//         req.session.first_name = usuario[0].first_name;
//         req.session.last_name = usuario[0].last_name;
//         req.session.age = usuario[0].age;
//       }

//       if (req.session.admin === true) {
//         return res.redirect("/views/admin"); // Aquí es donde redirigimos al usuario administrador a la ruta "/admin"
//       } else {
//         return res.redirect("/views/perfil"); // Si el usuario no es administrador, lo redirigimos a la ruta "/views/perfil"
//       }
//     }
//   }

//   return res.redirect("/views/errorLogin");
// });

//login con passport
router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/views/errorLogin",
    passReqToCallback: true,
  }),
  function (req, res) {
    req.session.email = req.user.email;
    req.session.first_name = req.user.first_name;
    req.session.last_name = req.user.last_name;
    req.session.age = req.user.age;
    if (
      req.user.email === "adminCoder@coder.com" &&
      req.user.password ===
        "$2b$10$3ZlstD529exbS44J0ZMxjOAnG73CxlUUcpJ8SXLsq6Oqo2MJ7ngAK"
    ) {
      req.session.admin = true;
    } else {
      req.session.admin = false;
    }
    if (req.session.admin === true) {
      res.redirect("/views/admin");
    } else {
      res.redirect("/views/perfil");
    }
  }
);

// login con github
router.get(
  "/loginGithub",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/github",
  passport.authenticate("github", { failureRedirect: "/views/errorLogin" }),
  async (req, res) => {
    req.session.email = req.user.email;
    req.session.first_name = req.user.first_name;
    req.session.last_name = req.user.last_name;
    req.session.age = req.user.age;
    res.redirect("/views/perfil");
  }
);

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) console.log(error);
    else res.redirect("/views/login");
  });
});

export default router;
