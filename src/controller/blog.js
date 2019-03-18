const getList = (author, keyword) => {
    return [
        {
            id: 1,
            title: 'A',
            content: 'aaaaa',
            createTime: 15400000,
            author: 'zhangsan'
        },
        {
            id: 2,
            title: 'B',
            content: 'bbbb',
            createTime: 15401111,
            author: 'lisi'
        }
    ]
};

const getDetail = (id) => {
    return {
        id: 1,
        title: 'A',
        content: 'aaaaa',
        createTime: 15400000,
        author: 'zhangsan'
    }
};

module.exports = {
    getList,
    getDetail
};