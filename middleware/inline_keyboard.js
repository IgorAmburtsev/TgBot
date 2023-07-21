export const mainMenuOptions = (name) => {
	if (name === "shaera11" || name === "obemenaxyi") {
		return {
			parse_mode: "HTML",
			reply_markup: JSON.stringify({
				inline_keyboard: [
					[{ text: "Об авторе", callback_data: "about" }],
					[{ text: "Портфолио", callback_data: "portfolio" }],
					[{ text: "Частые вопросы", callback_data: "ask" }],
					[{ text: "Заказать арт", callback_data: "order" }],
					[{ text: "Сообщение Автору", callback_data: "message" }],
					[{ text: "Заказы", callback_data: "orders" }],
					[{ text: "Сообщения", callback_data: "messages" }],
				],
			}),
		};
	} else {
		return {
			parse_mode: "HTML",
			reply_markup: JSON.stringify({
				inline_keyboard: [
					[{ text: "Об авторе", callback_data: "about" }],
					[{ text: "Портфолио", callback_data: "portfolio" }],
					[{ text: "Частые вопросы", callback_data: "ask" }],
					[{ text: "Заказать арт", callback_data: "order" }],
					[{ text: "Сообщение Автору", callback_data: "message" }],
				],
			}),
		};
	}
};

export const orderMenuOptions = {
	mainOrderMenu: {
		parse_mode: "html",
		reply_markup: {
			inline_keyboard: [[{ text: "Сделать заказ", callback_data: "startOrder" }]],
		},
	},
	numberOfPersonOption: {
		inline_keyboard: [
			[
				{ text: "Один", callback_data: "one" },
				{ text: "Два", callback_data: "two" },
				{ text: "Три", callback_data: "three" },
			],
		],
	},
	sizeOption: {
		inline_keyboard: [
			[
				{ text: "Полноразмер", callback_data: "fullsize" },
				{ text: "Халф", callback_data: "half" },
				{ text: "Только голова", callback_data: "head" },
			],
		],
	},
	completnessOption: {
		inline_keyboard: [
			[
				{ text: "Скетч", callback_data: "sketch" },
				{ text: "Скетч с покраской", callback_data: "sketchWColor" },
				{ text: "Полноценный арт", callback_data: "fullArt" },
			],
		],
	},
	renderOption: {
		inline_keyboard: [
			[
				{ text: "Рендер", callback_data: "render" },
				{ text: "Без рендера", callback_data: "noRender" },
			],
		],
	},
	backgroundOption: {
		inline_keyboard: [
			[
				{ text: "Только цвет", callback_data: "backgroundColor" },
				{ text: "Детализированный фон", callback_data: "backgroundDetailed" },
			],
		],
	},
	doneOrder: {
		inline_keyboard: [[{ text: "Завершить оформление", callback_data: "done" }]],
	},
};

export const buttonBack = {
	parse_mode: "html",
	reply_markup: {
		inline_keyboard: [[{ text: "Вернуться", callback_data: "/start" }]],
	},
};

export const portfolioMenuOptions = {
	mainHasOnlyNext: {
		reply_markup: {
			inline_keyboard: [[{ text: "▶️", callback_data: "next" }]],
		},
	},
	normal: {
		inline_keyboard: [
			[
				{ text: "◀️", callback_data: "prev" },
				{ text: "⏺", callback_data: "first" },
				{ text: "▶️", callback_data: "next" },
			],
		],
	},
	hasOnlyPrev: {
		inline_keyboard: [
			[
				{ text: "◀️", callback_data: "prev" },
				{ text: "⏺", callback_data: "first" },
			],
		],
	},
	hasOnlyNext: {
		inline_keyboard: [[{ text: "▶️", callback_data: "next" }]],
	},
};

export const adminOptions = {
	newOrder: {
	parse_mode: 'html',		
	reply_markup: {
		inline_keyboard: [[{ text: "Посмотреть", callback_data: "viewOrder" }]],
	}},
	checkOrderWReference: {
	parse_mode: 'html',		
	reply_markup: {
		inline_keyboard: [[{text: 'Посмотреть референсы', callback_data: "getReference"}],
			[{ text: "✅", callback_data: "accept" },{text: "🛑", callback_data: "reject"}]
		],
	}},
	checkOrderWOReference: {
		parse_mode: 'html',		
		reply_markup: {
			inline_keyboard: [
				[{ text: "✅", callback_data: "accept" },{text: "🛑", callback_data: "reject"}]
			],
		}}
};
