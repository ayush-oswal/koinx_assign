import dotenv from "dotenv";
import ConnectDB from "./database/index";
import Matic from "./database/models/maticNetwork";
import Bitcoin from "./database/models/bitcoin";
import Ethereum from "./database/models/ethereum";
import axios from "axios";
import cron from "node-cron";

dotenv.config();

const fetchCryptoData = async () => {
    try {

        await ConnectDB();


        const bitcoinResponse = await axios.get("https://api.coingecko.com/api/v3/coins/bitcoin");
        const ethereumResponse = await axios.get("https://api.coingecko.com/api/v3/coins/ethereum");
        const maticResponse = await axios.get("https://api.coingecko.com/api/v3/coins/matic-network");

        const bitcoinData = bitcoinResponse.data;
        const ethereumData = ethereumResponse.data;
        const maticData = maticResponse.data;

        const bitcoin = new Bitcoin({
            current_price: bitcoinData.market_data.current_price.usd,
            market_cap: bitcoinData.market_data.market_cap.usd,
            change_24h: bitcoinData.market_data.price_change_24h_in_currency.usd,
        });

        const ethereum = new Ethereum({
            current_price: ethereumData.market_data.current_price.usd,
            market_cap: ethereumData.market_data.market_cap.usd,
            change_24h: ethereumData.market_data.price_change_24h_in_currency.usd,
        });

        const matic = new Matic({
            current_price: maticData.market_data.current_price.usd,
            market_cap: maticData.market_data.market_cap.usd,
            change_24h: maticData.market_data.price_change_24h_in_currency.usd,
        });

        await bitcoin.save();
        await ethereum.save();
        await matic.save();

        console.log("Data saved successfully!");
    } catch (error) {
        console.error("Error fetching or saving data:", error);
    }
};

const startJob = async () => {
    fetchCryptoData(); 
    cron.schedule("0 */2 * * *", fetchCryptoData); 
};

startJob();
