const Movie = require("../models/Movie");

// Add a new movie
module.exports.addMovie = async (req, res) => {
    try {
        const { title, director, year, description, genre, imgUrl } = req.body;
        const movie = new Movie({ title, director, year, description, genre });
        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all movies
module.exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json({ movies: movies });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a movie by ID
module.exports.getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id).populate("comments.userId", "name"); // Populate user info if needed
        if (!movie) {
            return res.status(404).json({ success: false, message: "Movie not found" });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a movie
module.exports.updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const movie = await Movie.findByIdAndUpdate(id, updatedData, { new: true });
        if (!movie) {
            return res.status(404).json({ success: false, message: "Movie not found" });
        }
        res.status(200).json({ message: 'Movie updated successfully', updatedMovie: movie });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a movie
module.exports.deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByIdAndDelete(id);
        if (!movie) {
            return res.status(404).json({ success: false, message: "Movie not found" });
        }
        res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add a comment to a movie
module.exports.addMovieComment = async (req, res) => {
    try {
        const { movieId } = req.params; // Movie ID
        const userId = req.user.id;
        const comment = req.body.comment;

        // Validate input
        if (!userId || !comment) {
            return res.status(400).json({ success: false, message: "User ID and comment are required" });
        }

        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ success: false, message: "Movie not found" });
        }

        const newComment = { userId, comment };
        movie.comments.push(newComment);
        await movie.save();

        res.status(200).json({ message: "Comment added successfully", updatedMovie: movie });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get comments for a movie
module.exports.getMovieComments = async (req, res) => {
    try {
        const { movieId } = req.params;

        const movie = await Movie.findById(movieId)
            .select("comments")
            .populate("comments.userId", "name"); // Assuming the User model has a `name` field

        if (!movie) {
            return res.status(404).json({ success: false, message: "Movie not found" });
        }

        res.status(200).json({ comments: movie.comments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

