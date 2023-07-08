import { httpServer } from "./src/http_server/index.js";
import { WebSocketServer } from "ws";
import { WSHandler } from "./src/ws_server/handlers/handler.js";

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
    let userId;

    ws.on('error', console.error);

    ws.on('message', function message(data) {
        console.log('received: %s', data);
        const body = JSON.parse(data.toString());
        const result = WSHandler(body);
        console.log('output: %s', result);
        if (result.type === 'reg') userId = JSON.parse(result.data).index; 
        if (result) ws.send(JSON.stringify(result));
    });
});

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
