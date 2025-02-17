import express, { Response } from 'express';
import {UserRequest} from "./types";
const readRouter = express.Router();

readRouter.get('/usernames', (req: UserRequest, res: Response) => {
    let usernames = req.users?.map((user) => {
        return { id: user.id, username: user.username };
    });
    res.send(usernames);
});

readRouter.get('/username/:name', (req: UserRequest, res: Response) => {
    let username = req.params.name;
    let user = req.users?.filter(user => user.username === username);
    return res.send(user);
});

export default readRouter;