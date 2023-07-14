import { chatBot, channelBot } from './utils/botsEntryPoint.js'
import mongoose from "mongoose";
import PortfolioModel from "./Models/PortfolioModel.js";
import downloader from "./middleware/downloader.js";
import { mainMenuOptions }  from "./middleware/inline_keyboard.js";
import { menuRouter } from './middleware/menuRouter.js';
import { mainText } from './utils/texts.js';
import fs, { createReadStream } from 'fs'
import { getUrls } from './utils/urls.js';
import imgur from 'imgur';
import fileUrl from 'file-url';
import imageToBase64 from 'image-to-base64';

const client = new imgur.ImgurClient({clientId: process.env.IMGUR_ID})

mongoose
	.connect(process.env.MONGODB_CONNECT)
	.then(() => console.log("db connected"))
	.catch("db errored");

getUrls()



chatBot.setMyCommands([
	{
		command: '/start', 
		description: 'Открыть меню'
	},
])



const base64String = await imageToBase64('./Portfolio/new_memes.jpg').then(res => {return res})


/*
 * --------------------------------	
 * 		  Канал UNDERWORLD
 * --------------------------------	
 */

console.log()


const startChannelBot = async () => {
	channelBot.on("channel_post", async (msg) => {
		if (msg.photo != undefined) {
			const fileId = msg.photo[2].file_id;
			const fileName = "new_memes";
			const path = `./Portfolio/${fileName + ".jpg"}`;
			
			channelBot.getFileLink(fileId).then(async (link) => {
				let url = await downloader(link, fileName, path);
				const response = await client.upload({
					image: base64String,
					type: 'base64',
				  });
				  console.log(response.data);
				
				// try {
				// 	const post = new PortfolioModel({
				// 		pic: url,
				// 		style: "meme" + Math.floor(Math.random() * 100),
				// 		genre: "new meme 2",
				// 	});
				// 	const newModel = await post.save();
				// } catch (error) {
				// 	console.log(error);
				// }
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

	chatBot.onText(/\/start/, msg => {
		const chatId = msg.chat.id
		chatBot.sendMessage(chatId, mainText, mainMenuOptions)
	})

	chatBot.on('callback_query', msg => {
		chatBot.answerCallbackQuery(msg.id).then(() => {
			menuRouter(msg.message.chat.id, msg.data)
		  })
	})
};

startChannelBot()
startChatBot()
