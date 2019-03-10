const handleUserRouter = (req,res) => {
    const method = req.method;

    // 用户登陆
    if (method === 'POST' && req.path === '/api/user/login') {
        return {
            msg: '这是登陆接口'
        }
    }
};

module.exports = handleUserRouter;