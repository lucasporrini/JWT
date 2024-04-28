import { Request, Response } from "express";
import { prisma } from "../prisma";

const express = require('express');
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    // return a page with a form to register a user
    res.render('index.ejs');
})

router.get('/login', async (req: Request, res: Response) => {
    // return a page with a form to register a user
    res.render('login.ejs');
})

router.get('/register', async (req: Request, res: Response) => {
    // return a page with a form to register a user
    res.render('register.ejs');
})

module.exports = router;