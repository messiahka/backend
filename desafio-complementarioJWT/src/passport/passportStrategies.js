import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as jwtStrategy, ExtractJwt } from "passport-jwt";
import { usersModel } from "../dao/models/users.model.js";
import { hashPassword } from "../utils.js";
import { comparePassword } from "../utils.js";

// Local Strategy
// passport.use(
//   "registro",
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//       passReqToCallback: true,
//     },
//     async (req, email, password, done) => {
//       const usuario = await usersModel.find({ email });
//       if (usuario.length !== 0) {
//         return done(null, false);
//       }
//       const hashNewPassword = await hashPassword(password);
//       const newUser = { ...req.body, password: hashNewPassword };
//       const newUserDB = await usersModel.create(newUser);
//       done(null, newUserDB);
//     }
//   )
// );

// passport.use(
//   "login",
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//       passReqToCallback: true,
//     },
//     async (req, email, password, done) => {
//       const usuario = await usersModel.findOne({ email });
//       if (!usuario) {
//         return done(null, false);
//       }
//       const passwordMatch = await comparePassword(password, usuario.password);
//       if (!passwordMatch) {
//         return done(null, false);
//       } else {
//         return done(null, usuario);
//       }
//     }
//   )
// );

// Github Strategy
passport.use('github', new GithubStrategy({
    clientID: 'Iv1.26d3f4ebeff72228',
    clientSecret: '215dc4ee6401383bc7028a3533eaabe26e2e1c85',
    callbackURL: "http://localhost:8080/users/github"
}, async (accessToken, refreshToken, profile, done) => {
  const usuario = await usersModel.findOne({email:profile._json.email})
  return done(null, usuario)
  
}))

// JWT Strategy
// const cookieExtractor = (req) => {
//   const token = req?.cookies?.token
//   return token
// }

// // passport-jwt
// passport.use(
//   'jwt',
//   new jwtStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: 'secretJWT',
//     },
//     async (jwtPayload, done) => {
//       console.log('----jwtPayload----', jwtPayload)
//       done(null, jwtPayload.user)
//     }
//   )
// )

const cookieExtractor = (req)=>{
  const token = req?.cookies?.token
  return token
}

passport.use('jwtCookies', new jwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: 'secretJWT'
}, async (jwtPayload, done)=>{
  console.log('----jwtpayload----', jwtPayload);
  done(null, jwtPayload.user)
}))



// passport.use(
//   "current",
//   new jwtStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
//       secretOrKey: 'secretJWT'
//     },
//     async (jwtPayload, done ) => {
//         return done(null, jwtPayload);
//     }
//   )
// );

passport.serializeUser((usuario, done) => {
  done(null, usuario._id);
});

passport.deserializeUser(async (id, done) => {
  const usuario = await usersModel.findById(id);
  done(null, usuario);
});

passport.use(
  "current",
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: 'secretJWT'
    },
    async (payload, done ) => {
        return done(null, payload);
    }
  )
)
