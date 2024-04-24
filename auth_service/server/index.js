import proto from './protoloader/index.js';
import grpc from '@grpc/grpc-js';
import User from '../../models/user.js';
import jwt from 'jsonwebtoken';
import '../../databases/connection.js';
import bcrypt from 'bcrypt';


const register = (call, callback) => {
    const { username, name, email, password } = call.request;
    User.create({
        username: username,
        name: name,
        email: email,
        password: bcrypt.hashSync(password, 10)

    }).then((result) => {
        callback(null, {message: "Register Berhasil, Silakan Melakukan"});
    });
}

const login = async (call, callback) => {
    const { username, password } = call.request;
    const user = await User.findOne({username: username});
    const response = {
        token: ``,
        message: `User Not Found!`
    };
    if(user){
        const isMatch = bcrypt.compareSync(password, user.password);

        if(isMatch){
            const payload = {
                id: user.id,
                username: username,
                name: user.name,
                email: user.email
            };
            const token = jwt.sign(payload, 'secret_key', { expiresIn: '24h' });
            response.token = token;
            response.message = `Login Successfuly!`;
            callback(null, response);
        } else {
            
            callback(null, response);
        }
    } else {
        callback(null, response);
    }
}

// const login = (call, callback) => {
//     const { username, password } = call.request;
    
//     connection.query(`SELECT * FROM users WHERE username = '${username}'`,
//     (e, res) => {
//         if(e){
//             callback(e, null);
//         } else {
//             if(res.length > 0){
//                 const data = res[0];
//                 const isMatch = bcrypt.compareSync(password, data.password);
//                 if(isMatch){
//                     const payload = {
//                         id: data.id,
//                         username: username,
//                         name: data.name,
//                         email: data.email
//                       };
//                     const token = jwt.sign(payload, 'secret_key', { expiresIn: '24h' });
//                     callback(token, null);
//                 } else {
//                     console.log(`not matched`);
//                 }
//             } else {
//                 console.log(`data not found`);
//             }
//         }
//     }
//     ) 
// }

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