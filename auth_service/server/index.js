import proto from './protoloader/index.js';
import grpc from '@grpc/grpc-js';
import connection from './databases/connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';




const register = (call, callback) => {
    const now = new Date();
    const createdAt = new Date(now.getTime() + (7 * 60 * 60 * 1000)).toISOString().slice(0, 19).replace('T', ' ');
    const updatedAt = new Date(now.getTime() + (7 * 60 * 60 * 1000)).toISOString().slice(0, 19).replace('T', ' ');
    const { username, name, email, password } = call.request;

    connection.query(
        'INSERT INTO users (username, name, email, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
        [username, name, email, bcrypt.hashSync(password, 10), createdAt, updatedAt],
        (error, results) => {
            if(error){
                callback(error); 
            } else {
                const createdUser = {username, name, email};
                callback(null, JSON.stringify(createdUser));
            }
        }
    )

}

const login = (call, callback) => {
    const { username, password } = call.request;
    
    connection.query(`SELECT * FROM users WHERE username = '${username}'`,
    (e, res) => {
        if(e){
            callback(e, null);
        } else {
            if(res.length > 0){
                const data = res[0];
                const isMatch = bcrypt.compareSync(password, data.password);
                if(isMatch){
                    const payload = {
                        id: data.id,
                        username: username,
                        name: data.name,
                        email: data.email
                      };
                    const token = jwt.sign(payload, 'secret_key', { expiresIn: '24h' });
                    callback(token, null);
                } else {
                    console.log(`not matched`);
                }
            } else {
                console.log(`data not found`);
            }
        }
    }
    ) 
}

proto.Server.addService(proto.auth.service, {
    Register: register,
    Login: login
});


proto.Server.bindAsync(`0.0.0.0:${proto.PORT}`, grpc.ServerCredentials.createInsecure(),
(e, port) => {
    if(e){
        console.log(e)
        
    }
    console.log(`Server running at http://localhost:${proto.PORT}`);
    
}
);