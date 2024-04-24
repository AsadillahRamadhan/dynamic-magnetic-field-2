import mongoose from "mongoose";

const MagnetArray = mongoose.model('MagnetArray', {
    MagnetAvail: {
        type: Boolean,
        required: true
    }
});

export default MagnetArray;