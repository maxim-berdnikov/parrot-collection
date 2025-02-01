const {
	MongoTransferer,
	MongoDBDuplexConnector,
	LocalFileSystemDuplexConnector,
} = require("mongodb-snapshot");

const { Router } = require("express");
const Comics = require("../models/Comics");
const fs = require("fs");

const router = Router();

async function dumpMongo2Localfile() {
	const mongo_connector = new MongoDBDuplexConnector({
		connection: {
			uri: `mongodb+srv://parrot_head:9kCM*yacsva_wk.@parrotcollection.rzf99.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
			dbname: "parrot-collection",
		},
	});

	const localfile_connector = new LocalFileSystemDuplexConnector({
		connection: {
			path: "./backup.tar",
		},
	});

	const transferer = new MongoTransferer({
		source: mongo_connector,
		targets: [localfile_connector],
	});

	for await (const { total, write } of transferer) {
		console.log(`remaining bytes to write: ${total - write}`);
	}
}

async function restoreLocalfile2Mongo() {
	const mongo_connector = new MongoDBDuplexConnector({
		connection: {
			uri: `mongodb+srv://parrot_head:9kCM*yacsva_wk.@parrotcollection.rzf99.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
			dbname: "parrot-collection",
		},
	});

	const localfile_connector = new LocalFileSystemDuplexConnector({
		connection: {
			path: "./backup.tar",
		},
	});

	const transferer = new MongoTransferer({
		source: localfile_connector,
		targets: [mongo_connector],
	});

	for await (const { total, write } of transferer) {
		console.log(`remaining bytes to write: ${total - write}`);
	}
}

async function mongoSnap(restore = false) {
	const mongo_connector = new BKP.MongoDBDuplexConnector({
		connection: {
			uri: `mongodb+srv://parrot_head:9kCM*yacsva_wk.@parrotcollection.rzf99.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
			dbname: "parrot-collection",
		},
	});
	const localfile_connector = new BKP.LocalFileSystemDuplexConnector({
		connection: { path: "./backup.tar" },
	});
	const transferer = restore
		? new BKP.MongoTransferer({
				source: localfile_connector,
				targets: [mongo_connector],
		  })
		: new BKP.MongoTransferer({
				source: mongo_connector,
				targets: [localfile_connector],
		  });
	for await (const { total, write } of transferer) {
	}
}

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

		response.json(list);

		fs.writeFileSync(`comics1.json`, JSON.stringify(list.slice(0, 500)));
		fs.writeFileSync(`comics2.json`, JSON.stringify(list.slice(500, 1000)));
		fs.writeFileSync(`comics3.json`, JSON.stringify(list.slice(1000)));
	} catch (error) {
		console.log({ error });
		response
			.status(500)
			.json({ message: "Что-то пошло не так, попробуйте снова", error });
	}
});

router.get("/list-backup", async (_, response) => {
	try {
		await restoreLocalfile2Mongo().then((res) => {
			response.send(res);
		});
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
