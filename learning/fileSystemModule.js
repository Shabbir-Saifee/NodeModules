var fs = require('fs');
exports.Read = function(fileName, callback){
	fs.readFile(fileName, callback);
}
exports.Append = function(fileName, data, callback){
	fs.appendFile(fileName,data, callback);
}
exports.WriteFile = function(fileName, data, callback){
	fs.writeFile(fileName,data, callback);
}
exports.Write = function(fileName, data, flag, callback){
	if(flag ==='a')
	{
		this.Append(fileName,data, callback);
	}
	else if (flag === 'w')
	{
		this.WriteFile(fileName,data, callback);
	}
	
}