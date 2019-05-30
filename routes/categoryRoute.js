const express = require("express");
const db = require("../data/helpers/categoryDb");
const router = express.Router();
// const { authenticate } = require("../middleware/authMidware");

router.get("/", (req, res) => {
  db.get()
    .then(categories => {
      res.status(200).json(categories);
    })
    .catch(err => res.status(500).json(err.message));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(category => {
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({
          message: "The category with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.post("/", async (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ message: "Please provide a name for the category." });
  }

  try {
    let newcategory = await db.insert(req.body);
    let updatedArray = await db.get();
    return res.status(201).json({
      id: newcategory.id,
      name: req.body.name,
      categories: updatedArray
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let category = await db.get(id);
    if (!category) {
      res
        .status(404)
        .json({
          message: "The category with the specified ID does not exist."
        });
    }
    await db.remove(id);
    let updatedArray = await db.get();
    return res.status(200).json({
      category: updatedArray,
      message: "successfully deleted"
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//updates the category and returns the updated array of categories
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body.name;

  if (!name) {
    return res.status(400).json({ message: "Please provide a name." });
  } else {
    db.get(id).then(category => {
      if (!category) {
        return res.status(404).json({
          message: "The category with the specified ID does not exist."
        });
      }
    });
  }
  try {
    let update = await db.update(id, category);
    let updatedcategory = await db.get(id);
    let updatedArray = await db.get();
    return res
      .status(200)
      .json({ category: updatedcategory, categories: updatedArray });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
