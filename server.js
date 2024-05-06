const http = require("node:http");
const os = require("os");

const PORT_NUMBER = 8080;
const HOST_NAME = "127.0.0.1";
const server = http.createServer((req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
  };

  if (req.method === "GET" && req.url === "/my-cpu-info") {
    const cpuInfo = {
      cpu_info: os.cpus(),
      platform: os.platform(),
      arch: os.arch(),
      speed: os.cpus()[0].speed,
    };

    res.writeHead(200, { ...headers, "Content-Type": "application/json" });
    res.end(JSON.stringify(cpuInfo));
  } else if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, {
      ...headers,
      "Content-Type": "text/plain",
    });
    res.end("Welcome to my server!");
  } else {
    res.writeHead(404, {
      ...headers,
      "Content-Type": "text/plain",
    });
    res.end(
      "You have put a wrong route. Kindly put the right one!. Like /my-cpu-info or /"
    );
  }
});

server.listen(PORT_NUMBER, HOST_NAME, () => {
  console.log(`Server listening on port http://${HOST_NAME}:${PORT_NUMBER}`);
});
