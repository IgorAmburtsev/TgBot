import fs from "fs";
import axios from "axios";

const downloader = async (link, name, path) => {
	const file = fs.createWriteStream(path);

	const req = await axios({
		method: "GET",
		responseType: "stream",
		url: link,
	}).then((res) => res.data.pipe(file))

	file.on("finish", async () => {
		file.close();
		// console.log(`Файл ${name} загружен`);
	})

	return
};

export default downloader;
