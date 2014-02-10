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
            res.render('edit',{title:'Admin Panel', list: resource});
        }
    });

};

exports.del = function(req,res){

}