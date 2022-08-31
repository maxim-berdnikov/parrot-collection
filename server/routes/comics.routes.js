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
    const list = await Comics.find();

    // fs.writeFileSync("comics.json", JSON.stringify(list));

    response.json(list);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Что-то пошло не так, попробуйте снова" });
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
    await Comics.findByIdAndRemove(request.params.id).then(
      response.json("Ok")
    );
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
