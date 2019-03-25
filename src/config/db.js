const env = process.env.NODE_ENV;

let MYSQL_CONF;

if(env === 'dev'){
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '******',
        port: '3306',
        database: 'myblog'
    }
}

module.exports = {
    MYSQL_CONF
}