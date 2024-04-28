import { Request, Response } from "express";
import { prisma } from "../prisma";
import config from "../config/config";

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
router.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, email, password, phone, fname, lname, city, address } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const login_status = 0;
        const user = await prisma.users.create({
            data: {
                user_name: username,
                user_password: hashedPassword,
                user_phone: phone,
                user_fname: fname,
                user_lname: lname,
                user_city: parseInt(city),
                user_login_status: login_status,
                user_email: email,
                user_adress: address
            }
        })

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error instanceof Error) res.status(500).json({ error: error.message });
    }
});

// User login
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.users.findUnique({
            where: {
                user_email: email
            }
        });

        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        const passwordMatch = await bcrypt.compare(password, user.user_password);
        
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        
        const token = jwt.sign({ userId: user.user_id }, config.jwt.secret, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Login failed' });
    }
});

router.get('/logout', async (req: Request, res: Response) => {
    res.clearCookie('jwt');
    res.redirect('/');
})

module.exports = router;