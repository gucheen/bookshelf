var fs = require('fs');

exports.index = function (req, res) {
    var page_num = parseInt(req.params['page']);
    if (req.params['page'] && page_num > 0 || !req.params['page']) {
        fs.readFile('books/books.json', 'utf-8', function (err, data) {
            if (err || JSON.parse(data).length == 0) {
                console.log(err);
                res.render('index', {
                    title: 'Admin Panel',
                    description: 'This is admin panel of the bookshelf.',
                    list: null
                });
            } else {
                var resource = JSON.parse(data);
                var total_pages = (resource.length / 10 | 0) + 1;
                if (page_num) {
                    var tem_num = (page_num - 1) * 10;
                    var page_res = resource.slice(tem_num, tem_num + 10);
                    res.render('index', {
                        title: 'Admin Panel',
                        description: 'This is admin panel of the bookshelf.',
                        list: page_res,
                        pageNumber: page_num,
                        pages: total_pages
                    });
                } else {
                    var page_res = resource.slice(0, 10);
                    res.render('index', {
                        title: 'Admin Panel',
                        description: 'This is admin panel of the bookshelf.',
                        list: page_res,
                        pageNumber: 1,
                        pages: total_pages
                    });
                };
            };
        });
    } else {
        res.render('error', {
            title: 'Invalid parameters',
            errorDetail: 'This parameter is unsupported now.'
        })
    };
};

exports.add = function (req, res) {
    res.render('add', {
        title: 'Adding A New Book',
        description: 'Add a book'
    });
};

exports.doAdd = function (req, res) {
    var newBook = JSON.stringify(req.body.book);
    console.log(req.body.book);
    var newID = req.body.book.id;
    fs.open('books/detail/' + newID + '.json', 'w', 0644, function (err, fd) {
        if (err) throw err;
        fs.write(fd, newBook, 0, 'utf8', function (err) {
            if (err) throw err;
            fs.closeSync(fd);
        })
    });
    fs.exists('books/books.json', function (exists) {
        if (exists) {
            fs.readFile('books/books.json', function (err, data) {
                var resource = JSON.parse(data);
                resource.push(req.body.book);
                var newRes = JSON.stringify(resource);
                fs.writeFile('books/books.json', newRes, function (err) {
                    if (err) throw err;
                })
            })
        } else {
            var resource = [];
            resource.push(req.body.book);
            var newRes = JSON.stringify(resource);
            fs.open('books/books.json', 'w', 0644, function (err, fd) {
                console.log(fd);
                if (err) throw err;
                fs.writeFile('books/books.json', newRes, function (err) {
                    if (err) throw err;
                    fs.closeSync(fd);
                })
            })
        }
    });
    res.redirect('/');
};

exports.edit = function (req, res) {
    fs.readFile('books/detail/' + req.params['book'] + '.json', 'utf-8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var resource = JSON.parse(data);
            res.render('edit', {
                title: 'Admin Panel',
                description: 'Edit book"s information',
                list: resource
            });
        }
    });
};

exports.doEdit = function (req, res) {
    var newData = JSON.stringify(req.body.book);
    fs.writeFile('books/detail/' + req.params['book'] + '.json', newData, function (err) {
        if (err) throw err;
    });
    fs.readFile('books/books.json', 'utf-8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var resource = JSON.parse(data);
            var editID = req.params['book'];
            var i;
            for (i = 0; i < resource.length; i++) {
                if (resource[i]['id'] === editID) {
                    resource[i] = req.body.book;
                }
            }
            var newRes = JSON.stringify(resource);
            fs.writeFile('books/books.json', newRes, function (err) {
                if (err) throw err;
            })
        }
    });
    res.redirect('back');
};

exports.del = function (req, res) {
    fs.unlink('books/detail/' + req.params['book'] + '.json');
    fs.readFile('books/books.json', 'utf-8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var resource = JSON.parse(data);
            var delID = req.params['book'];
            var i;
            for (i = 0; i < resource.length; i++) {
                if (resource[i]['id'] === delID) {
                    resource.splice(i, 1);
                }
            }
            var newRes = JSON.stringify(resource);
            fs.writeFile('books/books.json', newRes, function (err) {
                if (err) throw err;
            })
        }
    });
    res.redirect('/');
};

exports.pic = function (req, res) {
    res.render('pic', {
        title: 'Picture Manager',
        description: 'Manage all your pics here'
    });
};

exports.addPic = function (req, res) {
    console.log(req.body.imgs);
    res.send('Succss');
}