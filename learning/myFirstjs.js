var http = require('http');
var dt = require('./myfirstmodule');
var url = require('url');
var fsm = require('./fileSystemModule');
var events = require('events');

this.initializeEvents = function(){
	this.eventEmitter = new events.EventEmitter();
	this.eventEmitter.on('click', this.buttonClickHandler);
	this.eventEmitter.on('load',  this.loadHandler);
}

this.loadHandler = function(args){
	fsm.Read(args.route, function(err,content){
		scope.output = content;
	});

}

this.buttonClickHandler = function(args){
	let flag = args.flag ? args.flag : 'a';
	let msg =  "";
	if(flag === 'a')
	{
		msg = "File Updated Successfully";
	}
	else if (flag==='w')
	{
		msg = "File Written Successfully";
	}
	let callback = function(err){
		if(err){
			console.log(err);
		}
	}	
	fsm.Write('textdata.txt',args.data, flag, callback );
	scope.loadHandler(args)
}

this.initializeEvents();
var scope = this;
http.createServer(function(req, res){
	
	this.processRequest = async function(){
		
		res.writeHead(200, {'Content-Type': 'text/html'});
		let urlP = url.parse(req.url, true);
		let q = urlP.query;
		let route = urlP.pathname.split("/").at(1);
		route = route === '/' || route === '' ? 'index.html' : route;
		scope.eventEmitter.emit('load', {route : route});
		if(q.data && q.flag)
		{	
			scope.eventEmitter.emit('click',{flag:q.flag, res: res, data:q.data, route:route});
		}
		await delay(2000)
		if(scope.output){
			const result = scope.output.toString().replace('{datetime}', dt.myDateTime());
			res.write(result);
		}
		res.end();
	}

	this.processRequest();
	
	function delay(ms) {
		return new Promise((resolve) => {
		  setTimeout(resolve, ms);
		});
	  }
	
}).listen(8082);

console.log("server successfully created! ready for your service at http://localhost:8082/");