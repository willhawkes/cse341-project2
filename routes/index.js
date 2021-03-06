const routes = require('express').Router();
const express = require('express');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// @desc Login/Landing page
// @route GET /
routes.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  })
})

routes.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    res.render('dashboard', {
      name: req.user.firstName,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc Api-docs
// @route GET /api-docs
routes.get('/api-docs', ensureAuth, async (req, res) => {
  res.render('api-docs', {
    name: req.user.firstName
  })
})

routes.use('/auth', require('./auth'));

routes.use('/', require('./swagger'));

routes.use('/', require('./home'));

routes.use('/bucketlist', require('./bucketlist'));

routes.use(express.json());

module.exports = routes;
