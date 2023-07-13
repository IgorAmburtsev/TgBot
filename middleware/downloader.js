import fs from "fs";
import { FormData } from "node-fetch";
import axios from "axios";
import imgbbUploader from 'imgbb-uploader'

const downloader = async (link, name, path) => {
	const file = fs.createWriteStream(path);
	const req = await axios({
		method: "GET",
		responseType: "stream",
		url: link,
	}).then((res) => res.data.pipe(file));
	file.on("finish", () => {
		file.close();
		console.log(`Файл ${name} загружен`);
	});
	const imgUrl = await imgbbUploader(process.env.IMGBB_TOKEN, path).then(res => {return res.url})
	return imgUrl
};

export default downloader