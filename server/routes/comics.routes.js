const { Router } = require("express");
const Comics = require("../models/Comics");
const fs = require("fs");

const router = Router();

router.post("/add", async (req, res) => {
  try {
    const newItem = {
      ...req.body,
      owned: "0",
      sell: "0",
      wishlist: "0",
      addingDate: new Date(),
    };
    const newBdItem = new Comics({ ...newItem });

    await newBdItem.save();

    res.status(201).json({ newBdItem });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Что-то пошло не так, попробуйте снова", e });
  }
});

router.get("/list", async (req, res) => {
  try {
    const list = await Comics.find();

    // fs.writeFileSync("comics.json", JSON.stringify(list));

    res.json(list);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
