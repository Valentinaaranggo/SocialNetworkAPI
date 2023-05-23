
const {Schema, model, Types }= require('mongoose');
const date = require('date-and-time');
const reactionSchema= new Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectID(),
        },
        reactionBody:{
            type: String,
            required: true,
            maxlength: 280,
        },
        username:{
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtTime) => date.format(createdAtTime,'YYYY/MM/DD hh:mm:ss A' )
        }
    }
)
const thoughtsSchema= new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //date-and-time package
            get: (createdAtTime) => date.format(createdAtTime,'YYYY/MM/DD hh:mm:ss A'),
            },

        username: {
            type: String,
            required: true,  
        },
        reactions:[reactionSchema],
    },
    { 
        toJSON:{
            virtuals:true,
            getters: true,
        },
        id:false,
        }


);

userSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
});
const Thought= model('thought', thoughtsSchema)

module.exports= Thought;