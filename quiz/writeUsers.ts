import express, { Response } from 'express';
import  { promises as fsPromises } from 'fs';
import path from 'path';
import {User, UserRequest} from "./types";

const writeRouter = express.Router();

// a middleware function that parses the request body to json
writeRouter.use(express.json());
writeRouter.use(express.urlencoded({ extended: true }));

// a route that receives a user object and saves it to the user data file
writeRouter.post('/adduser', async (req: UserRequest, res: Response) => {
    try {
        let newuser = req.body as User;
        req.users?.push(newuser);

        await fsPromises.writeFile(
            path.resolve(__dirname, '../data/users.json'),
            JSON.stringify(req.users)
        );

        console.log('User Saved');
        res.send('done');
    } catch (err) {
        console.log('Failed to write:', err);
        res.status(500).send('Error saving user');
    }
});

export default writeRouter;
