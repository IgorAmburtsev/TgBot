import fs from "fs";

export const getFiles = () => {
	const dir = fs.readFileSync("./utils/urls.txt", "utf8", (err, data) => {
		if (err) {
			console.log(err);
		}
	});

	let arrayOfUrls = dir.split("; ");

	let arrayOfObjects = arrayOfUrls.map((d, index) => {
		let obj = {
			type: "photo",
			media: d,
		};
		return obj;
	});

	// console.log(arrayOfObjects, arrayOfObjects.length)

	let size = 5;
	let subarray = [];

	if (arrayOfObjects.length < Math.floor(arrayOfObjects.length / size)) {
		const numOfMissing = size - arrayOfObjects.length;
		console.log('Тут сработало')
        subarray = subarray.concat(arrayOfObjects)
		for (let i = 0; i < numOfMissing; i++) {
			subarray.push({
				type: "photo",
				media: "https://i.imgur.com/DcopMzE.jpg",
			});
		}
	} else {
		for (let i = 0; i < Math.ceil(arrayOfObjects.length / size); i++) {
			subarray[i] = arrayOfObjects.slice(i * size, i * size + size);
			if (subarray[i].length < size) {
				const numOfMissing = size - subarray[i].length;
				const addToArray = subarray[i - 1].slice(-numOfMissing);
				addToArray.map((obj) => {
					subarray[i].unshift(obj);
				});
			}
		}
	}

	// console.log(subarray);

	return subarray;
};
