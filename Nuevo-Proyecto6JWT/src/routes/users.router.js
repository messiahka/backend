import {Router} from 'express';
import passport from 'passport';
import dotenv from "dotenv";
import { hashData, comparePassword, generateToken } from '../utils/bcrypt.utils.js';
import UsersManager from "../persistencia/usersManager.js";
import { getAllUsers, createOneUser } from '../controllers/users.controller.js';

const router = Router();

router.get('/', getAllUsers);
router.post('/', createOneUser);


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

// login con passport
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
    req.session.logged = true;
    if (
      req.user.email === "adminCoder@coder.com" &&
      req.user.password ===
        "$2b$10$iuoWfUS.eyY.qJAqj/H9lOp/FkNxRaWFT9GkIthMLq4Hr/s6W.T6a"
    ) {
      req.session.admin = true;
      req.user.role = "admin";
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

// router.post('/login', passport.authenticate('login', {
//   failureRedirect: '/errorLogin',
//   passReqToCallback: true
// })
// ,(req, res) => {
//   const user = {
//       email: req.user.email,
//       first_name: req.user.first_name,
//       last_name: req.user.last_name,
//       age: req.user.age,
//       role: req.user.role
//   };

//   const token = generateToken(user)
//   console.log('token:', token)
//   res.cookie('token', token)
//   // const isValid = jwt.verify(token, 'secretJWT')
//   // if(isValid){
//   //     console.log(isValid)
//   //     req.user = isValid.user
//   //     res.redirect('/products')
//   // }else{
//   //     res.json({message: 'error'})
//   // }
//   // if(req.user.role === 'Admin'){
//   //     res.redirect('/admin')
//   // }else{
//   //     res.redirect('/products')
//   // }
// }
// );

// login generando token
// router.post("/login", async (req, res) => {
//   // console.log(req.body)
//   const { email, password } = req.body;
//   const usuario = await usersModel.findOne({ email });

//   if (usuario) {
//     const passwordMatch = await comparePassword(password, usuario.password);
//     if (passwordMatch) {
//       if (
//         usuario.email === "adminCoder@coder.com" &&
//         usuario.password ===
//           "$2b$10$3ZlstD529exbS44J0ZMxjOAnG73CxlUUcpJ8SXLsq6Oqo2MJ7ngAK"
//       ) {
//         usuario.role = "admin";
//         const token = generateToken(usuario);
//         console.log(usuario)
//         return res
//           .cookie("token", token, { httpOnly: true })
//           .redirect("/views/admin");
//       } else {
//         const token = generateToken(usuario);
//         console.log(usuario)
//         return res
//           .cookie("token", token, { httpOnly: true })
//           .redirect("/views/perfil");
//       }
//       // console.log(usuario)
//     }
//   }

//   return res.json({ message: "usuario o contraseña incorrectos" });
// });

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await usersModel.findOne({ email });
//   console.log(user)
//   if (!user || !(await comparePassword(password, user.password))) {
//     return res.status(401).json({ message: 'Invalid email or password' });
//   }
//   const token = generateToken({ id: user._id, role: user.role });
//   return res.status(200).json({ token });
// });

// router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
//   res.json({ message: 'Protected endpoint' });
// });

// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await usersModel.findOne({ email });
//     if(!user) return res.status(401).json({ message: 'Invalid email or password' });
//     const passwordMatch = await comparePassword(password, user.password);
//     if(!passwordMatch) return res.status(401).json({ message: 'Invalid email or password' });
//     const token = generateToken({ id: user._id, role: user.role });
//     res.json({ token });

    
//   } catch (error) {
//     throw new Error(error);
//   }
// })




















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
  // req.session.destroy((error) => {
  //   if (error) console.log(error);
  //   else res.redirect("/views/login");
  // });
  res.clearCookie("token").redirect("/views/login")
});
















//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// // REGISTRO
// router.post("/register", async (req, res) => {
//   console.log('estoy en post');
//     try {
//       const { firstname, lastname, email, age, password } = req.body;
  
//       // Verificar si el usuario está registrado
//       const userManager = new UsersManager();
//       const existeUser = await userManager.getUserByEmail(email);
  
//       if (existeUser) {
//         res.redirect("/errorRegister");
//       } else {
//         const newPass = await hashData(password);
  
//         const user = {
//           firstname,
//           lastname,
//           email,
//           age,
//         };
  
//         userManager.createUser({ ...user, password: newPass });
//         res.redirect("/login");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   });
  
//   // GITHUB PASSPORT
//   router.get(
//     "/github",
//     passport.authenticate("github", { scope: ["user:email"] })
//   );
  
//   router.get(
//     "/callbackGithub",
//     passport.authenticate("github", { failureRedirect: "/register" }),
//     async (req, res) => {
//       try {
//         // Buscar usuario
//         const userManager = new UsersManager();
//         const user = await userManager.getUserByEmail(req.user.email);
  
//         //Validar pass
//         if (user) {
//           //Guardar en sesion los datos del usuario desde MongoDB
//           for (const key in user) {
//             req.session[key] = user[key];
//           }
  
//           //Logged
//           req.session.logged = true;
  
//           //Admin
//           // eslint-disable-next-line no-undef
//           if (user.email === process.env.MAIL_ADMIN) {
//             req.session.isAdmin = true;
//           } else {
//             req.session.isAdmin = false;
//           }
  
//           res.redirect("/profile");
//         } else {
//           res.redirect("/errorLogin");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   );
  
//   // LOGIN
//   router.post("/login", async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       // Buscar usuario
//       const userManager = new UsersManager();
//       const user = await userManager.getUserByEmail(email);
  
//       //Validar pass
//       if (user) {
//         //Compare pass
//         const isValidPass = await comparePassword(password, user.password);
  
//         //Guardar en cookie con token los datos del usuario desde MongoDB
//         if (isValidPass) {
//           if (user.role == "admin") {
//             user.isAdmin = true;
//           } else {
//             user.isAdmin = false;
//           }
  
//           const token = await generateToken(user);
  
//           res.cookie("token", token, {
//             httpOnly: true,
//             maxAge: 3600000,
//             signed: true,
//           });
  
//           res.redirect("/profile");
//         } else {
//           res.redirect("/errorLogin");
//         }
//       } else {
//         res.redirect("/errorLogin");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   });
  
//   //LOGOUT
//   router.get("/logout", (req, res) => {
//     res.clearCookie("token").redirect("/login");
//   });

export default router