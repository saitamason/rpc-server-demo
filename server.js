const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 3000 });

const methods = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};

server.on("connection", (client) => {
  client.on("message", (message) => {
    const [methodName, callId, ...params] = JSON.parse(message);
    if (methods[methodName]) {
      const result = methods[methodName](...params);
      client.send(JSON.stringify([callId, result]));
    } else {
      client.send(JSON.stringify([callId, null])); // Method not found
    }
  });
});
