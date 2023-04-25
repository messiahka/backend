import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import  {UsersModel} from "../persistencia/mongoDB/models/users.model.js";
import { hashData, comparePassword } from "../utils/bcrypt.utils.js"


// Local Strategy
passport.use(
  "registro",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const usuario = await UsersModel.find({ email });
      if (usuario.length !== 0) {
        return done(null, false);
      }
      const hashNewPassword = await hashData(password);
      const newUser = { ...req.body, password: hashNewPassword };
      const newUserDB = await UsersModel.create(newUser);
      done(null, newUserDB);
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const usuario = await UsersModel.findOne({ email });
      if (!usuario) {
        return done(null, false);
      }
      const passwordMatch = await comparePassword(password, usuario.password);
      if (!passwordMatch) {
        return done(null, false);
      } else {
        return done(null, usuario);
      }
    }
  )
);



// Github Strategy
passport.use('github', new GithubStrategy({
    clientID: 'Iv1.26d3f4ebeff72228',
    clientSecret: '215dc4ee6401383bc7028a3533eaabe26e2e1c85',
    callbackURL: "http://localhost:8080/users/github"
}, async (accessToken, refreshToken, profile, done) => {
  const usuario = await UsersModel.findOne({email:profile._json.email})
  return done(null, usuario)
  
}))

passport.serializeUser((usuario, done) => {
  done(null, usuario._id);
});

passport.deserializeUser(async (id, done) => {
  const usuario = await UsersModel.findById(id);
  done(null, usuario);
});