import fs from "fs";
import axios from "axios";


const downloader = async (link, name) => {
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

	return `${name}.jpg`;
};

export default downloader