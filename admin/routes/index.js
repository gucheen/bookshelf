var fs = require('fs');

exports.index = function(req, res){
    fs.readFile('books/books.json','utf-8',function(err,data){
        if(err){
            console.log(err);
            res.render('index', { title: 'Admin Panel', description: 'This is admin panel of the bookshelf.', list: null});
        }else{
            var resource = JSON.parse(data);
            res.render('index', { title: 'Admin Panel', description: 'This is admin panel of the bookshelf.', list: resource});
        }
    });
};

exports.add = function(req,res){
    res.render('add', {title: 'Admin Panel', description: 'Add a book'});
};

exports.doAdd = function(req,res){
    var newBook = JSON.stringify(req.body.book);
    var newID = req.body.book.id;
    fs.open('books/detail/'+ newID +'.json','w',0644,function(err,fd){
        if(err) throw err;
        fs.write(fd, newBook,0,'utf8',function(err){
            if(err) throw err;
            fs.closeSync(fd);
        })
    });
    fs.exists('books/books.json', function(exists){
        if(exists){
            fs.readFile('books/books.json', function(err,data){
                var resource = JSON.parse(data);
                resource[newID] = req.body.book;
                var newRes = JSON.stringify(resource);
                fs.writeFile('books/books.json', newRes,function(err){
                    if (err) throw err;
                })
            })
        }else{
            var resource = {};
            resource[newID] = req.body.book;
            var newRes = JSON.stringify(resource);
            fs.open('books/books.json','w',0644,function(err,fd){
                console.log(fd);
                if (err) throw err;
                fs.writeFile('books/books.json', newRes, function(err){
                    if (err) throw err;
                    fs.closeSync(fd);
                })
            })
        }
    });
    res.redirect('/');
};

exports.edit = function(req,res){
    fs.readFile('books/detail/'+ req.params['book'] +'.json','utf-8',function(err,data){
        if(err){
            console.log(err);
        }else{
            var resource = JSON.parse(data);
            res.render('edit',{title:'Admin Panel', description:'Edit book"s information', list: resource});
        }
    });
};

exports.doEdit = function(req,res){
    var newData = JSON.stringify(req.body.book);
    fs.writeFile('books/detail/'+ req.params['book'] +'.json', newData, function (err) {
        if (err) throw err;
    });
    fs.readFile('books/books.json','utf-8',function(err,data){
        if(err){
            console.log(err);
        }else{
            var resource = JSON.parse(data);
            for(item in resource){
                if(resource[item]['id'] === req.params['book']){
                    resource[item] = req.body.book;
                }
            }
            var newRes = JSON.stringify(resource);
            fs.writeFile('books/books.json', newRes,function(err){
                if (err) throw err;
            })
        }
    });
    res.redirect('back');
};

exports.del = function(req,res){
    fs.unlink('books/detail/'+ req.params['book'] +'.json');
    fs.readFile('books/books.json','utf-8',function(err,data){
        if(err){
            console.log(err);
        }else{
            var resource = JSON.parse(data);
            var delID = req.params['book'];
            delete resource[delID];
            var newRes = JSON.stringify(resource);
            fs.writeFile('books/books.json', newRes,function(err){
                if (err) throw err;
            })
        }
    });
    res.redirect('/');
};
