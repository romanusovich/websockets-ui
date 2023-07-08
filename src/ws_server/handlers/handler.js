import { reg } from "./reg.js";

export function WSHandler(data) {
    const body = JSON.parse(data.data);
    switch (data.type) {
        case 'reg':
            data.data = JSON.stringify(reg(body));
            return data;
        case 'create_room':
            
            break;
        default:
            return 'Bad req type';
    }
};