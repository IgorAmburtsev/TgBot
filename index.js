import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";
import mongoose from "mongoose";
import PortfolioModel from "./Models/PortfolioModel.js";
import downloader from "./middleware/downloader.js";
import { mainMenuOptions }  from "./middleware/inline_keyboard.js";

mongoose
	.connect(process.env.MONGODB_CONNECT)
	.then(() => console.log("db connected"))
	.catch("db errored");

const channelBot = new TelegramBot(process.env.CHANNEL_BOT_TOKEN, { polling: true });
const chatBot = new TelegramBot(process.env.CHAT_BOT_TOKEN, { polling: true });

chatBot.setMyCommands([
	{command: '/start', description: 'Начальное приветствие'},
	{command: '/info', description: 'Получить информацию о пользователе'},
	{command: '/game', description: 'Игра угадай цифру'},
])




/*
 * Канал UNDERWORLD
 */

chatBot.getCustomEmojiStickers(['5897948935971933748']).then()

const startChannelBot = async () => {
	channelBot.on("channel_post", async (msg) => {
		console.log(msg)
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
 * Бот Underworld
 */

const startChatBot = () => {
	chatBot.onText(/\/start/, msg => {
		const chatId = msg.chat.id
		console.log(msg)
		chatBot.sendMessage(chatId, 'Приветствую!', mainMenuOptions)
	})

	chatBot.on('callback_query', msg => {
		chatBot.answerCallbackQuery(msg.id).then(() => {
			if (msg.data == 'about') {
			  chatBot.sendMessage(msg.message.chat.id, 'Tapped');
			}
		  })
	})
};


startChannelBot()
startChatBot()