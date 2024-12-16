import jwt from "jsonwebtoken";

const createToken = (tokenData) => {
    return jwt.sign(tokenData,process.env.SECRET_KEY,{
        expiresIn: '1d'
    });
}

export {
    createToken
}