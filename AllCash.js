var http = require("http");
var port = 8080;
var fs = require("fs");
var bunyan = require("bunyan");

var bunyanOpts = { name: "User in site",
        hostname: "(your site name).local",
        pid: 123,
        req: {
        method: "GET",
        url: "/",
        headers: {
        connection: "close"
        },
        remoteAddress: "120.0.0.1",
        remotePort: 8080
        },
        level: 3,
        msg: "start request",
        time: "",
streams: [ 
    { level: "debug", stream: process.stdout  },
     { level: "info", path: "log.log"  } ] }; 
var logger = bunyan.createLogger(bunyanOpts)



function getHome(req, resp, counter)
{
    resp.writeHead(200, { "Content-Type": "text/html "});
    resp.write("<html><head><title>LOLFIREBALL</title></head><body>Site under construction.  </body></html>");
    resp.write("<html><body>You are " + counter + " on account which is hopelessly located here</body></html>");
    resp.end();
}

function get404(req, resp)
{
    resp.writeHead(404, "Opsssss", { "Content-Type": "text/html "});
    resp.write("<html><head><title>404</title></head><body>Ops, try another time</body></html>");
    resp.end();
}

var httpServer = http.createServer(function(req, resp) 
{   
   switch (req.method) 
   {
        case "GET":
            if (req.url === "/")
            {
               var fileContent = fs.readFileSync("counter.txt", "utf8");
               fileContent++;
               fs.writeFileSync("counter.txt", fileContent);
               getHome(req, resp, fileContent);
               // My file log try.
               //fs.appendFileSync("log.log", "user log in our site"+"\n");
               logger.info("Logger work...maybe");
            }
            else
            {
                get404(req, resp);
            }
            break;
        case "POST":
            break;
        default:
            break;
   }
   resp.end();
});
httpServer.listen(port);