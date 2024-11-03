const WebSocket = require('ws');
const http = require('http');
const crypto = require('crypto');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  const uuid = crypto.randomUUID();
  ws.send(JSON.stringify({ uuid }));
  ws.on('message', (data) => {
    const json = JSON.parse(data);
    console.log(json);
    if (!json.message) return;
    wss.clients.forEach((client) => {
      json.mine = ws === client;
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(json));
      }
    });
  });
});

server.listen(3000, () => {
  console.log('WebSocket Server is running on port 3000');
});