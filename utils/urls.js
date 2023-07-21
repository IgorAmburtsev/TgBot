import PortfolioModel from "../Models/PortfolioModel.js";
import fs from "fs";


export const getUrls = async () => {
	const imgUrls = await PortfolioModel.find({});
	const urlsArr = imgUrls.map((obj) => {
		return obj.pic
	});

	
	fs.writeFileSync("./utils/urls.txt", urlsArr.join("; "), () => console.log("Четко все"));
};
