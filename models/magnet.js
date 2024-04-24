import mongoose from "mongoose";

const Magnet = mongoose.model('Magnet', {
    MagnetStrength: {
        type: Decimal128,
        required: true
    },
    MagnetActive: {
        type: Boolean,
        required: true
    },
    MagnetArray: {
        Type: Object,
        required: true
    }
})