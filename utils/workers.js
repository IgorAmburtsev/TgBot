import { connect } from "mongoose";
import { getUrls } from "./urls.js";
import { chatBot, channelBot } from './botsEntryPoint.js'
import PortfolioModel from "../Models/PortfolioModel.js";

connect(process.env.MONGODB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("db connected"))
.catch("db errored");

chatBot.setMyCommands([
	{
		command: '/start',
		description: 'Открыть меню'
	},
])

PortfolioModel.watch().on('change', res => {
    console.log(res)
})


getUrls()

