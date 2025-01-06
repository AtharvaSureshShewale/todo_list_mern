const {Schema,model}=require('mongoose');

const TodoSchema=new Schema({
    email:{
        type:String,
    },
    task:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    imp:{
        type:Boolean,
        default:false,
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    },
    dueDate: {
        type: Date,
        default:Date.now
    },
},{timestamps:true});

const TodoModel=model("TodoModel",TodoSchema);

module.exports=TodoModel;