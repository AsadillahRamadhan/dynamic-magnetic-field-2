import mongoose, { trusted } from 'mongoose';

const DMF = mongoose.model('DMF', {
    OperationTime: {
        type: Decimal128,
        required: true
    },
    RotationRPM: {
        type: Decimal128,
        required: true
    },
    PowerConsume: {
        type: Decimal128,
        required: true
    }
});


export default DMF;