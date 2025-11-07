import http from 'http';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Home Page");
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("About Page");
  } else if (req.url === "/time") {
    //res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Current Server Time: ${new Date().toLocaleString()}`);
  }  else if (req.url === "/file") {
    const filePath = path.join(__dirname, "sample.txt");
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File Not Found");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(data);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));
