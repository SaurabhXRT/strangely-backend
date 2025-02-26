import logger from "../../logger/logger.js";
import { User } from "../../models/User/User.js";
import jwt from "jsonwebtoken";


export const AuthController = async (req: any, res: any) => {
    try {
        const { username } = req.body;

        let user = await User.findOne({ where: { username } });

        if (!user) {
            user = await User.create({ username });
        }
        
        const token = jwt.sign(
            { user_id: user.id, username: user.username }, 
            process.env.JWT_SECRET as string, 
            { expiresIn: "30d" } 
        );
        const newuser =  user.toJSON();
        return res.status(200).json({
            message: "User authenticated successfully",
            token,
            user: { id: newuser.id, username: newuser.username },
        });

    } catch (error) {
        logger.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};



export const checkUsernameAvailability = async (req: any, res: any) => {
    try {
        const { username } = req.body;

        const existingUser = await User.findOne({ 
            where: { username } 
        });

        if (existingUser) {
            return res.status(200).json({ 
                available: false 
            });
        }

        return res.status(200).json({ 
            available: true 
        });
    } catch (error) {
        return res.status(500).json({ 
            message: "Internal server error" 
        });
    }
};

