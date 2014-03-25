var fs = require('fs');

function year_sort(a, b) {
    if (a.year > b.year)
        return 1;
    if (a.year < b.year)
        return -1;
    return 0;
}

exports.authorize = function(req, res, next) {
    if (!req.session.view) {
        res.redirect('/login');
    } else {
        next();
    }
}

exports.index = function(req, res) {
    var page_num = parseInt(req.params['page']);
    if (req.params['page'] && page_num > 0 || !req.params['page']) {
        fs.readFile('books/books.json', 'utf-8', function(err, data) {
            if (err || JSON.parse(data).length === 0) {
                console.log(err);
                res.render('index', {
                    title: 'Admin Panel',
                    description: 'This is admin panel of the bookshelf.',
                    list: null
                });
            } else {
                var resource = JSON.parse(data);
                if (req.param('sort') === 'year') {
                    resource.sort(year_sort);
                }
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

exports.login = function(req, res) {
    if (req.session.view) {
        res.redirect('/');
    } else {
        res.render('login', {
            title: 'Login Page'
        });
    }
};

exports.doLogin = function(req, res) {
    req.session.view = 'user_login';
    res.redirect('/');
}

exports.add = function(req, res) {
    res.render('add', {
        title: 'Adding A New Book',
        description: 'Add a book'
    });
};

exports.doAdd = function(req, res) {
    var newBook = JSON.stringify(req.body.book, null, '\t');
    var newID = req.body.book.id;
    fs.exists('books/detail/' + newID + '.json', function(exist) {
        if (!exist) {
            fs.exists('books/books.json', function(exists) {
                if (exists) {
                    fs.readFile('books/books.json', function(err, data) {
                        var resource = JSON.parse(data);
                        resource.push(req.body.book);
                        var newRes = JSON.stringify(resource, null, '\t');
                        fs.writeFile('books/books.json', newRes, function(err) {
                            if (err) throw err;
                        })
                    })
                } else {
                    var resource = [];
                    resource.push(req.body.book);
                    var newRes = JSON.stringify(resource, null, '\t');
                    fs.open('books/books.json', 'w', 0644, function(err, fd) {
                        console.log(fd);
                        if (err) throw err;
                        fs.writeFile('books/books.json', newRes, function(err) {
                            if (err) throw err;
                            fs.closeSync(fd);
                        })
                    })
                }
                fs.open('books/detail/' + newID + '.json', 'w', 0644, function(err, fd) {
                    if (err) throw err;
                    fs.write(fd, newBook, 0, 'utf8', function(err) {
                        if (err) throw err;
                        fs.closeSync(fd);
                    })
                });
            });
        } else {
            console.log('Already exists');
        }
    })
    res.redirect('/add');
};

exports.edit = function(req, res) {
    fs.readFile('books/detail/' + req.params['book'] + '.json', 'utf-8', function(err, data) {
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

exports.doEdit = function(req, res) {
    var newData = JSON.stringify(req.body.book, null, '\t');
    fs.writeFile('books/detail/' + req.params['book'] + '.json', newData, function(err) {
        if (err) throw err;
    });
    fs.readFile('books/books.json', 'utf-8', function(err, data) {
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
            var newRes = JSON.stringify(resource, null, '\t');
            fs.writeFile('books/books.json', newRes, function(err) {
                if (err) throw err;
            })
        }
    });
    res.redirect('back');
};

exports.del = function(req, res) {
    fs.unlink('books/detail/' + req.params['book'] + '.json');
    fs.readFile('books/books.json', 'utf-8', function(err, data) {
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
            var newRes = JSON.stringify(resource, null, '\t');
            fs.writeFile('books/books.json', newRes, function(err) {
                if (err) throw err;
            })
        }
    });
    res.redirect('/');
};

exports.pic = function(req, res) {
    fs.readdir('public/uploads', function(err, files) {
        if (err) throw err;
        files.shift();
        res.render('pic', {
            title: 'Picture Manager',
            description: 'Manage all your pics here',
            picList: files
        });
    })
};

exports.addPic = function(req, res) {
    fs.readFile(req.files.file0.path, function(err, data) {
        if (err) throw err;
        var newPath = 'public/uploads/' + req.files.file0.originalFilename;
        fs.writeFile(newPath, data, function(err) {
            if (err) throw err;
            fs.unlink(req.files.file0.path, function(err) {
                if (err) throw err;
            })
            res.send({
                status: 200,
                filePath: req.files.file0.originalFilename
            });
        });
    });
}
