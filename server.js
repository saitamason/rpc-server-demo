const express = require("express");
const bodyParser = require("body-parser");
const { JSONRPCServer } = require("json-rpc-2.0");

const server = new JSONRPCServer();

// Define a method that takes two numbers and returns their sum
server.addMethod("add", ({ a, b }) => a + b);

const app = express();
app.use(bodyParser.json());

// Handle JSON-RPC requests at the /rpc endpoint
app.post("/rpc", (req, res) => {
  const jsonRPCRequest = req.body;
  server.receive(jsonRPCRequest).then((jsonRPCResponse) => {
    if (jsonRPCResponse) {
      res.json(jsonRPCResponse);
    } else {
      res.sendStatus(204);
    }
  });
});

app.listen(3000, () => {
  console.log("JSON-RPC server listening on port 3000");
});
