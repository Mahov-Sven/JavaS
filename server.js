const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
	let q = url.parse(req.url, true);
	if(q.pathname.endsWith("/")) q = url.parse(`${req.url}index.html`, true);
	if(q.pathname.endsWith("index")) q = url.parse(`${req.url}.html`, true);
	if(!q.pathname.endsWith(".html")) return err403(res);
	
	const filename = "." + q.pathname;
	fs.readFile(filename, (err, data) => {
		if(err) return err404(res);
		
		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		res.write(data);
		
		return res.end();
	});
}).listen(8080);

/* Error: User Does not have Permissions to View */
function err403(res){
	res.writeHead(404, {
		"Content-Type": "text/html"
	});
	res.write("Error: 403. You do not have permission to view this file");
	
	return res.end();
}

/* Error: Page Not Found */
function err404(res){
	res.writeHead(404, {
		"Content-Type": "text/html"
	});
	res.write("Error: 404. Page Not Found");
	
	res.end();
}