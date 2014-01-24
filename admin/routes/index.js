var fs = require('fs');

exports.index = function(req, res){
  fs.readFile('books/books.json','utf-8',function(err,data){
  	if(err){
  		console.log(err);
  	}else{
      var resource = JSON.parse(data);
      res.render('index', { title: 'Admin Panel', description: 'This is admin panel of the bookshelf.', list: resource });
    }
  });
};

exports.edit = function(req,res){

};