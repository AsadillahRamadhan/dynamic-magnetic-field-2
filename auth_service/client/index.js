import express from 'express';
import bodyParser from 'body-parser';
import client from './protoloader/index.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/api/register', (req, res) => {
    const body = req.body;
    const user = { name: body.name, username: body.username, email: body.email, password: body.password };
    client.Register(user, (error, response) => {
    if(error){
        res.status(500).json({"error": error});
    } else {
        res.status(201).json(`User Created`);
    }
});
});

app.post('/api/login',(req, res) => {
    const body = req.body;
    const user = { username: body.username, password: body.password };
    client.Login(user, (error, response) => {
    if(error){
        res.status(500).json({"errors": error});
    } else {
        res.status(201).json({"token": response});
    }
});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

