import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import ConnectDB from "./database";
import dotenv from "dotenv"
import Matic from "./database/models/maticNetwork";
import Ethereum from "./database/models/ethereum";
import Bitcoin from "./database/models/bitcoin";
import calculateStandardDeviation from "./utils";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config()



app.get('/stats', async (req: Request, res: Response) => {
    try {
        const { coin } = req.query;

        if (!coin || (coin !== 'matic-network' && coin !== 'ethereum' && coin !== 'bitcoin')) {
            return res.status(400).json({ error: "Invalid coin type" });
        }

        await ConnectDB();

        let data;

        switch (coin) {
            case 'matic-network':
                data = await Matic.findOne().sort({ createdAt: -1 });
                break;
            case 'ethereum':
                data = await Ethereum.findOne().sort({ createdAt: -1 });
                break;
            case 'bitcoin':
                data = await Bitcoin.findOne().sort({ createdAt: -1 });
                break;
            default:
                return res.status(400).json({ error: "Invalid coin type" });
        }

        if (!data) {
            return res.status(404).json({ error: "No data found for the specified coin" });
        }

        return res.json({
            price: data.current_price,
            marketCap: data.market_cap,
            change_24h: data.change_24h
        });

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});


app.get('/deviation', async (req: Request, res: Response) => {
    try {
        const { coin } = req.query;

        if (!coin || (coin !== 'matic-network' && coin !== 'ethereum' && coin !== 'bitcoin')) {
            return res.status(400).json({ error: "Invalid coin type" });
        }

        await ConnectDB();

        let data;

        switch (coin) {
            case 'matic-network':
                data = await Matic.find().sort({ createdAt: -1 }).limit(100);
                break;
            case 'ethereum':
                data = await Ethereum.find().sort({ createdAt: -1 }).limit(100);
                break;
            case 'bitcoin':
                data = await Bitcoin.find().sort({ createdAt: -1 }).limit(100);
                break;
            default:
                return res.status(400).json({ error: "Invalid coin type" });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ error: "No data found for the specified coin" });
        }

        const prices = data.map(item => item.current_price);

        const stdDeviation = calculateStandardDeviation(prices);

        return res.json({ standardDeviation: stdDeviation });

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
