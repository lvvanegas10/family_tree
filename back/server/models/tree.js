const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role'
};

let Schema = mongoose.Schema;


let treeSchema = new Schema({
    id: {
        type: String,
    },
    tree: {
        type: Array,
        required: [true, 'A tree is required']
    }
});

treeSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

module.exports = mongoose.model('Tree', treeSchema);