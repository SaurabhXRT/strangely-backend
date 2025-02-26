import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export var authMiddleware = function(req, res, next) {
    var _req_header;
    var token = (_req_header = req.header("Authorization")) === null || _req_header === void 0 ? void 0 : _req_header.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            message: "Access denied. No token provided."
        });
    }
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            user_id: decoded.user_id
        };
        next();
    } catch (error) {
        return res.status(403).json({
            message: "Invalid or expired token."
        });
    }
};
