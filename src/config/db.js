const env = process.env.NODE_ENV;

let MYSQL_CONF;

if(env === 'development'){
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'fdrsklsh1996',
        port: '3306',
        database: 'myblog'
    }
}

module.exports = {
    MYSQL_CONF
}