const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const {get, set} = require('./src/db/redis')
const {access} = require('./src/utils/log')

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({});
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
            return
        }
        let postData = '';

        req.on('data', chunk => {
            postData += chunk.toString()
        });

        req.on('end', () => {
            if (!postData) {
                resolve({});
                return
            }
            resolve(JSON.parse(postData))
        })
    })
};

const serverHandle = (req, res) => {
    // 记录 access log
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)
    // 设置返回格式
    res.setHeader('Content-type', 'application/json')

    // 获取path
    const url = req.url;
    req.path = url.split('?')[0];

    // 解析query
    req.query = querystring.parse(url.split('?')[1])

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) return
        const arr = item.split('=');
        const key = arr[0].trim();
        const val = arr[1].trim();
        req.cookie[key] = val;
    })

    let needSetCookie = false;
    let userId = req.cookie.userid;
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`;
        set(userId, {})
    }

    req.sessionId = userId

    get(req.sessionId).then(sessionData => {
        if (sessionData === null) {
            set(req.sessionId, {})
            req.session = {}
        } else {
            req.session = sessionData
        }
        return getPostData(req)
    }).then(postData => {
        req.body = postData;

        // 处理blog路由
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then((blogData) => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(blogData));
            })
            return
        }
        // 处理user路由
        const userResult = handleUserRouter(req, res);
        if (userResult) {
            userResult.then((userData) => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(userData));
            })
            return
        }
        // 未命中路由,返回404
        res.writeHead(404, {"Content-type": "text/plain"});
        res.write("404 Not Found\n")
        res.end()
    })
};

module.exports = serverHandle;