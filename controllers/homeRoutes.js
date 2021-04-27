const router = require('express').Router();
const { User, Post, Comment } = require('../models')
// const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
        const postData = await Post.findAll({
            include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['text']
            }
            ]
        })

        const posts = postData.map((project) => project.get({plain: true}))

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        })
    
})

router.get('/posts:id', (req, res) => {
    // const postData = await Post.findByPk(req.params.id, {
    //     include: [
    //         {
    //             model: User, 
    //             attributes: ['username']
    //         },
    //         {
    //             model: Comment,
    //             attributes: ['text']
    //         }
    // ]
    // })

    // const posts = postData.get({plain: true})

    // res.render('post', {
    //     posts,
    //     logged_in: req.session.logged_in
    // })
    res.render('post')
})

router.get('/login', (req, res) => {
    res.render('login')
})

module.exports = router