const mongoose  = require('mongoose');  // Corrected 'requirs' to 'require'

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quote: { type: String },
}, { collection: 'user-data' });

const UserModel = mongoose.model('UserData', UserSchema);  // Corrected 'User' to 'UserSchema' and 'model' to 'UserModel'

module.exports = UserModel;  // Corrected 'model.exports' to 'module.exports'
