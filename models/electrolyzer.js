import mongoose, { trusted } from "mongoose";

const Electrolyzer = mongoose.model('Electrolyzer', {
    OperationTime: {
        type: Decimal128,
        required: true
    },
    MagnetAvail: {
        type: Boolean,
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

export default Electrolyzer;