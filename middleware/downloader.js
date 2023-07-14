import fs, { createReadStream } from "fs";
import { FormData } from "node-fetch";
import axios from "axios";
import imgbbUploader from "imgbb-uploader";
import imgur from 'imgur';

const client = new imgur.ImgurClient({clientId: process.env.IMGUR_ID})

const sleep = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

const downloader = async (link, name, path) => {
	const file = fs.createWriteStream(path);
	const req = await axios({
		method: "GET",
		responseType: "stream",
		url: link,
	}).then((res) => res.data.pipe(file))

	file.on("finish", async () => {
		file.close();
		console.log(`Файл ${name} загружен`);
	})

	return console.log('Готово')
};

export default downloader;
