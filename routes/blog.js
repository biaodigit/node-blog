const express = require('express')
const router = express.Router()
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const loginCheck = require('../middleware/loginCheck.js')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.get('/list',function (req,res,next) {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

    if(req.query.isadmin){

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

module.exports = router