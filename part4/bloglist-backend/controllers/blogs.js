const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
    Blog.find({}).then(persons => {
        res.json(persons)
    })
})

blogsRouter.post('/', (req, res) => {
    if (!req.body.title || !req.body.author || !req.body.url) {
        return res.status(400).json({
            error: 'content missing'
        })
    }
    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes
    })

    blog.save().then(savedBlog => {
        res.json(savedBlog)
    })
})

blogsRouter.get('/:id', (req, res, next) => {
    Blog.findById(req.params.id)
        .then(blog => {
            if (blog) {
                res.json(blog)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
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

blogsRouter.delete('/:id', (req, res, next) => {
    Blog.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

module.exports = blogsRouter