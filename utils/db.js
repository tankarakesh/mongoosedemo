const mongoose = require('mongoose');
const url = 'mongodb+srv://root:root@cluster0-5qtmh.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(url,{useUnifiedTopology:true, useNewUrlParser: true});
const validator1 = require('validator');

const Schema = mongoose.Schema;

const bSchema = new Schema(
    {
        name:{
            type: String,
            required:true,
            trim : true
        },
        age:
        {
            type:Number,
            required:true,
            validate(value)
            {
                if(value <18)
                {
                    throw new Error('Age should not be less than 18');
                }
            }
        },
        salary:
        {
            type:Number,
            required:true
        },
        email:
        {
            type:String,
            required:true,
            validate(value)
            {
                if(!validator1.isEmail(value))
                {
                throw new Error('Not a valid Email');
                }
            }
        },
        password:
        {
            type:String,
            required:true,
            validate(value){
            if(validator1.isLength(value,{min:0, max:5}))
            {
                throw new Error('Minimum Length should be 6');
            }
        }
        }
    }
);

const user = mongoose.model('user',bSchema);

module.exports = user;

const user1=new user(
    {
        name:"Johnny2",
        age:22,
        salary:20002,
        email:"asdas@gmail.com"
    }
);

// user1.save()
// .then(res => console.log(res))
// .catch(err => console.log(err));

// console.log('End');