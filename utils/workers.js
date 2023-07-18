import { connect } from "mongoose";
import { getUrls } from "./urls.js";
import { chatBot, channelBot } from './bots_entry_point.js'
import PortfolioModel from "../Models/PortfolioModel.js";
import OrderModel from "../Models/OrderModel.js";
import moment from "moment/moment.js";
import 'moment/locale/ru.js'

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

OrderModel.watch().on('change', res => {
    console.log(res)
})


moment.locale('ru')
// console.log(moment(obj.created_at).format('DD.MM.YYYY, kk:mm'))


// await OrderModel.create(
//     {
//         orderFrom: '321321312',
//         orderNum: 1,
//         orderReference: ['123', 312],
//         orderCaption: '2312312312',
//         orderOptions: {
//             numberOfPerson: 1,
//             sizeOption: '312312',
//             completenessOption: '321321',
//             renderOption: '321312',
//             backgroundOption: '321321312'
//         }
//     }
// )



getUrls()

