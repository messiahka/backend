import dotenv from 'dotenv';

dotenv.config();

const objConfig = {
    port: process.env.PORT,
    uri: process.env.URI,
    jwtSecret: process.env.JWT_SECRET,
    
}

export default objConfig;