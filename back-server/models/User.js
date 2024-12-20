const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    role: {type: String, enum: ['user', 'admin'], default: 'user'},
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
    history: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}]
});

module.exports = mongoose.model('User', UserSchema);