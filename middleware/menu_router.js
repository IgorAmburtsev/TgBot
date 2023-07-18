import { chatBot } from "../utils/bots_entry_point.js";
import { getFiles } from "./get_files.js";
import { mainMenuOptions, orderMenuOptions, portfolioMenuOptions } from "./inline_keyboard.js";
import { orderText } from "../utils/texts.js";

const about = (chatId, data) => {
	chatBot.sendMessage(chatId, data);
};

let current = 0;
let currentFilesIds = [];
let currentOrderMessageId = []
let msgId = [];
let files = getFiles();

let obj = {
	orderFrom: '',
	orderNum: 0,
	orderReference: ['123', 312],
	orderCaption: '2312312312',
	orderOptions: {
		numberOfPerson: 1,
		sizeOption: '312312',
		completenessOption: '321321',
		renderOption: '321312',
		backgroundOption: '321321312'
	}
}


export const menuRouter = (chatId, data) => {
	const actions = {
		about: () => about(chatId, data),
		portfolio: () => {
			chatBot.sendMediaGroup(chatId, files[0]).then(
				(msg) => (
					console.log(msg),
					chatBot
						.sendMessage(chatId, "Смотреть другие работы", portfolioMenuOptions.mainHasOnlyNext)
						.then((msg) => {
							msgId[0] = msg.message_id;
							console.log(currentFilesIds);
						}),
					msg.map((data, index) => currentFilesIds.push(data.message_id))
				)
			);
		},
		ask: () => chatBot.sendMessage(chatId, data),
		order: () => {
			chatBot.sendMessage(chatId, orderText.mainText, orderMenuOptions.mainOrderMenu).then(
				(msg) => {
					currentOrderMessageId.push(msg.message_id)
				}
			)
		},
		message: () => chatBot.sendMessage(chatId, data),
		next: () => {
			chatBot.sendMessage(chatId, "Загрузка...").then((msg) => {
				current++
				console.log(current)
				let filesToSend = files[current];
				if ( current === 1 ) {
					currentFilesIds.map((obj, index) => {
						chatBot.editMessageMedia(filesToSend[index], { chat_id: chatId, message_id: obj })
					})
					chatBot.editMessageReplyMarkup(portfolioMenuOptions.normal, {
						chat_id: chatId,
						message_id: msgId[0],
					})
				}
				if ( current === files.length - 1 ) {
					currentFilesIds.map((obj, index) => {
						chatBot.editMessageMedia(filesToSend[index], { chat_id: chatId, message_id: obj })
					})
					chatBot.editMessageReplyMarkup(portfolioMenuOptions.hasOnlyPrev, {
						chat_id: chatId,
						message_id: msgId[0],
					})
				}
				if (current !== 1 && current !== files.length - 1){
					currentFilesIds.map((obj, index) => {
						chatBot.editMessageMedia(filesToSend[index], { chat_id: chatId, message_id: obj })
					})
				} 

				chatBot.deleteMessage(chatId, msg.message_id);
			});
		},
		prev: () => {
			chatBot.sendMessage(chatId, "Загрузка...").then((msg) => {
				current--
				console.log(current)
				let filesToSend = files[current];
				if(current === files.length - 2) {
					currentFilesIds.map((obj, index) => {
						chatBot.editMessageMedia(filesToSend[index], { chat_id: chatId, message_id: obj })
					})
					chatBot.editMessageReplyMarkup(portfolioMenuOptions.normal, {
						chat_id: chatId,
						message_id: msgId[0],
					})
				}
				if(current === 0) {
					currentFilesIds.map((obj, index) => {
						chatBot.editMessageMedia(filesToSend[index], { chat_id: chatId, message_id: obj })
					})
					chatBot.editMessageReplyMarkup(portfolioMenuOptions.hasOnlyNext, {
						chat_id: chatId,
						message_id: msgId[0],
					})
				}
				if (current != 1 && current != files.length - 1){
					currentFilesIds.map((obj, index) => {
						chatBot.editMessageMedia(filesToSend[index], { chat_id: chatId, message_id: obj })
					})
				} 
				chatBot.deleteMessage(chatId, msg.message_id);
			});
		},
		first: () => {
			console.log(currentFilesIds);
			current = 0;
			currentFilesIds.map((obj, index) => {
				let filesToSend = files[current];
				chatBot.editMessageMedia(filesToSend[index], { chat_id: chatId, message_id: obj });
			});
			chatBot.editMessageReplyMarkup(portfolioMenuOptions.hasOnlyNext, { chat_id: chatId, message_id: msgId[0] });
		},
		startOrder: () => {
			console.log(currentOrderMessageId[0])
			chatBot.editMessageText(orderText.firstQuestion, { chat_id: chatId, message_id: currentOrderMessageId[0], parse_mode: 'HTML' })
			chatBot.editMessageReplyMarkup(orderMenuOptions.numberOfPersonOption, { chat_id: chatId, message_id: currentOrderMessageId[0]})

			chatBot.on('callback_query', msg => {
				chatBot.answerCallbackQuery(msg.id).then((data) => {
					chatBot
				})
			})
		}
		
	};


	return actions[data]?.();
};
