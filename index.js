import { httpServer } from "./src/http_server/index.js";
import { WebSocketServer } from "ws";
import { WSHandler } from "./src/ws_server/handlers/handler.js";

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
    let user;

    ws.on('error', console.error);

    ws.on('message', function message(data) {
        console.log('received: %s', data);
        const body = JSON.parse(data.toString());
        const result = WSHandler(body, user);
        console.log('output: %s', result);
        if (result && result.cast) wss.broadcast(JSON.stringify(result.data));
        else if (result instanceof Array) result.forEach((res) => ws.send(JSON.stringify(res)));
        else ws.send(JSON.stringify(result));
        if (result && result instanceof Array && result[0].type === 'reg') user = JSON.parse(result[0].data);
    });
});

wss.broadcast = function broadcast(msg) {
    console.log(msg);
    wss.clients.forEach(function each(client) {
        client.send(msg);
    });
};

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
