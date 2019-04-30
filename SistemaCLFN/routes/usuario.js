const express = require('express')
const router = express()
const mongoose = require('mongoose')
//const bcrypt = require('bcryptjs')
const passport = require('passport')

router.get('/login', (req, res)=>{
    res.render('usuario/login')
})

router.post('/login', (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/usuario/login',
        failureFlash: true
    })(req, res, next)
})

router.get('/logout', (req, res)=>{
    req.logout()
    req.flash('success_msg', 'Você foi deslogado com sucesso!')
    res.redirect('/')
})

module.exports = router