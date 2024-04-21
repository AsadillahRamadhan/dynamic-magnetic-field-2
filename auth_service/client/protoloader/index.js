import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';


let PROTO_PATH = '../protos/auth.proto';

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

const client = new auth('localhost:50051', grpc.credentials.createInsecure());

export default client;