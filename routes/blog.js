const express = require('express')
const router = express.Router()
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
} = require('../controller/blog')
const loginCheck = require('../middleware/loginCheck.js')
const {SuccessModel, ErrorModel} = require('../model/resModel.js')

router.get('/list', function (req, res, next) {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

    if (req.query.isadmin) {
        console.log(req.session.username)
        if (req.session.username === null) {
            res.json(
                new ErrorModel('未登录')
            )
            return
        }
        author = req.session.username
    }

    const result = getList(author, keyword)
    return result.then(listData => {
        res.json(
            new SuccessModel(listData)
        )
    })
})

router.get('/detail', (req, res, next) => {
    const result = getDetail(req.query.id)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});

router.post('/new', loginCheck, (req, res, next) => {
    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});

router.post('/update', loginCheck, (req, res, next) => {
    const result = updateBlog(req.query.id, req.body)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('更新博客失败')
            )
        }
    })
});

router.post('/del', loginCheck, (req, res, next) => {
    const author = req.session.username
    const result = deleteBlog(req.query.id, author)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('删除博客失败')
            )
        }
    })
});

module.exports = router