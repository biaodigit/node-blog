const {getList, getDetail} = require('../controller/blog');
const {SuccessModel,ErrorModel} = require('../model/resModel');

const handleBlogRouter = (req, res) => {
    const method = req.method;

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const listData = getList(author, keyword);
        return new SuccessModel(listData)
    }
    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id || -1;
        const detailData = getDetail(id);
        return new SuccessModel(detailData)
    }
    // 新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        return {
            msg: '这是新建博客接口'
        }
    }
    // 更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        return {
            msg: '这是更新博客接口'
        }
    }
    // 删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        return {
            msg: '这是删除博客接口'
        }
    }
};

module.exports = handleBlogRouter;