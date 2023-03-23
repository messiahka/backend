import jwt from 'jsonwebtoken'

// este middleware se encarga de verificar si el usuario esta logueado o no, pasado el tiempo que le da el MaxAge vuelve automaticamente
// a login
export function auth(req, res, next) {
    if(req.session.logged){
        next()
    } else {
        res.redirect('/')
    }
}

//este middleware se encarga de verificar que si el usuario esta logueado, no pueda volver a la pagina de login/registro
export function isLogged(req, res, next) {
    if(req.session.logged){
        res.redirect('/views/products')
    } else {
        next()
    }
}

export function isAdmin(req, res, next) {
    if(req.session.admin){
        next()
    } else {
        res.redirect('/views/products')
    }
}


export function jwtValidation(req, res, next) {
  
  const token = req.cookies.token
console.log(token)
    const isValid = jwt.verify(token,'secretJWT')
    if(isValid){
        
        req.user = isValid.user
        console.log('CHAUUU',req.user)
            next()
    } else {
        res.json({message: 'Error autenticacion'})
    }
  
  
//   const token = authorizationHeader.split(' ')[1]
//   console.log(token)
//   const isValid = jwt.verify(token,'secretJWT')
//   if(isValid){
    
//     req.user = isValid.user
//     console.log('CHAUUU',req.user)
//       next()
//   } else {
//     res.json({message: 'Error autenticacion'})
//   }
}