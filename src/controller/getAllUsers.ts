import { IncomingMessage, ServerResponse } from "http";

const STATUS_CODE_OK: number = 200;

export const getAllUsers = async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    const users: string[] = []; // await, from DB

    response.writeHead(
        STATUS_CODE_OK, 
        {
            'Content-Type': 'application/json'
        }
    );
    response.end(JSON.stringify(users));
};
