import { chatBot } from "../utils/botsEntryPoint.js";
import { getFiles } from "./getFiles.js";
import { mainMenuOptions, portfolioMenuOptions } from "./inline_keyboard.js";

const about = (chatId, data) => {
	chatBot.sendMessage(chatId, data);
};

let current = 0;
let currentFilesIds = [];
const files = getFiles();

export const menuRouter = (chatId, data) => {
	const actions = {
		about: () => about(chatId, data),
		portfolio: () => {
			chatBot
				.sendMediaGroup(chatId, files[current])
				.then(
					(msg) => (
						chatBot.sendMessage(chatId, "Смотреть другие работы", portfolioMenuOptions),
						msg.map((obj) => currentFilesIds.push(obj.message_id))
					)
				);
		},
		ask: () => chatBot.sendMessage(chatId, data),
		order: () => chatBot.sendMessage(chatId, data),
		message: () => chatBot.sendMessage(chatId, data),
		next: () => {
			current < files.length + 1
				? (current++,
				  currentFilesIds.map((obj, index) => {
					let filesToSend = files[current]
					console.log(filesToSend[index])
					chatBot.editMessageMedia({type: "photo", media: ''}, {chat_id: chatId, message_id: obj})
				  }))
				: "";
		},
		prev: () => {
			current !== 0 ? current-- : "", chatBot.sendMessage(chatId, current);
		},
		first: () => {
			current = 0;
			chatBot.sendMessage(chatId, current);
		},
	};

	return actions[data]?.();
};
