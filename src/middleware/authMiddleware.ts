import { Request, Response, NextFunction } from "express";
import config from "../config/config";

const jwt = require('jsonwebtoken');

const authenticateToken = (req: Request, res: Response, next: Function) => {
    const authHeader = req.headers['cookie'];
    const cookies = authHeader && authHeader.split(' ');
    let token: string = '';
    
    if (Array.isArray(cookies)) {
        cookies.forEach(element => {
            const [name, value] = element.split('=');
            if (name === 'jwt') {
                token = value
            }
        });
    }

    if (!token) return res.redirect('/auth/logout')

    jwt.verify(token, config.jwt.secret, (err: any, decoded: any) => {
        if (err) return res.render('forbidden.ejs')
        req.body.userId = decoded.userId;
        next();
    });
};

module.exports = authenticateToken;