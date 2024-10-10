import mongoose, { models } from "mongoose";

const maticNetworkSchema = new mongoose.Schema({
    current_price: {
        type: Number,
        required: true,
    },
    market_cap: {
        type: Number,
        required: true,
    },
    change_24h: { 
        type: Number,
        required: true,
    },
    }, 
    {
        timestamps: true, 
    });

export default models.matic || mongoose.model('matic', maticNetworkSchema);