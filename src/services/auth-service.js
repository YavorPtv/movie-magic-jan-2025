import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = 'da32##1d!r2gDAaWDwaMIHuEUaebxBD1h3e0MWQOg0qhfaM6ZiB9UUdwWaKKkJrpJjnIpv2'

export default {
    register(userData){
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