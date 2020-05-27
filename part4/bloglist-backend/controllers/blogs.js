const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs.map(blog => blog.toJSON()))

    // Blog.find({}).then(persons => {
    //     res.json(persons)
    // })
})

blogsRouter.post('/', async (req, res) => {
    if (!req.body.title || !req.body.url) {
        return res.status(400).json({
            error: 'content missing'
        })
    }
    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes === undefined ? 0 : req.body.likes
    })

    const savedBlog = await blog.save()
    res.json(savedBlog.toJSON())

    // blog.save().then(savedBlog => {
    //     res.json(savedBlog)
    // })
})

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
        res.json(blog.toJSON())
    } else {
        res.status(404).end()
    }

    // Blog.findById(req.params.id)
    //     .then(blog => {
    //         if (blog) {
    //             res.json(blog)
    //         } else {
    //             res.status(404).end()
    //         }
    //     })
    //     .catch(error => next(error))
})

blogsRouter.put('/:id', (req, res, next) => {
    const blog = {
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes
    }

    Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        .then(updatedBlog => {
            res.json(updatedBlog)
        })
        .catch(error => next(error))
})

blogsRouter.delete('/:id', async (req, res) => {

    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()

    // Blog.findByIdAndRemove(req.params.id)
    //     .then(result => {
    //         res.status(204).end()
    //     })
    //     .catch(error => next(error))
})

module.exports = blogsRouter