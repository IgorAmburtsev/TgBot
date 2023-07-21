import fs, { createReadStream } from "fs";
import { FormData } from "node-fetch";
import axios from "axios";
import imgbbUploader from "imgbb-uploader";
import imgur from 'imgur';
import imageToBase64 from 'image-to-base64';

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
