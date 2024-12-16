import jwt from 'jsonwebtoken';

const isAuthenticated = async (req,res,next) => {
    try {
        const token = req.cookies['token'];
        if(!token) return res.status(404).json({
            status:false,
            msg: "user is not Authenticated"
        });

        const decode = jwt.verify(token,process.env.SECRET_KEY);
        req.id = decode.id;
        next();

    } catch (error) {
        return res.status(501).json({
            status:false,
            msg: "Internal server error"
        })
    }
};

export {
    isAuthenticated
}