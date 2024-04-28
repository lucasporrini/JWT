import { Request, Response } from "express";
import { prisma } from "../prisma";

const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

router.use(authenticateToken);

// Protected route
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await prisma.users.findMany();
        res.render('list-profile.ejs', { users: users });
    } catch(e) {
        console.log(e);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/user/:id', async (req: Request, res: Response) => {
    // return a page with a form to register a user
    const id = req.params.id;

    const user = await prisma.users.findUnique({
        where: {
            user_id: parseInt(id)
        }
    });
    
    res.render('user-details.ejs', { user });
})

router.get('/edit/:id', async (req: Request, res: Response) => {
    // return a page with a form to register a user
    const id = req.params.id;

    const user = await prisma.users.findUnique({
        where: {
            user_id: parseInt(id)
        }
    });
    
    res.render('edit-profile.ejs', { user });
})

router.post('/edit-profile', async (req: Request, res: Response) => {
    const { user_id, username, email, phone, fname, lname, city, address } = req.body;
    const user = await prisma.users.update({
        where: {
            user_id: parseInt(user_id)
        },
        data: {
            user_name: username,
            user_phone: phone,
            user_fname: fname,
            user_lname: lname,
            user_city: parseInt(city),
            user_email: email,
            user_adress: address
        }
    });

    res.redirect('/protected');
})

module.exports = router;