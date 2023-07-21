import { connect } from "mongoose";
import { getUrls } from "./urls.js";
import { chatBot, channelBot } from './bots_entry_point.js'
import PortfolioModel from "../Models/PortfolioModel.js";
import OrderModel from "../Models/OrderModel.js";
import moment from "moment/moment.js";
import 'moment/locale/ru.js'
import { adminOptions } from "../middleware/inline_keyboard.js";

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
})

OrderModel.watch().on('change', res => {
    if (res.operationType === 'insert') {
        chatBot.sendMessage(701913751, `Новый заказ от ${res.fullDocument.orderFrom}!\nId: ${res.fullDocument._id}`, adminOptions.newOrder)
    }
})

chatBot.on("polling_error", (msg) => console.log(msg));
channelBot.on("polling_error", (msg) => console.log(msg));

moment.locale('ru')

getUrls()

