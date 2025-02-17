import  { promises as fsPromises } from 'fs';
import path from 'path';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import {User, UserRequest} from "./types";
import readRouter from "./readUsers";
import writeRouter from "./writeUsers";

// the server application object created by the express server
const app: Express = express();
const port: number = 8000;

// path to test user data
const dataFile = '../data/users.json';

let users: User[];

// a synchronous function that reads the user data from the file
async function readUsersFile() {
  try {
    console.log('reading file ... ');
    const data = await fsPromises.readFile(path.resolve(__dirname, dataFile));
    users = JSON.parse(data.toString());
    console.log('File read successfully');
  } catch (err) {
    console.error('Error reading file:', err);
    throw err;
  }
}

readUsersFile();

// a middleware function that adds the users data to the request object
const addMsgToRequest = (req: UserRequest, res: Response, next: NextFunction) => {
  if (users) {
    req.users = users;
    next();
  } else {
    return res.json({
      error: { message: 'users not found', status: 404 }
    });
  }
};

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(addMsgToRequest);
app.use('/read', readRouter);
app.use('/write', writeRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});