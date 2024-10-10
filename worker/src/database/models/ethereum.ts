import mongoose, { models } from "mongoose";

const ethereumSchema = new mongoose.Schema({
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

export default models.ethereum || mongoose.model('ethereum',ethereumSchema)