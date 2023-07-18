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
        parse_mode: 'html',
		reply_markup: {
			inline_keyboard: [
                [
                    { text: "Сделать заказ", callback_data: "startOrder" }
                ]
            ],
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
				{ text: "Полноразмер", callback_data: "full" },
				{ text: "Халф", callback_data: "half" },
				{ text: "Только голова", callback_data: "head" },
			],
		],
	},
	completnessOption: {
		inline_keyboard: [
			[
				{ text: "Скетч", callback_data: "sketch" },
				{ text: "Скетч с покраской", callback_data: "sketchWithPaint" },
				{ text: "Полноценный арт", callback_data: "art" },
			],
		],
	},
	renderOption: {
		inline_keyboard: [
            [
                { text: 'Рендер', callback_data: "renderPositive"},
                { text: 'Без рендера', callback_data: 'renderNegative'},
            ]
        ],
	},
    backgroundOption: {
        inline_keyboard: [
            [
                { text: 'Только цвет', callback_data: "onlyColor"},
                { text: 'Детализированный фон', callback_data: 'detailedBg'}
            ]
        ]
    } 
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
