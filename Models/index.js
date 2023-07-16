import { chatBot, channelBot } from './utils/botsEntryPoint.js'
import mongoose from "mongoose";
import PortfolioModel from "./Models/PortfolioModel.js";
import downloader from "./middleware/downloader.js";
import { mainMenuOptions } from "./middleware/inline_keyboard.js";
import { menuRouter } from './middleware/menuRouter.js';
import { mainText } from './utils/texts.js';
import fs, { createReadStream } from 'fs'
import { getUrls } from './utils/urls.js';
import imgur from 'imgur';
import fileUrl from 'file-url';
import imageToBase64 from 'image-to-base64';
import { REPL_MODE_STRICT } from 'repl';
import { getFiles } from './middleware/getFiles.js';

const client = new imgur.ImgurClient({ clientId: process.env.IMGUR_ID })

mongoose
	.connect(process.env.MONGODB_CONNECT, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("db connected"))
	.catch("db errored");


const sleep = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

getUrls()


// PortfolioModel.watch().on('change')




chatBot.setMyCommands([
	{
		command: '/start',
		description: 'Открыть меню'
	},
])


const fileName = "new_memes";
const path = `./Portfolio/${fileName + ".jpg"}`;

const b64 = async (path) => {
	return await imageToBase64(path).then(res => { return res }).catch(err => { throw err })
}


/*
 * --------------------------------	
 * 		  Канал UNDERWORLD
 * --------------------------------	
 */


const startChannelBot = async () => {
	channelBot.on("channel_post", async (msg) => {
		if (msg.photo !== undefined && msg.caption !== undefined && msg.caption.toLowerCase().indexOf("#арт") >= 0) {
			const fileId = msg.photo[msg.photo.length - 1].file_id;
			const fileName = "new_memes";
			const path = `./Portfolio/${fileName + ".jpg"}`;

			channelBot.getFileLink(fileId).then(async (link) => {
				let url = await downloader(link, fileName, path)
			});

			await sleep(1000)
			await b64(path).then(async (res) => {
				const uploadImage = await client.upload({
					image: res,
					type: 'base64',
				});
				console.log(uploadImage)
				await sleep(1000)
				try {
					const post = new PortfolioModel({
						pic: uploadImage.data.link,
						style: "meme" + Math.floor(Math.random() * 100),
						genre: "new meme" + Math.floor(Math.random() * 100),
					});
					const newModel = await post.save();
				} catch (error) {
					console.log(error);
				}

			})

		} else {
			console.log('nothing')
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
