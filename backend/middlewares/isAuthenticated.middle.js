import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookie.token;
        if (!token) {
            return res.status(401).json({
                message: 'AuthMiddle: no token',
                success: false,
            });
        }
        const decode = jwt.verify(token, process.env.JWT_KEY);
        if (!decode) {
            return res.status(401).json({
                message: 'AuthMiddle: invaliid token',
                success: false,
            });
        }
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log('AuthMiddle:', error);
    }
};

export default isAuthenticated;
