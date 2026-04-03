import mongoose from "mongoose";

export const masterSchema = new mongoose.Schema({
    name:String
},{timestamps:true})