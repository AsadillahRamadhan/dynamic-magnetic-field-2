import proto from '../../protoloader/auth_service.js';
import grpc from '@grpc/grpc-js';
import User from '../../models/user.js';
import jwt from 'jsonwebtoken';
import '../../databases/connection.js';
import bcrypt from 'bcrypt';


const register = async (call, callback) => {
    const { username, name, email, password } = call.request;
    const usernameExists = await User.findOne({username: username}).exec();
    if(usernameExists){
        return callback(null, {message: "Username Telah Digunakan!"});
    }
    const nameExists = await User.findOne({name: name}).exec();
    if(nameExists){
        return callback(null, {message: "Name Telah Digunakan!"});
    }
    const emailExists = await User.findOne({email: email}).exec();
    if(emailExists){
        return callback(null, {message: "Email Telah Digunakan!"});
    }

    User.create({
        username: username,
        name: name,
        email: email,
        password: bcrypt.hashSync(password, 10)

    }).then((result) => {
        return callback(null, {message: "Register Berhasil, Silakan Melakukan Login!"});
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
            return callback(null, response);
        } else {
            return callback(null, response);
        }
    } else {
        return callback(null, response);
    }
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