import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

let PROTO_PATH = './protos/auth.proto';


const Server = new grpc.Server();
const PORT = 50051;

let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);

let protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

let auth = protoDescriptor.AuthService;

const proto = {
    Server,
    PORT,
    auth
};

export default proto;