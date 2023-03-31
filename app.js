const http=require('http');
const server=http.createServer().listen(8080);

const process=require('./lib/process.js');

server.on('request',async(req,res)=>{

switch (req.method){
	case 'GET':
		get(req,res)
		break;
	case 'POST':
		post(req,res)
		break;
	case 'PUT':
		put(req,res)
		break;
	case 'DELETE' :
		del(req,res)
		break;
	default:



}});








// && req.url === '/api/post'