import mongoose from "mongoose";

import bcrypt  from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

userSchema.pre("save", async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
}) 

userSchema.methods.comparePassword = async function(password) {
    console.log("ss", this.password);
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.token = async function() {
    return await jwt.sign({userId:this._id}, "test", {expiresIn:"1d"});
}


export const User = mongoose.models.User || mongoose.model('User', userSchema);

// export const User = mongoose.model("User", userSchema);