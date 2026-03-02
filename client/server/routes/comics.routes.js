const { Router } = require("express");
const Comics = require("../models/Comics");
const fs = require("fs");

const router = Router();

router.post("/add", async (request, response) => {
	try {
		const newItem = {
			...request.body,
			owned: "0",
			sell: "0",
			wishlist: "0",
			addingDate: new Date(),
		};
		const newBdItem = new Comics({ ...newItem });

		await newBdItem.save();

		response.status(201).json({ newBdItem });
	} catch (error) {
		response
			.status(500)
			.json({ message: "Что-то пошло не так, попробуйте снова", e });
	}
});

router.get("/list", async (request, response) => {
	try {
		let list = await Comics.find();

		// let list = await Comics.find().skip(request.body.skip).limit(20);

		response.json(list);

		const SIZE = 500;

		// const stacksNumber = Math.ceil(list.length / SIZE);

		// for (let i = 0; i <= stacksNumber; i++) {
		// 	fs.writeFileSync(
		// 		`comics-${i}.json`,
		// 		JSON.stringify(list.slice(i * SIZE, (i + 1) * SIZE))
		// 	);
		// }

		fs.writeFileSync(`comics1.json`, JSON.stringify(list.slice(0, 500)));
		fs.writeFileSync(`comics2.json`, JSON .stringify(list.slice(500, 1000)));
		console.log(list.length)
		fs.writeFileSync(`comics3.json`, JSON.stringify(list.slice(1000, 1087)));

		console.log(list.length)
	} catch (error) {
		console.log({ error });
		response
			.status(500)
			.json({ message: "Что-то пошло не так, попробуйте снова", error });
	}
});

router.get("/:id", async (request, response) => {
	try {
		const comics = await Comics.findById(request.params.id);

		response.json(comics);
	} catch (error) {
		response
			.status(500)
			.json({ message: "Что-то пошло не так, попробуйте снова" });
	}
});

router.get("/:id/delete", async (request, response) => {
	try {
		await Comics.findByIdAndRemove(request.params.id).then(response.json("Ok"));
	} catch (error) {
		response
			.status(500)
			.json({ message: "Что-то пошло не так, попробуйте снова" });
	}
});

router.post("/:id/update", async (request, response) => {
	try {
		await Comics.findOneAndUpdate(
			{ _id: request.params.id },
			request.body
		).then(response.json("Ok"));
	} catch (error) {
		response
			.status(500)
			.json({ message: "Что-то пошло не так, попробуйте снова" });
	}
});

module.exports = router;
