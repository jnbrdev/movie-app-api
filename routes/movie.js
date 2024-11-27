const express = require("express");
const movieController = require("../controllers/movie");
const { verify, verifyAdmin } = require("../auth");
const router = express.Router();

router.post("/addMovie", verify, verifyAdmin, movieController.addMovie);
router.get("/getMovies", movieController.getAllMovies);
router.get("/getMovie/:id", movieController.getMovieById);
router.patch("/updateMovie/:id", verify, verifyAdmin, movieController.updateMovie);
router.delete("/deleteMovie/:id", verify, verifyAdmin, movieController.deleteMovie);
router.patch("/addComment/:movieId", verify, movieController.addMovieComment);
router.get("/getComments/:movieId", verify, movieController.getMovieComments);


module.exports = router;
