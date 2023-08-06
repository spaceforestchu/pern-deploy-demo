const express = require("express");
const router = express.Router();
const {
  getAllBookmarks,
  getBookmarkById,
  createBookmark,
  deleteBookmarkById,
  updateBookmark,
} = require("../queries/bookmarks");

const {
  checkName,
  checkBoolean,
  validateURL,
} = require("../validations/checkBookmarks");

//this is the place where mergeParam
const reviewsController = require("./reviewsController.js");
router.use("/:bookmarkId/reviews", reviewsController);

// INDEX
router.get("/", async (req, res) => {
  try {
    const allBookmarks = await getAllBookmarks();

    if (!allBookmarks) {
      res.status(500).json({ error: "server error" });
    } else {
      res.status(200).json(allBookmarks);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const bookmark = await getBookmarkById(req.params.id);

    if (!bookmark || bookmark.length === 0) {
      return res.status(404).json({ error: "not found" });
    } else {
      return res.json(bookmark[0]);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/", checkName, checkBoolean, async (req, res) => {
  try {
    const bookmark = await createBookmark(req.body);
    res.json(bookmark);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBookmark = await deleteBookmarkById(req.params.id);

    if (deletedBookmark.length === 0) {
      res.status(404).json("Bookmark not found");
    } else {
      res.json(deletedBookmark[0]);
    }
  } catch (e) {
    res.status(400).json({ error: error });
  }
});

router.put("/:id", checkName, checkBoolean, validateURL, async (req, res) => {
  try {
    const updatdBookmark = await updateBookmark(req.params.id, req.body);

    if (updatdBookmark.length === 0) {
      res.status(404).json("Bookmark not found");
    } else {
      res.json(updatdBookmark[0]);
    }
  } catch (e) {
    res.status(400).json({ error: error });
  }
});

module.exports = router;
