import { Schema, model, modelNames } from "mongoose";

// Create schema
const movieSchema = new Schema({
    title: String,
    category: String,
    genre: String,
    director: String,
    year: Number,
    imageUrl: String,
    rating: Number,
    descriptio: String,
})

// Create model
const Movie = model('Movie', movieSchema);

// Export model
export default Movie;