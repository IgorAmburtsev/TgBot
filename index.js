import { chatBot, channelBot } from './utils/botsEntryPoint.js'
import mongoose from "mongoose";
import PortfolioModel from "./Models/PortfolioModel.js";
import downloader from "./middleware/downloader.js";
import { mainMenuOptions }  from "./middleware/inline_keyboard.js";
import { menuRouter } from './middleware/menuRouter.js';
import { mainText } from './utils/texts.js';
import fs from 'fs'

mongoose
	.connect(process.env.MONGODB_CONNECT)
	.then(() => console.log("db connected"))
	.catch("db errored");


chatBot.setMyCommands([
	{
		command: '/start', 
		description: 'Открыть меню'
	},
])



/*
 * --------------------------------	
 * 		  Канал UNDERWORLD
 * --------------------------------	
 */


const startChannelBot = async () => {
	channelBot.on("channel_post", async (msg) => {
		if (msg.photo && msg.caption.toLowerCase().includes("#арт")) {
			const fileId = msg.photo[3].file_id;

			const fileName = "new_meme";
			const path = `./Portfolio/${fileName + ".jpg"}`;

			channelBot.getFileLink(fileId).then(async (link) => {
				downloader(link, fileName, path);
				try {
					const post = new PortfolioModel({
						pic: path,
						style: "meme" + Math.floor(Math.random() * 100),
						genre: "new meme 2",
					});
					const newModel = await post.save();
				} catch (error) {
					console.log(error);
				}
			});
		}
	});
};

/*
 * --------------------------------	
 * 		   Бот UNDERWORLD
 * --------------------------------	
 */

const startChatBot = () => {

	let current = 0

	chatBot.on('message', msg => {
	})
	chatBot.onText(/\/start/, msg => {
		const chatId = msg.chat.id
		chatBot.sendMessage(chatId, mainText, mainMenuOptions)
	})

	chatBot.on('callback_query', msg => {
		chatBot.answerCallbackQuery(msg.id).then(() => {
			menuRouter(msg.message.chat.id, msg.data)
		  })
	})

    // chatBot.on('callback_query', msg => {
    //     chatBot.answerCallbackQuery(msg.id).then(() => {
	// 		menuRouter(msg.message.chat.id, msg.data, current)
	// 	return console.log('3213')	
    //     })
    // })

};

startChannelBot()
startChatBot()
