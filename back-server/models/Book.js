const mongoose = require('mongoose');

const reviewChema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createadAt: { type: Date, default: Date.now }
});

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    description: { type: String },
    publishedYear: { type: Number },
    rating: { type: Number, default: 0 },
    coverUrl: { type: String },
    reviews: [reviewChema]
} , { timestamps: true });;

BookSchema.methods.updateRating = function () {
    if (this.reviews.length === 0) {
        this.rating = 0;
    }
    else {
        const total = this.reviews.reduce((sum, review) => sum + review.rating, 0)
        this.rating = total / this.reviews.length;
    }
}

const Book = mongoose.model('Book', BookSchema);
module.exports = mongoose.model('Book', BookSchema);