const router = require('express').Router()
const { Post } = require('../../models')
const withAuth = require('../../utils/auth')

// here we make new posts
router.post('/', withAuth, async (req, res) => {
    const x = req.body
    try {
        const newPost = await Post.create({
            ...x, //the spread operator which opens up req.body and lets us push something in there
            user_id: req.session.user_id 
        })

        res.status(200).json(newPost) //if it works, then we set our new post into json format which will allow us to access it on the front end
    } catch (err) {
        res.status(400).json(err)
    }
})

router.put('/:id', withAuth, async (req, res) => {
    try {
        const [row] = Post.update({ where: {id: req.params.id}})
    } catch (err) {
        res.status(400).json(err)
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const [row] = await Post.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router