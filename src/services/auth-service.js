import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'BASICSECRET';

export default {
    async register(userData){
        // Check if password matches rePassword
        // if (userData.password !== userData.rePassword){
        //     throw new Error('Password missmatch!');
        // }
        
        // Check if user exists
        const userCount = await User.countDocuments({email: userData.email});
        if (userCount > 0){
            throw new Error('Email already exists');
        }

        return User.create(userData);
    },
    async login(email, password){ 
        const user = await User.findOne({email});

        // Check user exists
        if (!user) {
            throw new Error('Invalid email or password!');
        }

        // Check password is correct
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid){
            throw new Error('Invalid email or password!');
        }
        // Generate token
        const payload = {
            id: user.id,
            email: user.email
        }
        // TODO: use async option
        const token = jwt.sign(payload, SECRET, {expiresIn: '2h'});

        return token;
    }
}