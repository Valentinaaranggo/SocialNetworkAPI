const { Schema, model, Types,  SchemaTypes }= require('mongoose');


const userSchema= new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trimmed: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // regex
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts: {
            type: SchemaTypes.ObjectId,
            ref: 'Thought',
        },
        friends: {
            type:SchemaTypes.ObjectId,
            ref:'User',
        },
    },
    { 
        toJSON:{
            virtuals:true,
            getters: true,
        },
        id:false,
        }


);



const User = model('User', userSchema)

module.exports= User;
