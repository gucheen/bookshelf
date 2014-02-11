var fs = require('fs');

exports.index = function(req, res){
  fs.readFile('books/books.json','utf-8',function(err,data){
  	if(err){
  		console.log(err);
  	}else{
      var resource = JSON.parse(data);
      res.render('index', { title: 'Admin Panel', description: 'This is admin panel of the bookshelf.', list: resource});
    }
  });
};

exports.add = function(req,res){
    res.render('add', {title: 'Admin Panel'});
};

exports.edit = function(req,res){
    fs.readFile('books/detail/'+ req.params['book'] +'.json','utf-8',function(err,data){
        if(err){
            console.log(err);
        }else{
            var resource = JSON.parse(data);
            res.render('edit',{title:'Admin Panel', description:'Edit Book"s Information', list: resource});
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
            resource[req.params['book']] = req.body.book;
            var newRes = JSON.stringify(resource);
            fs.writeFile('books/books.json', newRes,function(err){
                if (err) throw err;
            })
        }
    });
    res.redirect('back');
};

exports.del = function(req,res){

}