const express = require("express");
const db = require("../data/helpers/parentDb");
const router = express.Router();
// const { authenticate } = require("../middleware/authMidware");

router.get("/", (req, res) => {
  db.get()
    .then(parents => {
      res.status(200).json(parents);
    })
    .catch(err => res.status(500).json(err.message));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(parent => {
      if (parent) {
        res.status(200).json(parent);
      } else {
        res.status(404).json({
          message: "The parent with the specified ID does not exist."
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
      .json({ message: "Please provide a name for the parent." });
  }

  try {
    let newparent = await db.insert(req.body);
    let updatedArray = await db.get();
    return res.status(201).json({
      id: newparent.id,
      name: req.body.name,
      parents: updatedArray
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let parent = await db.get(id);
    if (!parent) {
      res
        .status(404)
        .json({ message: "The parent with the specified ID does not exist." });
    }
    await db.remove(id);
    let updatedArray = await db.get();
    return res.status(200).json({
      parent: updatedArray,
      message: "successfully deleted"
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//updates the parent and returns the updated array of parents
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body.name;

  if (!name) {
    return res.status(400).json({ message: "Please provide a name." });
  } else {
    db.get(id).then(parent => {
      if (!parent) {
        return res.status(404).json({
          message: "The parent with the specified ID does not exist."
        });
      }
    });
  }
  try {
    let update = await db.update(id, parent);
    let updatedparent = await db.get(id);
    let updatedArray = await db.get();
    return res
      .status(200)
      .json({ parent: updatedparent, parents: updatedArray });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
