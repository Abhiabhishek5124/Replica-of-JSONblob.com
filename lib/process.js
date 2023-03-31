const fs=require('fs');
const url=require('url');

function process(req,res){
	//Obtain request method
	console.log(req.method);
	
	//Parse the components of the URL
	let url_components=url.parse(req.url,true);
	console.log(url_components);
	console.log(url_components.pathname.split('/'));
	
	//Obtain the current timestamp (why do we need this?)
	const currentDate=new Date();
	const timestamp=currentDate.getTime();
	console.log(timestamp);
	
	
	//Write something in the header of the response
	res.writeHead(200,{'Content-Type':'application/json'});
	res.writeHead(200,{'Current-timestamp':timestamp});
	
	//Write something in the body of the response
	res.write('x');
	
	//Process the body of the request
	var body=[];
	req.on('data',(chunk)=>{
		body.push(chunk);
	}).on('end',()=>{
		body=Buffer.concat(body).toString();
		res.end(body);
	});
	
	// Check if a file exists
	let myfile='file.json';
	console.log(fs.existsSync(`./data/${myfile}`));
	
	
	// Write to a file
	let my_other_file=`${timestamp}.json`;
	fs.writeFileSync(`./data/${my_other_file}`,timestamp+'');
	
	
	// Read data from a file
	console.log(fs.readFileSync(`./data/${my_other_file}`,'utf8'));
	
	//Encode a javascript data type into JSON
	const javascript_object={
		artist:'Rednex',
		title:'Cotton Eye Joe',
		url_video:'https://youtu.be/HAlspX_kjL4'
	};
	let json_string=JSON.stringify(javascript_object);
	console.log(json_string);
	
	//Convert a JSON string into javascript
	let javascript_object_again=JSON.parse(json_string);
	console.log(javascript_object_again);
}

module.exports=process