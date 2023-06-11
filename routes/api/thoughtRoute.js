const router = require("express").Router();

const {
  getThoughts,
  getThoughtId,
  postThought,
  updateThought,
  deleteThought,
  createReaction,
  delReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(postThought);

router
  .route("/:thought_id")
  .get(getThoughtId)
  .delete(deleteThought)
  .put(updateThought);

router.route("/:thought_id/reaction").post(createReaction);

router.route("/:thought_id/reaction/:react_id").delete(delReaction);

module.exports = router;