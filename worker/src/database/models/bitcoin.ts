import mongoose, { models } from "mongoose";

const bitcoinSchema = new mongoose.Schema({
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

export default models.bitcoin || mongoose.model('bitcoin',bitcoinSchema)