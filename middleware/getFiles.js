import fs from "fs";

export const getFiles = () => {


	const dir = fs.readdirSync("./Portfolio", { withFileTypes: true })
    .map((d, index) => {
        let obj = {
            "type": "photo",
            "media": `./Portfolio/${d.name}`
        }
        return obj
    });

	let size = 10;
	let subarray = [];
	for (let i = 0; i < Math.ceil(dir.length / size); i++) {
		subarray[i] = dir.slice(i * size, i * size + size);
	}
	return subarray;
};


