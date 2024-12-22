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

router.get("/list", async (_, response) => {
	try {
		let list = await Comics.find();
		// const resp1 = await Comics.find().skip(500).limit(500);
		// const resp2 = await Comics.find().skip(1000).limit(500);
		// const resp3 = await Comics.find().skip(1500).limit(500);

		console.log(list.length);

		// fs.writeFileSync(
		// 	"comics.json",
		// 	Buffer.from(JSON.stringify(list)).toString("base64")
		// );

		response.json(list);
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
