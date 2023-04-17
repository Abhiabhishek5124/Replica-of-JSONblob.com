const http=require('http');
const server=http.createServer().listen(8080);

const process=require('./lib/process.js');

const GET =require('./lib/get.js');
const POST=require('./lib/post.js');
const PUT=require('./lib/put.js');
const DELETE=require('./lib/Delete.js');

server.on('request',async(req,res)=>{
console.log(req.method);
switch (req.method){
	case 'GET':
		GET(req,res)
		break;
	case 'POST':
		POST(req,res)
		break;
	case 'PUT':
		PUT(req,res)
		break;
	case 'DELETE' :
		DELETE(req,res)
		break;
	default:
		res.statusCode = 405;
		res.end("Invalid Method");

}});








// && req.url === '/api/post'