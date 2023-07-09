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
        const result = WSHandler(body, user, ws);
        console.log('output: %s', result);

        if (result) {
            for (let i = 0; i < result.length; i += 1) {
                if (result[i].cast) wss.broadcast(JSON.stringify(result[i].data));
                else ws.send(JSON.stringify(result[i]));
            }
        }
        if (result && result[0].type === 'reg') user = JSON.parse(result[0].data);
    });

    ws.on('close', console.log(`${user.name} left`));
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
